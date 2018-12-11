package ru.rich.webparser.core.configuration.model

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic

@CompileStatic
class Configuration {

    List<Page> pages


    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("pages", pages)
                .toString()
    }
}
