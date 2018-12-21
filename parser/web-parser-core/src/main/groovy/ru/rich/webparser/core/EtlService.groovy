package ru.rich.webparser.core

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.func.FunctionProcessor
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.ListingPage
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.configuration.model.PageType
import ru.rich.webparser.core.extract.PageExtractor
import ru.rich.webparser.core.extract.html.HtmlPageExtractorService
import ru.rich.webparser.core.load.CollectorLoader
import ru.rich.webparser.core.load.excel.CollectorToExcelLoader
import ru.rich.webparser.core.transform.PageTransformer
import ru.rich.webparser.core.transform.ParsingPageTransformerService
import ru.rich.webparser.core.transform.collector.Collector

import static ru.rich.webparser.core.configuration.func.FunctionProcessor.FunctionContext

/**
 * Объединяет ETL процессы (Extract Transform Load) и обработку
 * различного типа страниц
 */
@Service
@CompileStatic
@Slf4j
class EtlService {

    @Autowired
    HtmlPageExtractorService htmlPageLoaderService
    @Autowired
    ParsingPageTransformerService parsingPageTransformerService
    @Autowired
    FunctionProcessor functionProcessor
    @Autowired
    CollectorToExcelLoader collectorToExcelLoader

    Collector process(Configuration conf) {

        def c = new Collector("main")
        conf.pages.each { p ->
            processPage(conf, p, c)
        }
        getLoader(conf).load(conf, c)
        return c
    }

    private void processPage(Configuration conf, Page p, Collector c) {
        switch (p) {
            case { it instanceof ListingPage }:
                processListingPage(conf, (ListingPage) p, c)
                break
            default:
                processSimplePage(conf, p, c)
        }
    }

    private void processSimplePage(Configuration conf, Page p, Collector c) {
        interpolateFunctions(p, new FunctionContext(c))

        char[] data = getExtractor(p.type).extract(conf, p)
        getTransformer(p.type).transform(p, c, data)
    }

    private void processListingPage(Configuration conf, ListingPage p, Collector c) {
        processSimplePage(conf, p, c)
        c.getValuesList(p.urlListName).values.eachWithIndex {
            String url, int index ->
                if (p.limit && index >= p.limit) {
                    return
                }
                def sc = new Collector("c_${p.name}_sub_$index")
                c.putCollector(sc)

                p.subPages.each { Page page ->
                    page = page.copy()
                    page.name += "_sub_$index"
                    interpolateFunctions(page, new FunctionContext(c, index))
                    processPage(conf, page, sc)
                }
        }
    }

    private void interpolateFunctions(Page page, FunctionContext fc) {
        page.url = functionProcessor.interpolate(page.url, fc)
    }

    private PageExtractor getExtractor(PageType type) {
        switch (type) {
            case PageType.HTML:
                return htmlPageLoaderService
            default:
                throw new IllegalStateException("Unknown type: " + type)
        }
    }

    private PageTransformer getTransformer(PageType type) {
        parsingPageTransformerService
    }

    private CollectorLoader getLoader(Configuration conf) {
        collectorToExcelLoader
    }
}
