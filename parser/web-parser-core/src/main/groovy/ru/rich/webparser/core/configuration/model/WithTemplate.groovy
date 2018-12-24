package ru.rich.webparser.core.configuration.model

import groovy.transform.CompileStatic
import ru.rich.webparser.core.configuration.template.PageTemplate

/**
 * Имеет шаблон для парсинга
 */
@CompileStatic
trait WithTemplate {

    String templateFileName
    PageTemplate pageTemplate
}