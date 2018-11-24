package ru.rich.matshop.db

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.PropertySource
import org.springframework.test.context.web.WebAppConfiguration

@SpringBootApplication(
        scanBasePackageClasses = [TestConfig.class]
)
@PropertySource(
        "file:../../conf/local/application.properties")
@Slf4j
@WebAppConfiguration
@CompileStatic
class TestConfig {

}