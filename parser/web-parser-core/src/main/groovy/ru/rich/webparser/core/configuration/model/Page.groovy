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

    private String name
    PageTemplate pageTemplate

    Page() {
    }

    Page(Page page) {
        this.url = page.url
        this.type = page.type
        this.templateFileName = page.templateFileName
        this.dropRowToDisk = page.dropRowToDisk
        this.printNormalisedToLog = page.printNormalisedToLog
        this.dropNormalisedToDisk = page.dropNormalisedToDisk
        this.pageTemplate = page.pageTemplate
    }

    String setName(String name) {
        this.name = name
    }

    String getName() {
        if (!name) {
            name = templateFileName.substring(0, templateFileName.indexOf('.'))
        }
        name
    }

    Page copy() {
        new Page(this)
    }

    @Override
    String toString() {
        return toStringHelper(this)
                .add("name", getName())
                .add("url", url)
                .add("type", type)
                .add("templateFileName", templateFileName)
                .add("dropRowToDisk", dropRowToDisk)
                .add("printNormalisedToLog", printNormalisedToLog)
                .add("dropNormalisedToDisk", dropNormalisedToDisk)
                .toString()
    }
}
