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
import ru.rich.webparser.core.template.TemplateParserService


/**
 * Парсер HTML страниц
 *
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

        //parse()
        c
    }


}
