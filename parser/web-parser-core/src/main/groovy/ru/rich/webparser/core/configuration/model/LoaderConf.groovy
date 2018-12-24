package ru.rich.webparser.core.configuration.model

import groovy.transform.CompileStatic


/**
 * Конфигурация выгрузки итоговых данных
 */
@CompileStatic
class LoaderConf {

    String excelTemplateName
    String creatorId
    String reportPrefix

}
