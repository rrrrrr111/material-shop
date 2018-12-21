package ru.rich.matshop.report;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.PropertyPlaceholderHelper;


/**
 * Конфигурация Spring модуля отчетности
 */
@Configuration
@ComponentScan(basePackageClasses = {ReportConfig.class})
public class ReportConfig {

    @Bean
    PropertyPlaceholderHelper placeholderHelper() {
        return new PropertyPlaceholderHelper(
                "${", "}", null, true
        );
    }
}