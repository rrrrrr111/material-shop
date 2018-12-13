package ru.rich.webparser.core.template

import groovy.transform.CompileStatic

/**
 * Область поиска
 */
@CompileStatic
enum RuleScope {

    /** Последовательная */
    SEQUENTIAL,
    /** Независимая */
    INDEPENDENT,

}