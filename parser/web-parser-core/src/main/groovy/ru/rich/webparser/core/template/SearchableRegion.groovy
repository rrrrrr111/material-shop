package ru.rich.webparser.core.template

import groovy.transform.CompileStatic


/**
 * Искомый на странице регион текста
 */
@CompileStatic
interface SearchableRegion {

    RuleType getType()
    /**
     * Искомая в тексте строка
     */
    String getSearchableString()

    /**
     * @return true если передан связанный регион
     */
    boolean isBoundWith(SearchableRegion region)
}