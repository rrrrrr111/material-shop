package ru.rich.webparser.core.collector

import com.google.common.base.MoreObjects
import com.google.common.collect.Table
import com.google.common.collect.TreeBasedTable
import groovy.transform.CompileStatic

/**
 *
 */
@CompileStatic
class ValuesTable implements Collectable {

    Table<String, String, String> table = TreeBasedTable.create()

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("name", name)
                .add("table", table)
                .toString()
    }
}
