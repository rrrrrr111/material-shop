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
        log.info "Parsing page $p"

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

        final List<ParserListener> listeners = []
        listeners << new CollectingListener(collector, html)

        for (Map.Entry<SearchableRegion, SearchContext> entry in foundRegions.entries()) {
            if (entry.key.type.isRule) {
                SearchableRule rule = (SearchableRule) entry.key
                listeners.each { it.onRuleFound(rule, entry.value.extractedValue, entry.value.foundIndex) }

            } else {
                SequentialString str = (SequentialString) entry.key
                listeners.each { it.onStringFound(str, entry.value.foundIndex) }
            }
        }

        listeners.each { it.onFinish() }
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
                    log.info "Independent ${region.type} entry found at ${it.value.foundIndex} " +
                            "in [$fromIndex->$toIndex], extracted: ${it.value.extractedValue}"

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
        def searched = []

        while (iterator.hasNext()) {
            Map.Entry<SearchableRegion, SearchContext> e = iterator.next()

            if (e.key.type.pluralEntry && !searched.contains(e.key)) {

                def regionsToSearch = findBound(list, e.key)
                int fromIndex = e.value.foundIndex + e.value.extractedValue.length()
                int toIndex = findNextRegionIndex(list, regionsToSearch.last(), html)

                def plurals = searchIndependentRegions(html, regionsToSearch, fromIndex, toIndex)
                log.info "Searched plurals for ${e.key}, ${plurals.size()} found in [$fromIndex->$toIndex]"
                result.putAll(plurals)

                searched.addAll(regionsToSearch)
            }
        }

        result
    }

    List<SearchableRegion> findBound(List<Map.Entry<SearchableRegion, SearchContext>> list,
                                     SearchableRegion region) {
        [region] + list
                .findAll({ it.key.isBoundWith(region) })
                .collect { it.key }
    }

    private int findNextRegionIndex(List<Map.Entry<SearchableRegion, SearchContext>> list,
                                    SearchableRegion region,
                                    char[] html) {
        for (int i = 0; i < list.size(); i++) {
            if (region == list.get(i).key) {
                if (i == list.size() - 1) {
                    return html.length - 1
                }
                return list.get(i + 1).value.foundIndex
            }
        }
        assert false: "Region $region not found in list"
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

        void onFinish()
    }
}
