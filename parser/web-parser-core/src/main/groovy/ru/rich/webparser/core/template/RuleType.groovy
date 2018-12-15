package ru.rich.webparser.core.template

import groovy.transform.CompileStatic

/**
 * Рулы шаблонов
 */
@CompileStatic
enum RuleType {

    VAL("val", false),
    LIST("list", true),
    MAP("map", true),
    MULTIMAP("multiMap", true),
    STRING();

    final String alias
    final boolean isRule
    /** Может появляться в шаблоне несколько раз */
    final boolean pluralEntry

    RuleType(String alias, boolean pluralEntry) {
        this.alias = alias
        this.isRule = true
        this.pluralEntry = pluralEntry
    }

    RuleType() {
        this.alias = null
        this.isRule = false
        this.pluralEntry = false
    }

    static RuleType fromAlias(alias) {
        def v = values().find { RuleType it ->
            it.alias == alias
        }
        assert v: "Unknown alias $alias"
        v
    }
}