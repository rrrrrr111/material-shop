package ru.rich.webparser.core.transform

import groovy.transform.CompileStatic
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.transform.collector.Collector

/**
 * Преобразование данных страницы, 2 этап в ETL
 */
@CompileStatic
interface PageTransformer<P extends Page> {

    void transform(Configuration conf, P p, Collector c, char[] text)

    boolean isApplicable(Page p)
}