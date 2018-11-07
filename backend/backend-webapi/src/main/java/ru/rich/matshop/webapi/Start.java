package ru.rich.matshop.webapi;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

import java.util.Arrays;

@SpringBootApplication(scanBasePackageClasses = {Start.class})
@Import(WebSecurityConfig.class)
public class Start {
    private static Logger log = LoggerFactory.getLogger(Start.class);

    public static void main(String[] args) {
        SpringApplication.run(Start.class, args);
    }

    @Bean
    public CommandLineRunner loggingCommandLineRunner(ApplicationContext ctx) {
        return args -> {
            if (false) logBeans(ctx);
            if (true) logBaseUrl();
        };
    }

    private void logBeans(ApplicationContext ctx) {
        log.info("Let's inspect the beans provided:");
        String[] beanNames = ctx.getBeanDefinitionNames();

        Arrays.sort(beanNames);
        Arrays.asList(beanNames).forEach(x -> {
            log.info(" -> " + x);
        });
    }

    private void logBaseUrl() {
        log.trace("Tomcat started at http://127.0.0.1:8080");
    }
}
