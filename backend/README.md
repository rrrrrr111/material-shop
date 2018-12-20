#### Первичная настройка
1. Устанавливаем
    - Gradle 4.10+
    - JDK 11+
    - IntelliJ IDEA 2018.2+ или др IDE для работы с Java
3. В настройках IntelliJ IDEA
    - Code Style -> Java убрать схловывание импортов к звездочке
    - Editor -> File Encodings -> Default encoding for properties files ставим UTF-8

#### Команды
* Для запуска приложения бэкенда делаем конфигурацию запуска класса `ru.rich.matshop.webapi.Start`,
       передаем параметры
       - Program arguments

            --spring.config.location=file:///C:/.. ../material-shop/conf/local/application.properties

* `Ctrl + F9` - При запущеном приложении со spring-boot-devtools, сборка в IDEA выполняет перезапуск приложения
* `gradle -i --stacktrace clean build` - Сборка бэкенда
* `gradle -i --stacktrace flywayClean` - Очистка схемы БД
* `gradle -i --stacktrace flywayMigrate` - Накат\докат SQL скрптов на БД
* `gradle -i --stacktrace jooqGenerate` - Генерация классов JOOQ

#### Troubleshooting
- Генерируемые Jooq сущности (Record) не кладутся в ehcache (... Unable to make field private jdk.internal.reflect.MethodAccessorImpl ...)

#### Используется
* [Java](https://www.oracle.com/technetwork/java/javase/loads/index.html)
* [Gradle](https://docs.gradle.org/current/userguide)
* [Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle)
* [Spring Boot Gradle Plugin](https://docs.spring.io/spring-boot/docs/2.0.5.RELEASE/gradle-plugin/reference/html/)
* [Spring Security](https://spring.io/guides/gs/securing-web/)
* [Thymeleaf](https://www.thymeleaf.org/)
* [Flyway](https://flywaydb.org/documentation/database/postgresql)
* [PostgreSQL](https://www.postgresql.org/)
* [JOOQ](https://www.jooq.org/doc/3.11/manual/)
* [ehcache](http://www.ehcache.org/documentation/3.0/xml.html)
* Groovy



