package ru.rich.webparser.core.extract

import groovy.transform.CompileStatic
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.Page


/**
 * Загрузка данных страницы, 1 этап в ETL
 */
@CompileStatic
interface PageExtractor {

    char[] extract(Configuration conf, Page page)
}