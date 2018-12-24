package ru.rich.webparser.core.configuration.model

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic

/**
 *
 */
@CompileStatic
class Configuration {

    String projectName
    List<ResourcePage> pages
    String path

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("projectName", projectName)
                .add("pages", pages)
                .add("path", path)
                .toString()
    }
}
