package ru.rich.webparser.core.parser

import groovy.transform.CompileStatic
import ru.rich.webparser.core.collector.Collector
import ru.rich.webparser.core.template.SearchableRegion

/**
 *
 */
@CompileStatic
class CollectingListener implements ParserListener {

    Collector collector
    char[] html

    @Override
    void onFound(SearchableRegion region, int endIndex) {

    }
}
