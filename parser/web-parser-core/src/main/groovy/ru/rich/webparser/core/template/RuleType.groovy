package ru.rich.webparser.core.template

enum RuleType {

    VAL("val"),
    LIST("list"),
    MAP("map"),
    MULTIMAP("multiMap")

    private final String alias

    RuleType(String alias) {
        this.alias = alias
    }

    static RuleType fromAlias(alias) {
        def v = values().find { it.alias == alias }
        assert v: "Unknown alias $alias"
        v
    }
}