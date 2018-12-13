package ru.rich.webparser.core.template

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic


/**
 * Считываемое из текста значение
 */
@CompileStatic
class SearchableRule implements SearchableRegion {

    final RuleType type
    final String name
    final List<String> flags
    final String textBefore
    final String textAfter

    SearchableRule(RuleType type, String name, String textBefore, String textAfter, String... flags) {
        this.type = type
        this.name = name
        this.flags = flags as List
        this.textBefore = textBefore
        this.textAfter = textAfter
    }

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("type", type)
                .add("name", name)
                .add("flags", flags)
                .add("textBefore", textBefore)
                .add("textAfter", textAfter)
                .toString()
    }
}