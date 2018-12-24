package ru.rich.webparser.core.configuration.model

import groovy.transform.CompileStatic

/**
 * Имеет дочерние страницы
 */
@CompileStatic
trait WithSubPages {

    List<ResourcePage> subPages = []
    /**
     * Имя листа со списком URL
     */
    String urlListName
}