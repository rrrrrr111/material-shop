package ru.rich.webparser.core.parser

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.apache.commons.io.IOUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.rich.webparser.core.collector.Collector
import ru.rich.webparser.core.collector.CollectorService
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.httpclient.HttpClientSupport

import java.nio.charset.StandardCharsets

@Service
@CompileStatic
@Slf4j
class ParserService {

    @Autowired
    CollectorService collectorService
    @Autowired
    HttpClientSupport httpClientSupport
    @Autowired
    CanonicalizationService canonicalizationService

    Collector parse(Configuration conf) {

        def c = new Collector()

        for (Page p in conf.pages) {

            httpClientSupport.executeGetMethod(p.url) { is ->
                char[] html = IOUtils.toCharArray(is, StandardCharsets.UTF_8)
                String normalisedHtml = canonicalizationService.normalise(html, p.type)

                if (p.printToLog) {
                    log.info("Page loaded: \n{}", normalisedHtml)
                }
            }
        }

        return c
    }
}
