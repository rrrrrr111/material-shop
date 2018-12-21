package ru.rich.matshop.util;

import com.google.common.base.Preconditions;
import com.google.common.net.MediaType;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Утилиты для печати файлов
 */
public class ReportUtil {

    private static final Map<String, MediaType> EXTENSION_MAP;

    static {
        var map = new HashMap<String, MediaType>();
        register(map, MediaType.PLAIN_TEXT_UTF_8, "txt", "log", "ini");
        register(map, MediaType.PDF, "pdf");
        register(map, MediaType.CSV_UTF_8, "csv");
        register(map, MediaType.OOXML_DOCUMENT, "docx");
        register(map, MediaType.OOXML_SHEET, "xlsx");
        register(map, MediaType.MICROSOFT_EXCEL, "xls", "xlt", "xlm");
        register(map, MediaType.XML_UTF_8, "xml", "dtd", "xslt", "xsl", "xsd");
        register(map, MediaType.HTML_UTF_8, "html", "htm");
        register(map, MediaType.RTF_UTF_8, "rtf");
        register(map, MediaType.ZIP, "zip", "war", "jar", "ear", "fab");
        register(map, MediaType.OPENDOCUMENT_TEXT, "odt");
        EXTENSION_MAP = Collections.unmodifiableMap(map);
    }

    private static void register(Map<String, MediaType> map, MediaType mediaType, String... extensions) {
        for (String ext : extensions) {
            MediaType prevMediaType = map.put(ext, mediaType);
            Preconditions.checkState(prevMediaType == null);
        }
    }

    /**
     * Ищет MIME тип по расширению файла
     *
     * @param extension расширение файла, для которого производится определение типа
     * @return MIME тип по расширению файла
     */
    public static MediaType findMimeTypeForExtension(String extension) {
        extension = extension != null ? extension.toLowerCase() : null;
        MediaType mediaType = EXTENSION_MAP.get(extension);
        return mediaType != null ? mediaType : MediaType.OCTET_STREAM;
    }
}
