package ru.rich.webparser.core.configuration

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.stereotype.Service

import static ru.rich.webparser.core.util.FileUtil.findFile
import static ru.rich.webparser.core.util.FileUtil.toAbsolutePath

@Service
@Slf4j
@CompileStatic
class ConfigurationService {

    Configuration readConfig(String filePath) {

        def confFilePath
        try {
            confFilePath = findFile("parser/web-parser-core/src/main/resources/$filePath")
        } catch (RuntimeException e) {
            confFilePath = findFile(filePath)
        }
        confFilePath = toAbsolutePath(confFilePath)
        ConfigObject config = new ConfigSlurper().parse(new URL("file:///$confFilePath"))

        log.info "Configuration from $confFilePath loaded"

        new Configuration(config: config)
    }
}
