package ru.rich.webparser.core.configuration.model

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic

@CompileStatic
class Configuration {

    String projectName
    List<Page> pages

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("projectName", projectName)
                .add("pages", pages)
                .toString()
    }
}
