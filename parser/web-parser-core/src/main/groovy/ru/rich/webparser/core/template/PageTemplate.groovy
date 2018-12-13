package ru.rich.webparser.core.template

import groovy.transform.CompileStatic

/**
 * Конфигурация шаблона для парсинга
 */
@CompileStatic
class PageTemplate {

    /**
     * Регионы текста для последовательного поиска
     */
    List<SearchableRegion> sequenceRegions = []
    /**
     * Регионы текста для независимого поиска
     */
    List<SearchableRegion> independentRegions = []
}
