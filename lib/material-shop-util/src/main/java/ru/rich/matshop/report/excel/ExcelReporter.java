package ru.rich.matshop.report.excel;

import com.google.common.base.Preconditions;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Component;
import ru.rich.matshop.report.CreatorHolder;
import ru.rich.matshop.report.ReportForm;
import ru.rich.matshop.report.ReportFileFormat;

import java.io.InputStream;

/**
 * Управление Excel креаторами.
 */
@Component
public class ExcelReporter extends CreatorHolder<ExcelCreator> {

    @Override
    protected <D> ReportForm createReportForm(ExcelCreator creator, D data, String formFilename) {
        String templatePath = creator.getTemplatePath(data);
        ReportFileFormat templateFormat = ReportFileFormat.findByFileName(templatePath);
        ReportFileFormat outputFormat = creator.getOutputFormat();

        Preconditions.checkArgument(outputFormat.equals(templateFormat),
                "Template format '%s' and creator output format '%s' must be the same for creator %s",
                templateFormat, outputFormat, creator);

        InputStream templateStream = null;
        try {
            templateStream = loadClasspathFile(templatePath);

            ExcelPoiBuilder builder = new ExcelPoiBuilder(templateStream, creator.getPlaceholderHelper());
            creator.create(builder, data);
            byte[] reportFormData = builder.build();
            return new ReportForm(
                    formFilename,
                    reportFormData,
                    outputFormat.getMimeType().toString());
        } finally {
            IOUtils.closeQuietly(templateStream);
        }
    }

    @Override
    protected <D> ReportForm createReportForm(ExcelCreator creator, D data) {
        return createReportForm(creator, data, creator.getOutputFileName(data));
    }
}