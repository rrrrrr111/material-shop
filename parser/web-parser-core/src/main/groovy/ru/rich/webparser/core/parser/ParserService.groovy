package ru.rich.webparser.core.parser

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.rich.webparser.core.collector.Collector
import ru.rich.webparser.core.collector.CollectorService
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.download.LoadHtmlService
import ru.rich.webparser.core.normalise.CanonicalizationService
import ru.rich.webparser.core.template.SearchableRule
import ru.rich.webparser.core.template.SequentialString
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
    @Autowired
    SearchService searchService

    Collector parse(Configuration conf) {
        templateParserService.prepareTemplates(conf.path, conf.pages)

        def c = new Collector()
        conf.pages.each { p ->
            parsePage(conf, p, c)
        }
        return c
    }

    private Collector parsePage(Configuration conf, Page p, Collector c) {
        log.info "Parsing $p"

        char[] html = loadHtmlService.loadHtml(conf, p)
        char[] normalisedHtml = canonicalizationService.normalise(conf, p, html)
        parseHtml(normalisedHtml, p, c)
        c
    }

    private parseHtml(char[] html, Page p, Collector c) {

        def foundRegions = searchService.searchSequenceRegions(html, p.pageTemplate.sequenceRegions)
        foundRegions.putAll(searchService.searchPlurals(html, foundRegions))
        foundRegions.putAll(searchService.searchIndependentRegions(html, p.pageTemplate.independentRegions))

        final List<ParserListener> listeners = []
        listeners << new CollectingListener(c, html)

        for (def entry in foundRegions.entries()) {

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

    static interface ParserListener {
        void onRuleFound(SearchableRule rule, String value, int index)

        void onStringFound(SequentialString str, int index)

        void onFinish()
    }
}
