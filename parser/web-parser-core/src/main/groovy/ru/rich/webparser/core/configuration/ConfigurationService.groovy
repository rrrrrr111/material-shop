package ru.rich.webparser.core.configuration

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.template.TemplateParserService

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

    @Value('${webParser.confDir:conf}')
    String confDir
    @Autowired
    TemplateParserService templateParserService

    Configuration readFileConfig(String projectName, String filePath) {

        def conf = loadFileConfig(projectName, filePath)
        templateParserService.prepareTemplates(conf.path, conf.pages)

        conf
    }

    private Configuration loadFileConfig(String projectName, String filePath) {
        filePath = "$confDir/$projectName/$filePath"
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
