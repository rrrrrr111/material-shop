package ru.rich.webparser.core.configuration

import groovy.transform.CompileStatic
import org.springframework.stereotype.Service

@Service
@CompileStatic
class ConfigurationService {

    Configuration readConfig(String filePath) {

        new Configuration()
    }
}
