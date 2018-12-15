package ru.rich.webparser.core.collector

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic
import org.testng.collections.ListMultiMap

/**
 *
 */
@CompileStatic
class ValuesMultiMap implements Collectable {

    ListMultiMap<String, String> multiMap = ListMultiMap.create()

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("name", name)
                .add("multiMap", multiMap)
                .toString()
    }
}
