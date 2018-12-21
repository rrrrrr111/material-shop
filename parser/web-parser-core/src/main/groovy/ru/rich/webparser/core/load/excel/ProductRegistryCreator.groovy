package ru.rich.webparser.core.load.excel

import groovy.transform.CompileStatic
import groovy.transform.PackageScope
import org.springframework.stereotype.Service
import ru.rich.matshop.report.AbstractTemplateBasedCreator
import ru.rich.matshop.report.ReportFileFormat
import ru.rich.matshop.report.excel.BasicBuilder
import ru.rich.matshop.report.excel.ExcelBuilder
import ru.rich.matshop.report.excel.ExcelStreamBuilder
import ru.rich.matshop.report.excel.ExcelStreamCreator
import ru.rich.matshop.report.excel.ItemWriter
import ru.rich.matshop.report.excel.KeyMapper
import ru.rich.webparser.core.transform.collector.Collector

/**
 * Формирует итоговый Excel файл
 */
@Service
@CompileStatic
@PackageScope
class ProductRegistryCreator extends AbstractTemplateBasedCreator<Collector>
        implements ExcelStreamCreator<Collector> {

    static final String ID = this.class.toString()

    @Override
    String getId() {
        return ID
    }

    @Override
    ReportFileFormat getOutputFormat() {
        return ReportFileFormat.XLSX
    }

    @Override
    String getTemplatePath(Collector mainCollector) {
        return "conf/test/product_registry_tpl.xlsx"
    }

    @Override
    String getOutputFileName(Collector mainCollector) {
        return super.getOutputFileName(mainCollector)
    }

    @Override
    void create(final ExcelStreamBuilder esb, final Collector model) {

        ExcelBuilder eb = esb.getTemplateBuilder()

        buildTable(esb, model)

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
