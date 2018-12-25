package ru.rich.webparser.core.configuration.model

import groovy.transform.CompileStatic

import static com.google.common.base.MoreObjects.toStringHelper

/**
 * Старница для загрузки по распарсиваемому списку URL
 */
@CompileStatic
class ListResourcePage extends ResourcePage implements WithSubPages {

    /**
     * Ограничение по кол-ву загружаемых старниц
     */
    Integer limit

    ListResourcePage() {
    }

    ListResourcePage(ListResourcePage p) {
        super(p)
        this.limit = p.limit
        this.subPages = p.subPages
        this.urlListName = p.urlListName
    }

    @Override
    ListResourcePage copy() {
        return new ListResourcePage(this)
    }

    @Override
    String toString() {
        return toStringHelper(this)
                .add("url", url)
                .add("templateFileName", templateFileName)
                .add("dropRowToDisk", dropRowToDisk)
                .add("printNormalisedToLog", printNormalisedToLog)
                .add("dropNormalisedToDisk", dropNormalisedToDisk)
                .add("subPages", subPages)
                .add("urlListName", urlListName)
                .toString()
    }
}
