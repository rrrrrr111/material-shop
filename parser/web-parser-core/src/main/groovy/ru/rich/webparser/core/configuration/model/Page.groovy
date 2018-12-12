package ru.rich.webparser.core.configuration.model

import groovy.transform.CompileStatic

import static com.google.common.base.MoreObjects.toStringHelper

@CompileStatic
class Page {

    String url
    PageType type
    String template
    boolean printToLog
    boolean dropToDisk

    @Override
    String toString() {
        return toStringHelper(this)
                .add("url", url)
                .add("type", type)
                .toString()
    }
}
