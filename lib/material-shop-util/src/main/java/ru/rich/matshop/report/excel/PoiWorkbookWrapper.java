package ru.rich.matshop.report.excel;

import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.poi.ss.usermodel.Workbook;

import java.io.IOException;

/**
 * Обертка для работы c книгой документа POI Excel
 */
class PoiWorkbookWrapper {

    private final Workbook wb;

    PoiWorkbookWrapper(Workbook wb) {
        this.wb = wb;
    }

    byte[] toBytes() {
        try {
            final ByteArrayOutputStream baos = new ByteArrayOutputStream();
            wb.write(baos);
            return baos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    Workbook getWorkbook() {
        return wb;
    }
}
