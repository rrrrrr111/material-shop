package ru.rich.webparser.core

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.Bean
import ru.rich.webparser.core.configuration.ConfigurationService
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.parser.ParserService
import ru.rich.webparser.core.template.TemplateParserService

@SpringBootApplication(
        scanBasePackageClasses = [ParserConfig.class]
)
@Slf4j
@CompileStatic
class ParserConfig {

    @Autowired
    ConfigurationService configurationService
    @Autowired
    ParserService parserService
    @Autowired
    TemplateParserService templateParserService

    static void main(String[] args) {
        log.info 'Parser starting'
        SpringApplication.run(ParserConfig.class, args)
        log.info 'Parser finished'
    }

    @Bean
    CommandLineRunner run(ApplicationContext ctx) {
        return { args ->

            def projectName = "test"

            Configuration conf = configurationService.readConfig(projectName, "configuration.groovy")
            templateParserService.prepareTemplates(conf.path, conf.pages)

            //Collector collector = parserService.parse(conf)

            //log.info collector.toString()

        } as CommandLineRunner
    }
}