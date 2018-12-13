package ru.rich.webparser.core.parser

import groovy.transform.CompileStatic
import ru.rich.webparser.core.template.SearchableRegion;

/**
 * Слушатель событий парсера
 */
@CompileStatic
interface ParserListener {

    void onFound(SearchableRegion region)
}
