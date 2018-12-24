package ru.rich.webparser.core.extract

import groovy.transform.CompileStatic
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.transform.collector.Collector

/**
 * Загрузка данных страницы, 1 этап в ETL
 */
@CompileStatic
interface PageExtractor<P extends Page> {

    char[] extract(Configuration conf, P page, Collector collector)

    boolean isApplicable(Page p)
}