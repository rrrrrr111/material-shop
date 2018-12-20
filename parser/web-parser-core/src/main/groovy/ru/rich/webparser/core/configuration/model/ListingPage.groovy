package ru.rich.webparser.core.configuration.model

import groovy.transform.CompileStatic

import static com.google.common.base.MoreObjects.toStringHelper

/**
 * Старница для множественной загрузки по списку URL
 */
@CompileStatic
class ListingPage extends Page {

    List<Page> subPages = []
    /**
     * Имя листа со списком URL
     */
    String urlListName

    @Override
    String toString() {
        return toStringHelper(this)
                .add("url", url)
                .add("type", type)
                .add("templateFileName", templateFileName)
                .add("dropRowToDisk", dropRowToDisk)
                .add("printNormalisedToLog", printNormalisedToLog)
                .add("dropNormalisedToDisk", dropNormalisedToDisk)
                .add("subPages.size", subPages.size())
                .toString()
    }
}
