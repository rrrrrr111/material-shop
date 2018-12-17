package ru.rich.webparser.core.template

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic

/**
 * Строка текста в последовательности искомых регионов текста
 */
@CompileStatic
class SequentialString implements SearchableRegion {

    final int num
    final String string

    SequentialString(int num, String string) {
        this.num = num
        this.string = string
    }

    @Override
    RuleType getType() {
        return RuleType.STRING
    }

    @Override
    String getSearchableString() {
        return string
    }

    boolean equals(o) {
        if (this.is(o)) return true
        if (!(o instanceof SequentialString)) return false
        SequentialString that = (SequentialString) o
        if (num != that.num) return false
        if (string != that.string) return false
        return true
    }

    int hashCode() {
        int result
        result = num
        result = 31 * result + (string != null ? string.hashCode() : 0)
        return result
    }

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("num", num)
                .add("string", "'$string'")
                .toString()
    }
}
