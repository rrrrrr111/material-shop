package ru.rich.matshop.webapi;

import org.jooq.conf.RenderNameStyle;
import org.jooq.conf.Settings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;

/**
 * @see org.springframework.boot.autoconfigure.jooq.JooqAutoConfiguration
 */
//@Configuration
public class JooqConfig {
    private static final Logger log = LoggerFactory.getLogger(JooqConfig.class);

    @Bean
    public Settings settings() {

        var settings = new Settings();
        RenderNameStyle style = RenderNameStyle.UPPER;
        settings.setRenderNameStyle(style);
        log.info("JOOQ render name style set to {}", style);

        boolean renderSchema = false;
        settings.setRenderSchema(renderSchema);
        log.info("JOOQ render schema set to {}", renderSchema);

        return settings;
    }
}