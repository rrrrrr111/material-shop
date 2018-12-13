package ru.rich.webparser.core

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.Bean
import ru.rich.webparser.core.collector.Collector
import ru.rich.webparser.core.configuration.ConfigurationService
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.parser.ParserService
/**
 * Конфигурация Spring и стартовый метод
 */
@SpringBootApplication(
        scanBasePackageClasses = [ParserStart.class]
)
@Slf4j
@CompileStatic
class ParserStart {

    @Autowired
    ConfigurationService configurationService
    @Autowired
    ParserService parserService


    static void main(String[] args) {
        log.info 'Parser starting'
        SpringApplication.run(ParserStart.class, args)
        log.info 'Parser finished'
    }

    @Bean
    CommandLineRunner run(ApplicationContext ctx) {
        return { args ->

            def projectName = "test"

            Configuration conf = configurationService.readConfig(projectName, "configuration.groovy")
            Collector collector = parserService.parse(conf)

            //log.info collector.toString()

        } as CommandLineRunner
    }
}