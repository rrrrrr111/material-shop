package ru.rich.webparser.core.load.excel

import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import ru.rich.matshop.report.AbstractTemplateBasedCreator
import ru.rich.matshop.report.ReportFileFormat
import ru.rich.matshop.report.excel.BasicBuilder
import ru.rich.matshop.report.excel.ExcelBuilder
import ru.rich.matshop.report.excel.ExcelStreamBuilder
import ru.rich.matshop.report.excel.ExcelStreamCreator
import ru.rich.matshop.report.excel.ItemWriter
import ru.rich.matshop.report.excel.KeyMapper
import ru.rich.matshop.util.FileUtil
import ru.rich.webparser.core.transform.collector.Collector

/**
 * Формирует итоговый Excel файл
 */
@Service
@CompileStatic
class ProductRegistryCreator extends AbstractTemplateBasedCreator<ExcelLoaderData>
        implements ExcelStreamCreator<ExcelLoaderData> {

    static final String ID = this.class.toString()

    @Value('${webParser.confDir:conf}')
    String confDir

    @Override
    String getId() {
        return ID
    }

    @Override
    ReportFileFormat getOutputFormat() {
        return ReportFileFormat.XLSX
    }

    @Override
    String getTemplatePath(ExcelLoaderData data) {
        return "$confDir/${data.conf.projectName}/${data.conf.loaderConf.excelTemplateName}"
    }

    @Override
    String getOutputFileName(ExcelLoaderData data) {
        return FileUtil.generateFileName(data.conf.loaderConf.reportPrefix, getOutputFormat().getExtension())
    }

    @Override
    void create(final ExcelStreamBuilder esb, final ExcelLoaderData data) {

        ExcelBuilder eb = esb.getTemplateBuilder()

        buildTable(esb, data.collector)

        int tableEndRowNum = eb.toRelativeRow(1).getRowNum()
        esb.copyRowsFromTemplate(tableEndRowNum, eb.getLastRowNum())
    }

    private void buildTable(final ExcelStreamBuilder esb,
                            final Collector mainCollector) {

        final ExcelBuilder eb = esb.getTemplateBuilder()

        eb.applyPlaceholders("table_input", false, new KeyMapper() {

            @Override
            Object resolve(int rowNum, int cellNum, String key) {

                eb.toCell(rowNum, cellNum)

                esb.copyRowsFromTemplate(0, rowNum - 1)
                        .toCell(rowNum, cellNum)
                        .insertItems(mainCollector.getCollectors(),
                        new ItemWriter<Collector>() {
                            @Override
                            void writeRow(BasicBuilder<? extends BasicBuilder> b, int itemNum, Collector item) {

                                esb.setCell(String.valueOf(itemNum + 1))
                                        .setNextCell("")
                                        .setNextCell(item.getValue("url").val)
                                        .setNextCell(item.getValue("name").val)
                                        .setNextCell(item.getValue("title").val)
                                        .setNextCell(item.getValuesList("pics").values.toString())
                                        .setNextCell(item.getValuesList("description").values.toString())
                            }
                        })
                return null
            }
        })
    }
}