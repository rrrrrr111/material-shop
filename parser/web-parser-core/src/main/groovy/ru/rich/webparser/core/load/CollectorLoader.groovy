package ru.rich.webparser.core.load

import groovy.transform.CompileStatic
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.transform.collector.Collector

/**
 * Выгрузка данных, 3 этап в ETL
 */
@CompileStatic
interface CollectorLoader {

    void load(Configuration conf, Collector collector)
}