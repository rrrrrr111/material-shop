package ru.rich.webparser.core.transform.parser

import com.google.common.collect.LinkedListMultimap
import com.google.common.collect.ListMultimap
import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.apache.commons.collections4.CollectionUtils
import org.springframework.stereotype.Service
import ru.rich.matshop.util.SearchArrayUtil
import ru.rich.webparser.core.configuration.template.SearchableRegion
import ru.rich.webparser.core.configuration.template.SearchableRule

import static org.apache.commons.lang3.ArrayUtils.subarray

/**
 * Поиск текста в массиве символов
 */
@Service
@CompileStatic
@Slf4j
class SearchService {

    ListMultimap<SearchableRegion, SearchContext> searchSequenceRegions(char[] text,
                                                                        List<SearchableRegion> regions) {
        log.trace "Searching ${regions.size()} sequence regions"

        final ListMultimap<SearchableRegion, SearchContext> result = LinkedListMultimap.create()
        final Map<SearchableRegion, SearchContext> candidates = [:]
        def sequence = regions.iterator()
        addNext(candidates, sequence)

        char c
        for (int i = 0; i < text.length; i++) {
            c = text[i]

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

                    enrichContext(text, it.key, it.value, i)
                    result.put(it.key, it.value)
                    log.trace "Sequential '${region.type}' entry found at index ${it.value.foundIndex}, " +
                            "extracted value: ${it.value.extractedValue}"

                    candidates.remove(it.key)
                    addNext(candidates, sequence)
                }
            }
        }
        def final searchedRules = regions.findAll { it.type.isRule }
        def final foundRules = result.keySet()
        if (!foundRules.containsAll(searchedRules)) {
            def notFound = CollectionUtils.subtract(searchedRules, foundRules)
                    .collect { ((SearchableRule) it).name } as Set
            log.warn "Searched ${searchedRules.size()} sequence regions, " +
                    "but ${notFound.size()} not found: ${notFound}"
        }
        result
    }

    ListMultimap<SearchableRegion, SearchContext> searchPlurals(char[] text,
                                                                ListMultimap<SearchableRegion, SearchContext> regions) {
        log.trace "Searching plurals for ${regions.size()} regions"

        final ListMultimap<SearchableRegion, SearchContext> result = LinkedListMultimap.create()
        final def list = new ArrayList<Map.Entry<SearchableRegion, SearchContext>>(regions.entries())
        final def iterator = list.listIterator()
        final def searched = []

        while (iterator.hasNext()) {
            Map.Entry<SearchableRegion, SearchContext> e = iterator.next()

            if (e.key.type.pluralEntry && !searched.contains(e.key)) {

                def regionsToSearch = findBound(list, e.key)
                int fromIndex = e.value.foundIndex + e.value.extractedValue.length()
                int toIndex = findNextRegionIndex(list, regionsToSearch.last(), text)

                def plurals = searchIndependentRegions(text, regionsToSearch, fromIndex, toIndex)
                result.putAll(plurals)
                searched.addAll(regionsToSearch)
            }
        }
        result
    }

    ListMultimap<SearchableRegion, SearchContext> searchIndependentRegions(char[] text,
                                                                           List<SearchableRegion> regions,
                                                                           int fromIndex = 0,
                                                                           int toIndex = text.length - 1) {
        log.trace "Searching ${regions.size()} independent regions in [$fromIndex->$toIndex]"

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
            c = text[i]

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

                    enrichContext(text, it.key, it.value, i)
                    result.put(it.key, it.value)
                    log.trace "Independent ${region.type} entry found at ${it.value.foundIndex} " +
                            "in [$fromIndex->$toIndex], extracted: ${it.value.extractedValue}"

                    candidates.put(it.key, new SearchContext())
                }
            }
        }
        result
    }

    private void enrichContext(char[] text, SearchableRegion region, SearchContext context, int index) {
        context.foundIndex = index - region.searchableString.length() + 1

        if (region.type.isRule) {
            SearchableRule rule = (SearchableRule) region

            int start = context.foundIndex + region.searchableString.length(),
                end = SearchArrayUtil.indexOfArray(text, start, rule.textAfter.toCharArray())
            if (end < 0) {
                log.warn "textAfter not found for rule $rule"
                return
            }
            context.extractedValue = new String(subarray(text, start, end)).trim()
        }
    }

    private List<SearchableRegion> findBound(List<Map.Entry<SearchableRegion, SearchContext>> list,
                                             SearchableRegion region) {
        [region] + list
                .findAll({ it.key.isBoundWith(region) })
                .collect { it.key }
    }

    private int findNextRegionIndex(List<Map.Entry<SearchableRegion, SearchContext>> list,
                                    SearchableRegion region,
                                    char[] text) {
        for (int i = 0; i < list.size(); i++) {
            if (region == list.get(i).key) {
                if (i == list.size() - 1) {
                    return text.length - 1
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
            candidates[sequence.next()] = new SearchContext()
        }
    }

    static class SearchContext {
        int matchingIndex = 0
        Integer foundIndex
        String extractedValue
    }
}
