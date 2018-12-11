package ru.rich.webparser.core.service

import groovy.transform.CompileStatic
import org.springframework.stereotype.Service
import ru.rich.webparser.core.collector.Collector
import ru.rich.webparser.core.collector.CollectorService
import ru.rich.webparser.core.configuration.model.Configuration

@Service
@CompileStatic
class ParserService {

    final CollectorService collectorService
    final CanonicalizationService canonicalizationService

    Collector parse(Configuration conf) {

        def c = new Collector()


        return c
    }
}
