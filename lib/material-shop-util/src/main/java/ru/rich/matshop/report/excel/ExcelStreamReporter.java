package ru.rich.matshop.report.excel;

import com.google.common.base.Preconditions;
import org.springframework.stereotype.Component;
import ru.rich.matshop.report.CreatorHolder;
import ru.rich.matshop.report.ReportForm;
import ru.rich.matshop.report.ReportFileFormat;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;


/**
 * Управление ExcelStream креаторами.
 */
@Component
public class ExcelStreamReporter extends CreatorHolder<ExcelStreamCreator> {

    private static final List<ReportFileFormat> SUPPORTED_TEMPLATE_FORMATS = Arrays.asList(ReportFileFormat.XLSX, ReportFileFormat.XLS);
    private static final ReportFileFormat SUPPORTED_OUTPUT_FORMAT = ReportFileFormat.XLSX;

    @Override
    protected <D> ReportForm createReportForm(ExcelStreamCreator creator, D data, String formFilename) {
        String templatePath = creator.getTemplatePath(data);
        ReportFileFormat templateFormat = ReportFileFormat.findByFileName(templatePath);
        ReportFileFormat outputFormat = creator.getOutputFormat();

        Preconditions.checkArgument(outputFormat.equals(SUPPORTED_OUTPUT_FORMAT), "Only {} output format supported", SUPPORTED_OUTPUT_FORMAT);
        Preconditions.checkArgument(SUPPORTED_TEMPLATE_FORMATS.contains(templateFormat), "Only {} template formats supported", SUPPORTED_TEMPLATE_FORMATS);


        try (InputStream templateStream = loadClasspathFile(templatePath)) {

            ExcelPoiStreamBuilder builder = new ExcelPoiStreamBuilder(
                    new ExcelPoiBuilder(templateStream, creator.getPlaceholderHelper()));
            creator.create(builder, data);
            byte[] reportFormData = builder.build();
            return new ReportForm(
                    formFilename,
                    reportFormData,
                    outputFormat.getMimeType().toString());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected <D> ReportForm createReportForm(ExcelStreamCreator creator, D data) {
        return createReportForm(creator, data, creator.getOutputFileName(data));
    }
}