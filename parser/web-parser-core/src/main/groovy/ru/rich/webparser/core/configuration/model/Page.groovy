package ru.rich.webparser.core.configuration.model

import groovy.transform.CompileStatic
import ru.rich.webparser.core.configuration.template.PageTemplate

import static com.google.common.base.MoreObjects.toStringHelper

/**
 * Обычная страница
 */
@CompileStatic
class Page {

    String url
    PageType type
    String templateFileName
    boolean dropRowToDisk
    boolean printNormalisedToLog
    boolean dropNormalisedToDisk

    private String urlFunc
    PageTemplate pageTemplate

    String getName() {
        templateFileName.substring(0, templateFileName.indexOf('.'))
    }

    void setUrl(String url) {
        this.url = url
        this.urlFunc = url
    }

    String getUrlFunc() {
        return urlFunc
    }

    @Override
    String toString() {
        return toStringHelper(this)
                .add("url", url)
                .add("type", type)
                .add("templateFileName", templateFileName)
                .add("dropRowToDisk", dropRowToDisk)
                .add("printNormalisedToLog", printNormalisedToLog)
                .add("dropNormalisedToDisk", dropNormalisedToDisk)
                .toString()
    }
}
