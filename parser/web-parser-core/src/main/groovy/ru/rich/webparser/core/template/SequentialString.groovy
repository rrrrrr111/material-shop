package ru.rich.webparser.core.template

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic

/**
 * Строка текста в последовательности искомых регионов текста
 */
@CompileStatic
class SequentialString implements SearchableRegion {

    final String string

    SequentialString(String string) {
        this.string = string
    }

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("string", string)
                .toString()
    }
}
