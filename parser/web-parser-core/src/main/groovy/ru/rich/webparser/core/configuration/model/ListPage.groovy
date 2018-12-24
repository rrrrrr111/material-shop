package ru.rich.webparser.core.configuration.model

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic

/**
 * Старница для загрузки по указанному списку URL,
 *
 * Переданный список URL кладется в лист коллектора, коллектор передается
 * дочерним стриницам в цикле по списку URL
 */
@CompileStatic
class ListPage implements Page, WithSubPages {

    String name = "ListPage"
    List<String> urls = []

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("urls", urls)
                .add("subPages", subPages)
                .toString()
    }
}
