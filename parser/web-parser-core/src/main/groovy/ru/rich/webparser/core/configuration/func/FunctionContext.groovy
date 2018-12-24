package ru.rich.webparser.core.configuration.func

import ru.rich.webparser.core.transform.collector.Collector

class FunctionContext {

    final Collector collector
    final Integer index

    FunctionContext(Collector collector, Integer index) {
        this.collector = collector
        this.index = index
    }

    FunctionContext(Collector collector) {
        this.collector = collector
        this.index = null
    }
}
