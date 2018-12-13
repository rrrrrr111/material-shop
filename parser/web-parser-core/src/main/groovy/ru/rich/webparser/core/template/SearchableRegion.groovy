package ru.rich.webparser.core.template

import groovy.transform.CompileStatic


/**
 * Искомый на странице регион текста
 */
@CompileStatic
interface SearchableRegion {

    RuleType getType()

    String getSearchableString()
}