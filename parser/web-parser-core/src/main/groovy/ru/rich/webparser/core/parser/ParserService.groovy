package ru.rich.webparser.core.parser

import com.google.common.collect.LinkedListMultimap
import com.google.common.collect.ListMultimap
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

        log.info "Searching sequence regions, list size: ${p.pageTemplate.sequenceRegions.size()}"
        ListMultimap<SearchableRegion, SearchContext> foundRegions = searchSequenceRegions(html, p.pageTemplate.sequenceRegions)
        foundRegions.putAll(searchPlurals(html, foundRegions))

        log.info "Searching independent regions, list size: ${p.pageTemplate.independentRegions.size()}"
        foundRegions.putAll(searchIndependentRegions(html, p.pageTemplate.independentRegions))


        for (Map.Entry<SearchableRegion, SearchContext> entry in foundRegions.entries()) {
            collectData(html, collector, entry.key, entry.value)
        }
    }

    private ListMultimap<SearchableRegion, SearchContext> searchSequenceRegions(char[] html,
                                                                                List<SearchableRegion> regions) {
        final ListMultimap<SearchableRegion, SearchContext> result = LinkedListMultimap.create()
        final Map<SearchableRegion, SearchContext> candidates = [:]
        def sequence = regions.iterator()
        addNext(candidates, sequence)

        char c
        for (int i = 0; i < html.length; i++) {
            c = html[i]

            candidates.each {
                def matchingIndex = it.value.matchingIndex
                def region = it.key
                def searchableString = region.searchableString
                def charMatches = searchableString.charAt(matchingIndex) == c
                def maxIndex = searchableString.length() - 1

                if (matchingIndex < maxIndex) {
                    if (charMatches) {
                        it.value.matchingIndex++
                    } else if (matchingIndex > 0) {
                        it.value.matchingIndex = 0
                    }

                } else if (charMatches && matchingIndex == maxIndex) {

                    enrichContext(html, it.key, it.value, i)
                    result.put(it.key, it.value)
                    log.info "Sequential '${region.type}' entry found at index ${it.value.foundIndex}, " +
                            "extracted value: ${it.value.extractedValue}"

                    candidates.remove(it.key)
                    addNext(candidates, sequence)
                }
            }
        }
        result
    }

    private ListMultimap<SearchableRegion, SearchContext> searchIndependentRegions(char[] html,
                                                                                   List<SearchableRegion> regions,
                                                                                   int fromIndex = 0,
                                                                                   int toIndex = html.length - 1) {
        assert fromIndex < toIndex
        final ListMultimap<SearchableRegion, SearchContext> result = LinkedListMultimap.create()
        final Map<SearchableRegion, SearchContext> candidates = [:]
        candidates.putAll(
                regions.collectEntries {
                    [(it): new SearchContext()]
                }
        )

        char c
        for (int i = fromIndex; i <= toIndex; i++) {
            c = html[i]

            for (it in candidates) {
                def matchingIndex = it.value.matchingIndex
                def region = it.key
                def searchableString = region.searchableString
                def charMatches = searchableString.charAt(matchingIndex) == c
                def maxIndex = searchableString.length() - 1

                if (matchingIndex < maxIndex) {
                    if (charMatches) {
                        it.value.matchingIndex++
                    } else if (matchingIndex > 0) {
                        it.value.matchingIndex = 0
                    }

                } else if (charMatches && matchingIndex == maxIndex) {

                    enrichContext(html, it.key, it.value, i)
                    result.put(it.key, it.value)
                    log.info "Independent ${region.type} entry found at index ${it.value.foundIndex} " +
                            "beetwin $fromIndex and $toIndex, extracted value: ${it.value.extractedValue}"

                    candidates.put(it.key, new SearchContext())
                }
            }
        }
        result
    }

    private void enrichContext(char[] html, SearchableRegion region, SearchContext context, int index) {
        context.foundIndex = index - region.searchableString.length() + 1

        if (region.type.isRule) {
            SearchableRule rule = (SearchableRule) region

            int start = context.foundIndex + region.searchableString.length(),
                end = SearchArrayUtil.indexOfArray(html, start, rule.textAfter.toCharArray())

            if (end < 0) {
                log.warn "textAfter not found for rule $rule"
                return
            }

            context.extractedValue = new String(subarray(html, start, end)).trim()
        }
    }

    private ListMultimap<SearchableRegion, SearchContext> searchPlurals(char[] html,
                                                                        ListMultimap<SearchableRegion, SearchContext> foundRegions) {
        final ListMultimap<SearchableRegion, SearchContext> result = LinkedListMultimap.create()

        def list = new ArrayList<Map.Entry<SearchableRegion, SearchContext>>(foundRegions.entries())
        def iterator = list.listIterator()
        while (iterator.hasNext()) {
            Map.Entry<SearchableRegion, SearchContext> e = iterator.next()

            if (e.key.type.pluralEntry) {

                int fromIndex = e.value.foundIndex + e.value.extractedValue.length()
                int toIndex = (
                        iterator.hasNext()
                                ? list[iterator.nextIndex()].value.foundIndex
                                : html.length - 1
                )

                def plurals = searchIndependentRegions(html, [e.key], fromIndex, toIndex)
                log.info "Searching plurals for ${e.key}, ${plurals.size()} found, fromIndex: $fromIndex, toIndex: $toIndex"
                result.putAll(plurals)
            }
        }

        result
    }

    private void collectData(char[] html, Collector collector, SearchableRegion region, SearchContext context) {

        final List<ParserListener> listeners = []
        listeners << new CollectingListener(collector, html)

        if (region.type.isRule) {
            SearchableRule rule = (SearchableRule) region
            listeners.each { it.onRuleFound(rule, context.extractedValue, context.foundIndex) }

        } else {
            SequentialString str = (SequentialString) region
            listeners.each { it.onStringFound(str, context.foundIndex) }
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
        Integer foundIndex
        String extractedValue
    }

    static interface ParserListener {
        void onRuleFound(SearchableRule rule, String value, int index)

        void onStringFound(SequentialString str, int index)
    }
}
