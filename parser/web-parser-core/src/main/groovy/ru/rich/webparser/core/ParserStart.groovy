package ru.rich.webparser.core

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Import
import ru.rich.matshop.report.ReportConfig
import ru.rich.webparser.core.configuration.ConfigurationService
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.transform.collector.Collector

/**
 * Конфигурация Spring и стартовый метод
 */
@SpringBootApplication(
        scanBasePackageClasses = [ParserStart.class]
)
@Slf4j
@CompileStatic
@Import(ReportConfig.class)
class ParserStart {

    @Autowired
    ConfigurationService configurationService
    @Autowired
    EtlService etlService

    static void main(String[] args) {
        SpringApplication.run(ParserStart.class, args)
    }

    @Bean
    CommandLineRunner run(ApplicationContext ctx) {
        return { args ->
            log.info 'Parser starting'

            def projectName = "test"

            Configuration conf = configurationService.readFileConfig(projectName, "configuration.groovy")
            Collector collector = etlService.process(conf)

            log.info "Parser finished, collected data: $collector"
        } as CommandLineRunner
    }
}