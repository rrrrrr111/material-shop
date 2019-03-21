## Initial Setup
1. Install
- Gradle 4.10+
- JDK 11+
- IntelliJ IDEA 2018.2+ or other IDE with Java support
3. In the settings of IntelliJ IDEA
- Code Style -> Java remove the splitting import to the asterisk
- Editor -> File Encodings -> Default encoding for properties files set UTF-8

## CLI Commands
* To launch the backend application, need to add starting configuration for the `ru.rich.matshop.webapi.Start` class,
    passing parameters
       - Program arguments

            --spring.config.location = file: /// C: / .. ../material-shop/conf/local/application.properties

* `Ctrl + F9` - When running the application with spring-boot-devtools, the build in IDEA restarts the application
* `gradle -i --stacktrace clean build` - Backend build
* `gradle -i --stacktrace flywayClean` - clearing the database schema
* `gradle -i --stacktrace flywayMigrate` - Nakat \ dok SQL skrpt on DB
* `gradle -i --stacktrace jooqGenerate` - JOOQ class generation

## Troubleshooting
- Jooq-generated entities (Record) are not put into ehcache (... Unable to make field private jdk.internal.reflect.MethodAccessorImpl ...) 

## Used
* [Java] (https://www.oracle.com/technetwork/java/javase/loads/index.html)
* [Gradle] (https://docs.gradle.org/current/userguide)
* [Spring Boot] (https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle)
* [Spring Boot Gradle Plugin] (https://docs.spring.io/spring-boot/docs/2.0.5.RELEASE/gradle-plugin/reference/html/)
* [Spring Security] (https://spring.io/guides/gs/securing-web/)
* [Thymeleaf] (https://www.thymeleaf.org/)
* [Flyway] (https://flywaydb.org/documentation/database/postgresql)
* [PostgreSQL] (https://www.postgresql.org/)
* [JOOQ] (https://www.jooq.org/doc/3.11/manual/)
* [ehcache] (http://www.ehcache.org/documentation/3.0/xml.html)
* Groovy
