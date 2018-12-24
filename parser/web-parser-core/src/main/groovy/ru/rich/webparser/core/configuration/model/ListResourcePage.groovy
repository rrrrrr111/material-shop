package ru.rich.webparser.core.configuration.model

import groovy.transform.CompileStatic

import static com.google.common.base.MoreObjects.toStringHelper

/**
 * Старница для загрузки по распарсиваемому списку URL
 */
@CompileStatic
class ListResourcePage extends ResourcePage {

    List<ResourcePage> subPages = []
    /**
     * Имя листа со списком URL
     */
    String urlListName
    /**
     * Ограничение по кол-ву загружаемых старниц
     */
    Integer limit

    @Override
    String toString() {
        return toStringHelper(this)
                .add("url", url)
                .add("templateFileName", templateFileName)
                .add("dropRowToDisk", dropRowToDisk)
                .add("printNormalisedToLog", printNormalisedToLog)
                .add("dropNormalisedToDisk", dropNormalisedToDisk)
                .add("subPages.size", subPages.size())
                .toString()
    }
}
