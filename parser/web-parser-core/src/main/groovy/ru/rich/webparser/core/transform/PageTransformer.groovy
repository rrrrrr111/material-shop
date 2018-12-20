package ru.rich.webparser.core.transform

import groovy.transform.CompileStatic
import ru.rich.webparser.core.transform.collector.Collector
import ru.rich.webparser.core.configuration.model.Page

/**
 * Преобразование данных страницы
 */
@CompileStatic
interface PageTransformer {

    void transform(Page p, Collector c, char[] text)
}