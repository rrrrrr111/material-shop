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

        for (Page p in conf.pages) {

            httpClientSupport.executeGetMethod(p.url) { is ->

                char[] html = IOUtils.toCharArray(is, CHARSET)
                def pageName = p.template.substring(0, p.template.indexOf('.'))

                if (p.dropRowToDisk) {
                    FileUtils.writeStringToFile(new File("parser\\pages\\${conf.projectName}\\${pageName}row_.html"), new String(html), CHARSET)
                }

                String normalisedHtml = canonicalizationService.normalise(html, p)

                if (p.printToLog) {
                    log.info("Page loaded: \n{}", normalisedHtml)
                }
                if (p.dropNormalisedToDisk) {
                    FileUtils.writeStringToFile(new File("parser\\pages\\${conf.projectName}\\${pageName}normalised_.html"), normalisedHtml, CHARSET)
                }
            }
        }

        return c
    }
}
