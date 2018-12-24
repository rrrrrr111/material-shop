package ru.rich.webparser.core.configuration.model

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic

/**
 * Старница для загрузки по указанному списку URL
 */
@CompileStatic
class ListPage implements Page {

    List<String> urls = []
    /**
     * Имя листа со списком URL
     */
    String urlListName
    List<ResourcePage> subPages = []

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("urls", urls)
                .add("subPages", subPages)
                .toString()
    }
}
