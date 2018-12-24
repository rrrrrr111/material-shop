package ru.rich.webparser.core

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.extract.PageExtractor
import ru.rich.webparser.core.load.CollectorLoader
import ru.rich.webparser.core.load.excel.CollectorToExcelLoader
import ru.rich.webparser.core.transform.PageTransformer
import ru.rich.webparser.core.transform.collector.Collector

/**
 * Объединяет ETL процессы (Extract Transform Load) и обработку
 * различного типа страниц
 */
@Service
@CompileStatic
@Slf4j
class EtlService {
    @Autowired
    List<PageExtractor<? extends Page>> extractors
    @Autowired
    List<PageTransformer<? extends Page>> transformers
    @Autowired
    CollectorToExcelLoader collectorToExcelLoader

    Collector process(Configuration conf) {

        def c = new Collector("main")
        conf.pages.each { p ->
            extractAndTransform(conf, p, c)
        }
        load(conf, c)
        return c
    }

    char[] extract(Configuration conf, Page p, Collector c) {
        getExtractor(p).extract(conf, p, c)
    }

    void transform(Configuration conf, Page p, Collector c, char[] data) {
        getTransformer(p).transform(conf, p, c, data)
    }

    void extractAndTransform(Configuration conf, Page p, Collector c) {
        char[] data = extract(conf, p, c)
        transform(conf, p, c, data)
    }

    void load(Configuration conf, Collector c) {
        getLoader(conf).load(conf, c)
    }

    private <P extends Page> PageExtractor<P> getExtractor(P page) {
        for (PageExtractor<? extends Page> extractor in extractors) {
            if (extractor.isApplicable(page)) {
                return (PageExtractor<P>) extractor
            }
        }
        throw new IllegalStateException("Unknown page type: $page, extractor not found")
    }

    private <P extends Page> PageTransformer getTransformer(P page) {
        for (PageTransformer<? extends Page> transformer in transformers) {
            if (transformer.isApplicable(page)) {
                return (PageTransformer<P>) transformer
            }
        }
        throw new IllegalStateException("Unknown page type: $page, transformer not found")
    }

    private CollectorLoader getLoader(Configuration conf) {
        collectorToExcelLoader
    }
}
