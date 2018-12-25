package ru.rich.webparser.core

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.LoaderConf
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.extract.PageExtractor
import ru.rich.webparser.core.load.CollectorLoader
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
    private List<PageExtractor<? extends Page>> extractors
    @Autowired
    private List<PageTransformer<? extends Page>> transformers
    @Autowired
    private List<CollectorLoader> loaders

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
        getLoader(conf.loaderConf).load(conf, c)
    }

    private <P extends Page> PageExtractor<P> getExtractor(P page) {
        def res = extractors.findAll { it.isApplicable(page) }

        assert res.size() < 2: "Multiple extractors: $res found for $page"
        assert !res.isEmpty(): "No extractors found for $page among: $extractors"

        (PageExtractor<P>) res[0]
    }

    private <P extends Page> PageTransformer<P> getTransformer(P page) {
        def res = transformers.findAll { it.isApplicable(page) }

        assert res.size() < 2: "Multiple transformers: $res found for $page"
        assert !res.isEmpty(): "No transformers found for $page among: $transformers"

        (PageTransformer<P>) res[0]
    }

    private CollectorLoader getLoader(LoaderConf loaderConf) {
        def res = loaders.findAll { it.isApplicable(loaderConf) }

        assert res.size() < 2: "Multiple loaders: $res found for $loaderConf"
        assert !res.isEmpty(): "No loaders found for $loaderConf among: $loaders"

        res[0]
    }
}
