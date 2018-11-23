package ru.rich.matshop.db.seed

import groovy.transform.CompileStatic
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.jdbc.Sql
import org.springframework.test.context.jdbc.SqlGroup
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests
import org.testng.annotations.Test
import ru.rich.matshop.db.TestConfig

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.MOCK,
        classes = TestConfig.class
)
@AutoConfigureMockMvc
@CompileStatic
class DbSeed extends AbstractTestNGSpringContextTests {

    @Test
    @SqlGroup([
            @Sql(scripts = [
                    "classpath:db-seed-products.sql"
            ])
    ])
    void upload() {}


    @Test
    @SqlGroup([
            @Sql(scripts = [
                    "classpath:db-seed-clean.sql"
            ]),
    ])
    void clean() {}
}
