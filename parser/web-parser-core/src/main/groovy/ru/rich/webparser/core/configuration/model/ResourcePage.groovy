package ru.rich.webparser.core.configuration.model

import groovy.transform.CompileStatic
import ru.rich.webparser.core.configuration.template.PageTemplate

import static com.google.common.base.MoreObjects.toStringHelper

/**
 * Страница с загружаемыми с помощью URL данными
 */
@CompileStatic
class ResourcePage implements Page {

    String url
    String templateFileName
    boolean dropRowToDisk
    boolean printNormalisedToLog
    boolean dropNormalisedToDisk

    private String name
    PageTemplate pageTemplate

    ResourcePage() {
    }

    ResourcePage(ResourcePage page) {
        this.url = page.url
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

    ResourcePage copy() {
        new ResourcePage(this)
    }

    @Override
    String toString() {
        return toStringHelper(this)
                .add("name", getName())
                .add("url", url)
                .add("templateFileName", templateFileName)
                .add("dropRowToDisk", dropRowToDisk)
                .add("printNormalisedToLog", printNormalisedToLog)
                .add("dropNormalisedToDisk", dropNormalisedToDisk)
                .toString()
    }
}