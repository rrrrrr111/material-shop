package ru.rich.webparser.core.configuration.template

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic

import static org.apache.commons.lang3.StringUtils.trimToNull

/**
 * Считываемое из текста значение
 */
@CompileStatic
class SearchableRule implements SearchableRegion {

    final int num
    final RuleType type
    final String name
    final List<String> flags
    final String textBefore
    final String textAfter

    SearchableRule(int num, RuleType type, String name, String textBefore, String textAfter, String... flags) {
        assert num
        assert type
        assert name
        assert textBefore
        assert textAfter

        this.num = num
        this.type = type
        this.name = name
        this.flags = flags as List
        this.textBefore = trimToNull(textBefore)
        this.textAfter = trimToNull(textAfter)
    }

    @Override
    String getSearchableString() {
        return textBefore ?: textAfter
    }

    @Override
    boolean isBoundWith(SearchableRegion region) {
        if (this.is(region)) return false
        if (!(region instanceof SearchableRule)) return false
        SearchableRule that = (SearchableRule) region
        if (name != that.name) return false
        if (type != that.type) return false
        return true
    }

    boolean equals(o) {
        if (this.is(o)) return true
        if (!(o instanceof SearchableRule)) return false
        SearchableRule that = (SearchableRule) o
        if (num != that.num) return false
        if (flags != that.flags) return false
        if (name != that.name) return false
        if (textAfter != that.textAfter) return false
        if (textBefore != that.textBefore) return false
        if (type != that.type) return false
        return true
    }

    int hashCode() {
        int result
        result = num
        result = 31 * result + (type != null ? type.hashCode() : 0)
        result = 31 * result + (name != null ? name.hashCode() : 0)
        result = 31 * result + (flags != null ? flags.hashCode() : 0)
        result = 31 * result + (textBefore != null ? textBefore.hashCode() : 0)
        result = 31 * result + (textAfter != null ? textAfter.hashCode() : 0)
        return result
    }

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("num", num)
                .add("type", type)
                .add("name", name)
                .add("flags", flags)
                .add("textBefore", "'$textBefore'")
                .add("textAfter", "'$textAfter'")
                .toString()
    }
}