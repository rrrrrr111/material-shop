package ru.rich.matshop.report;

import com.google.common.net.MediaType;
import org.apache.commons.io.FilenameUtils;
import ru.rich.matshop.util.ReportUtil;

/**
 * Форматы формируемого документа
 */
public enum ReportFileFormat {

    /**
     * Microsoft Excel 2007-2010
     */
    XLSX("xlsx"),
    /**
     * Microsoft Excel 2003
     */
    XLS("xls"),
    /**
     * TXT
     */
    TXT("txt"),
    /**  */
    DOCX("docx"),
    /**  */
    ODT("odt"),
    /**  */
    PDF("pdf");

    private final String extension;

    ReportFileFormat(String extension) {
        this.extension = extension;
    }

    public String getExtension() {
        return extension;
    }

    public static ReportFileFormat find(String extension) {
        if (extension != null) {
            extension = extension.toLowerCase();
        }
        for (ReportFileFormat f : ReportFileFormat.values()) {
            if (f.extension.equals(extension)) {
                return f;
            }
        }
        throw new RuntimeException("Cannot determine format for extension " + extension);
    }

    public static ReportFileFormat findByFileName(String fileName) {
        return find(FilenameUtils.getExtension(fileName));
    }

    public MediaType getMimeType() {
        return ReportUtil.findMimeTypeForExtension(extension);
    }

    @Override
    public String toString() {
        return super.toString() + "{" +
                "extension='" + extension + '\'' +
                '}';
    }
}
