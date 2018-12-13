package ru.rich.webparser.core.configuration

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.model.Configuration

import static org.apache.commons.io.FilenameUtils.getFullPath
import static ru.rich.webparser.core.util.FileUtil.findFile
import static ru.rich.webparser.core.util.FileUtil.toAbsolutePath

/**
 * Загрузка конфигурации
 */
@Service
@Slf4j
@CompileStatic
class ConfigurationService {

    Configuration readConfig(String projectName, String filePath) {

        filePath = "conf/$projectName/$filePath"
        def confFilePath
        try {
            confFilePath = findFile("parser/web-parser-core/src/main/resources/$filePath")
        } catch (RuntimeException e) {
            confFilePath = findFile(filePath)
        }
        confFilePath = toAbsolutePath(confFilePath)
        ConfigObject configObject = new ConfigSlurper().parse(new URL("file:///$confFilePath"))

        def conf = (Configuration) configObject.configuration
        conf.projectName = projectName
        conf.path = getFullPath(confFilePath)

        log.info "Configuration from $confFilePath loaded $conf"
        conf
    }
}
