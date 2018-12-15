package ru.rich.webparser.core.collector

import com.google.common.base.MoreObjects
import com.google.common.collect.LinkedListMultimap
import com.google.common.collect.ListMultimap
import groovy.transform.CompileStatic

/**
 *
 */
@CompileStatic
class ValuesMultiMap implements Collectable {

    ListMultimap<String, String> multiMap = LinkedListMultimap.create()

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("name", name)
                .add("multiMap", multiMap)
                .toString()
    }
}
