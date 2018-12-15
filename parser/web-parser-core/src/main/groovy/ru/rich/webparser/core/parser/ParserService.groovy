package ru.rich.webparser.core.parser

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.rich.matshop.util.SearchArrayUtil
import ru.rich.webparser.core.collector.Collector
import ru.rich.webparser.core.collector.CollectorService
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.download.LoadHtmlService
import ru.rich.webparser.core.normalise.CanonicalizationService
import ru.rich.webparser.core.template.SearchableRegion
import ru.rich.webparser.core.template.SearchableRule
import ru.rich.webparser.core.template.SequentialString
import ru.rich.webparser.core.template.TemplateParserService

import static org.apache.commons.lang3.ArrayUtils.subarray

/**
 * Парсер HTML страниц
 */
@Service
@CompileStatic
@Slf4j
class ParserService {

    @Autowired
    CollectorService collectorService
    @Autowired
    LoadHtmlService loadHtmlService
    @Autowired
    TemplateParserService templateParserService
    @Autowired
    CanonicalizationService canonicalizationService

    Collector parse(Configuration conf) {
        templateParserService.prepareTemplates(conf.path, conf.pages)

        def c = new Collector()
        conf.pages.each { p ->
            parsePage(conf, p, c)
        }
        return c
    }

    private Collector parsePage(Configuration conf, Page p, Collector c) {
        char[] html = loadHtmlService.loadHtml(conf, p)
        char[] normalisedHtml = canonicalizationService.normalise(conf, p, html)
        parseHtml(normalisedHtml, p, c)
        c
    }

    private parseHtml(char[] html, Page p, Collector collector) {

        Map<SearchableRegion, Integer> regionsMap = searchRegions(p, html)

        final List<ParserListener> listeners = []
        listeners << new CollectingListener(collector, html)

        regionsMap.each {

            onFound(it.key, listeners, html, it.value)
        }
    }

    private Map<SearchableRegion, Integer> searchRegions(Page p, char[] html) {
        final Map<SearchableRegion, SearchContext> candidates = [:]
        final Map<SearchableRegion, Integer> result = [:]
        candidates.putAll(
                p.pageTemplate.independentRegions.collectEntries {
                    [(it): new SearchContext()]
                }
        )
        def sequence = p.pageTemplate.sequenceRegions.iterator()
        addNext(candidates, sequence)

        char c
        for (int i = 0; i < html.length; i++) {
            c = html[i]

            candidates.each {
                def index = it.value.matchingIndex
                def region = it.key
                def searchableString = region.searchableString
                def charMatches = searchableString.charAt(index) == c
                def maxIndex = searchableString.length() - 1

                if (index < maxIndex) {
                    if (charMatches) {
                        it.value.matchingIndex++
                    } else if (index > 0) {
                        it.value.matchingIndex = 0
                    }

                } else if (charMatches && index == maxIndex) {

                    def foundIndex = i - searchableString.length()
                    result << [(it.key): foundIndex]
                    log.info "${region.type} entry found at index ${foundIndex}"

                    candidates.remove(it.key)
                    addNext(candidates, sequence)
                }
            }
        }
        result
    }

    private void onFound(SearchableRegion region, List<ParserListener> listeners, char[] html, int index) {

        if (region.type.isRule) {
            SearchableRule rule = (SearchableRule) region

            int start = index + rule.textBefore.length() + 1,
                end = SearchArrayUtil.indexOfArray(html, start, rule.textAfter.toCharArray())

            if (end < 0) {
                log.warn "textAfter not found for rule $rule"
                return
            }

            def val = new String(subarray(html, start, end)).trim()
            listeners.each { it.onRuleFound(rule, val, start) }

        } else {
            SequentialString str = (SequentialString) region

            listeners.each { it.onStringFound(str, index) }
        }
    }

    private static void addNext(
            Map<SearchableRegion, SearchContext> candidates,
            Iterator<SearchableRegion> sequence) {

        if (sequence.hasNext()) {
            candidates.put(sequence.next(), new SearchContext())
        }
    }

    private static class SearchContext {
        int matchingIndex = 0
    }

    static interface ParserListener {
        void onRuleFound(SearchableRule rule, String value, int index)

        void onStringFound(SequentialString str, int index)
    }
}
