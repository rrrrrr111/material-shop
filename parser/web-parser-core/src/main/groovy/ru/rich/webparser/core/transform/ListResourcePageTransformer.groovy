package ru.rich.webparser.core.transform

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.rich.webparser.core.EtlService
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.ListResourcePage
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.configuration.model.ResourcePage
import ru.rich.webparser.core.extract.html.ResourcePageExtractor
import ru.rich.webparser.core.transform.collector.Collector

import static ru.rich.webparser.core.configuration.func.FunctionProcessor.FunctionContext

/**
 * Трансформация страниц типа {@link ListResourcePage}
 */
@Service
@CompileStatic
@Slf4j
class ListResourcePageTransformer implements PageTransformer<ListResourcePage> {

    @Autowired
    ResourcePageExtractor resourcePageExtractor
    @Autowired
    ResourcePageTransformer resourcePageTransformer
    @Autowired
    EtlService etlService

    @Override
    void transform(Configuration conf, final ListResourcePage p, final Collector c, final char[] text) {

        resourcePageTransformer.transform(conf, p, c, text)

        c.getValuesList(p.urlListName).values.eachWithIndex {
            String url, int index ->
                if (p.limit && index >= p.limit) {
                    return
                }
                def sc = new Collector("c_${p.name}_sub_$index")
                c.putCollector(sc)

                p.subPages.each { ResourcePage page ->
                    page = page.copy()
                    page.name += "_sub_$index"

                    resourcePageExtractor.interpolateFunctions(page, new FunctionContext(c, index))
                    etlService.extractAndTransform(conf, page, sc)
                }
        }
    }

    @Override
    boolean isApplicable(Page p) {
        return p instanceof ListResourcePage
    }
}
