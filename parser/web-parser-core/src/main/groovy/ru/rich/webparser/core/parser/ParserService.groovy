package ru.rich.webparser.core.parser

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.apache.commons.lang3.mutable.MutableInt
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.rich.webparser.core.collector.Collector
import ru.rich.webparser.core.collector.CollectorService
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.download.LoadHtmlService
import ru.rich.webparser.core.normalise.CanonicalizationService
import ru.rich.webparser.core.template.SearchableRegion
import ru.rich.webparser.core.template.TemplateParserService

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

        final Map<SearchableRegion, MutableInt> candidates = p.pageTemplate.independentRegions.collectEntries {
            [(it): new MutableInt(0)]
        }
        final Iterator<SearchableRegion> sequence = p.pageTemplate.sequenceRegions.iterator()
        addNext(candidates, sequence)

        final ParserListener listener = new CollectingListener(collector: collector)
        char c

        for (int i = 0; i < html.length; i++) {
            c = html[i]

            candidates.each {
                def index = it.value
                def searchableString = it.key.searchableString

                if (searchableString.charAt(index.value) == c
                        && index.value < searchableString.length() - 1) {
                    index.increment()
                } else if (index.value == searchableString.length() - 1) {

                    listener.onFound(it.key)
                    index.value = 0
                }
            }


        }
    }

    private void addNext(
            Map<SearchableRegion, MutableInt> candidates,
            Iterator<SearchableRegion> sequence) {

        candidates += sequence.hasNext() ? [(sequence.next()): new MutableInt(0)] : [:]
    }
}
