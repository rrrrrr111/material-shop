package ru.rich.webparser.core

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.rich.webparser.core.transform.collector.Collector
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.PageType
import ru.rich.webparser.core.extract.PageExtractor
import ru.rich.webparser.core.extract.html.HtmlPageExtractorService
import ru.rich.webparser.core.transform.PageTransformer

/**
 * Объединяет ETL процессы (Extract Transform Load)
 */
@Service
@CompileStatic
@Slf4j
class EtlService {

    @Autowired
    HtmlPageExtractorService htmlPageLoaderService
    @Autowired
    PageTransformer pageTransformer

    Collector execute(Configuration conf) {

        def c = new Collector()
        conf.pages.each { p ->

            PageExtractor loader = getLoader(p.type)

            char[] data = loader.extract(conf, p)
            pageTransformer.transform(p, c, data)
        }
        return c
    }

    private PageExtractor getLoader(PageType type) {
        switch (type) {
            case PageType.HTML:
                return htmlPageLoaderService
            default:
                throw new IllegalStateException("Unknown type: " + type)
        }
    }
}
