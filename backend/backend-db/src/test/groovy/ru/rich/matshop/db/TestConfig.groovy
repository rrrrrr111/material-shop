package ru.rich.matshop.db

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.context.annotation.Bean
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.TestPropertySource
import org.springframework.test.context.jdbc.SqlScriptsTestExecutionListener

@ContextConfiguration
@TestPropertySource(
        "file:///S:/01_work/01_OtherProjects/material-shop/conf/local/application.properties")
@Slf4j
@CompileStatic
class TestConfig {

    @Bean
    sqlScriptsTestExecutionListener() {
        return new SqlScriptsTestExecutionListener()
    }
}