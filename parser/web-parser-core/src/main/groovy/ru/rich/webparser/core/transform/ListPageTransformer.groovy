package ru.rich.webparser.core.transform

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.rich.webparser.core.EtlService
import ru.rich.webparser.core.configuration.func.FunctionContext
import ru.rich.webparser.core.configuration.func.InterpolationHelper
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.ListPage
import ru.rich.webparser.core.configuration.model.ListResourcePage
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.configuration.model.ResourcePage
import ru.rich.webparser.core.extract.PageExtractor
import ru.rich.webparser.core.transform.collector.Collector

/**
 * Трансформация страниц типа {@link ListResourcePage}
 */
@Service
@CompileStatic
@Slf4j
class ListPageTransformer implements PageTransformer<ListPage>, PageExtractor<ListPage> {

    @Autowired
    InterpolationHelper interpolationHelper
    @Autowired
    EtlService etlService

    @Override
    char[] extract(Configuration conf, ListPage page, Collector collector) {

        page.urls.each { collector.addToList(page.urlListName, it) }

        return new char[0]
    }

    @Override
    void transform(Configuration conf, ListPage p, Collector c, char[] text) {

        int index = 0
        for (String url in c.getValuesList(p.urlListName).values) {

            p.subPages.each { ResourcePage page ->
                page = page.copy()
                page.name += "_sub_$index"

                interpolationHelper.interpolateFunctions(page, new FunctionContext(c, index))
                etlService.extractAndTransform(conf, page, c)
            }
            index++
        }
    }

    @Override
    boolean isApplicable(Page p) {
        return p instanceof ListPage
    }
}
