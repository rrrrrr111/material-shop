package ru.rich.webparser.core.collector

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic

/**
 *
 */
@CompileStatic
class ValuesList implements Collectable {

    List<String> list

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("name", name)
                .add("list", list)
                .toString()
    }
}
