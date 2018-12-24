package ru.rich.webparser.core.load.excel

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic
import groovy.transform.PackageScope
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.transform.collector.Collector
/**
 *
 */
@CompileStatic
@PackageScope
class ExcelLoaderData {

    Configuration conf
    Collector collector

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("conf", conf)
                .add("collector", collector)
                .toString()
    }
}
