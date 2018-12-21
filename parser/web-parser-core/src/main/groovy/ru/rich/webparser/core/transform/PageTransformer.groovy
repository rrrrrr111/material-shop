package ru.rich.webparser.core.transform

import groovy.transform.CompileStatic
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.transform.collector.Collector

/**
 * Преобразование данных страницы, 2 этап в ETL
 */
@CompileStatic
interface PageTransformer {

    void transform(Page p, Collector c, char[] text)
}