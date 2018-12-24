package ru.rich.webparser.core.load.excel

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.apache.commons.io.FileUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import ru.rich.matshop.report.ReportForm
import ru.rich.matshop.report.ReportFormService
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.LoaderConf
import ru.rich.webparser.core.load.CollectorLoader
import ru.rich.webparser.core.transform.collector.Collector

/**
 * Формирует итоговый Excel файл
 */
@Service
@CompileStatic
@Slf4j
class CollectorToExcelLoader implements CollectorLoader {

    @Autowired
    ReportFormService reportFormService
    @Value('${webParser.workDir:parser/web-parser-core/build}')
    private String workDir

    @Override
    void load(Configuration conf, Collector mainCollector) {

        ReportForm form = reportFormService.create(
                conf.loaderConf.creatorId,
                new ExcelLoaderData(conf: conf, collector: mainCollector)
        )

        writeToDisc(conf, form)
    }

    private void writeToDisc(Configuration conf, ReportForm form) {
        FileUtils.writeByteArrayToFile(
                new File("$workDir/pages/${conf.projectName}/${form.fileName}"),
                form.data)
    }

    @Override
    boolean isApplicable(LoaderConf loaderConf) {
        return true
    }
}
