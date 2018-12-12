package ru.rich.webparser.core.collector

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic

@CompileStatic
class ValuesMap implements Collectable {

    Map<String, String> map

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("name", name)
                .add("map", map)
                .toString()
    }
}
