package ru.rich.webparser.core.collector

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic

@CompileStatic
class Value implements Collectable {

    String value

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("name", name)
                .add("value", value)
                .toString()
    }
}
