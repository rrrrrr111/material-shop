package ru.rich.webparser.core.transform

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.rich.webparser.core.EtlService
import ru.rich.webparser.core.configuration.func.FunctionContext
import ru.rich.webparser.core.configuration.func.InterpolationHelper
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.ListResourcePage
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.configuration.model.ResourcePage
import ru.rich.webparser.core.transform.collector.Collector

/**
 * Трансформация страниц типа {@link ListResourcePage}
 */
@Service
@CompileStatic
@Slf4j
class ListResourcePageTransformer implements PageTransformer<ListResourcePage> {

    @Autowired
    InterpolationHelper interpolationHelper
    @Autowired
    ResourcePageTransformer resourcePageTransformer
    @Autowired
    EtlService etlService

    @Override
    void transform(Configuration conf, final ListResourcePage p, final Collector c, final char[] text) {

        resourcePageTransformer.transform(conf, p, c, text)

        int index = 0
        for (String url in c.getValuesList(p.urlListName).values) {
            if (p.limit && index >= p.limit) {
                log.warn "Loading interrupted by limit ${p.limit}"
                break
            }

            def final sc = new Collector("c_${p.name}_sub_$index")
            c.putCollector(sc)

            p.subPages.each { ResourcePage page ->
                page = page.copy()
                page.name += "_sub_$index"

                interpolationHelper.interpolateFunctions(page, new FunctionContext(c, index))
                etlService.extractAndTransform(conf, page, sc)
            }
            index++
        }
    }

    @Override
    boolean isApplicable(Page p) {
        return p instanceof ListResourcePage
    }
}
