package ru.rich.matshop.db.seed

import groovy.transform.CompileStatic
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.jdbc.Sql
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import ru.rich.matshop.db.TestConfig

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = TestConfig.class)
@CompileStatic
class DbSeed extends GroovyTestCase {

    @Test
    @Sql(scripts = [
            "classpath:ru/rich/matshop/db/seed/db-seed-products.sql"
    ])
    void upload() {}


    @Test
    @Sql(scripts = [
            "classpath:db-seed-clean.sql"
    ])
    void clean() {}
}
