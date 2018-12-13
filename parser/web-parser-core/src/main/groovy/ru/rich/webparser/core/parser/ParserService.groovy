package ru.rich.webparser.core.parser

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.apache.commons.io.FileUtils
import org.apache.commons.io.IOUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.rich.webparser.core.collector.Collector
import ru.rich.webparser.core.collector.CollectorService
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.httpclient.HttpClientSupport

import java.nio.charset.Charset
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

    private final Charset CHARSET = StandardCharsets.UTF_8

    Collector parse(Configuration conf) {

        def c = new Collector()
        conf.pages.each { p ->
            parsePage(conf, c, p)
        }
        return c
    }

    private Collector parsePage(Configuration conf, Collector c, Page p) {
        httpClientSupport.executeGetMethod(p.url) { is ->

            char[] html = IOUtils.toCharArray(is, CHARSET)
            def pageName = p.templateFileName.substring(0, p.templateFileName.indexOf('.'))

            if (p.dropRowToDisk) {
                FileUtils.writeStringToFile(
                        new File("parser\\pages\\${conf.projectName}\\${pageName}_row.html"),
                        new String(html), CHARSET)
            }

            String normalisedHtml = canonicalizationService.normalise(html, p)

            if (p.printNormalisedToLog) {
                log.info("Page loaded: \n{}", normalisedHtml)
            }

            if (p.dropNormalisedToDisk) {
                FileUtils.writeStringToFile(
                        new File("parser\\pages\\${conf.projectName}\\${pageName}_normalised.html"),
                        normalisedHtml, CHARSET)
            }
        }
    }
}
