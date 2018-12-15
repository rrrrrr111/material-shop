package ru.rich.webparser.core.template

import groovy.transform.CompileStatic

/**
 * Рулы шаблонов
 */
@CompileStatic
enum RuleType {

    VAL("val"),
    LIST("list"),
    MAP("map"),
    MULTIMAP("multiMap"),
    STRING(),

    private String alias
    private boolean isRule

    RuleType(String alias) {
        this.alias = alias
        this.isRule = true
    }

    RuleType() {
        this.alias = null
        this.isRule = false
    }

    boolean getIsRule() {
        return isRule
    }

    static RuleType fromAlias(alias) {
        def v = values().find { RuleType it ->
            it.alias == alias
        }
        assert v: "Unknown alias $alias"
        v
    }
}