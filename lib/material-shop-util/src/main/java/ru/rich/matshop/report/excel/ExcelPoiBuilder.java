package ru.rich.matshop.report.excel;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.PropertyPlaceholderHelper;

import java.io.IOException;
import java.io.InputStream;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;

/**
 * Наполняет Excel шаблон данными, реализация на основе Apache POI HSSF / XSSF
 * <p/>
 * Примеры работы с POI https://poi.apache.org/spreadsheet/examples.html
 */
public class ExcelPoiBuilder extends AbstractExcelBuilder<ExcelBuilder> implements ExcelBuilder {
    private static final Logger log = LoggerFactory.getLogger(ExcelPoiBuilder.class);

    public ExcelPoiBuilder(InputStream template, PropertyPlaceholderHelper placeholderHelper) {
        try {
            Workbook wb = WorkbookFactory.create(template);
            wbWrapper = new PoiWorkbookWrapper(wb);
            Sheet sheet = wb.getSheetAt(wb.getFirstVisibleTab());
            sheetWrapper = new PoiSheetWrapper(sheet);
            placeholdersSupport = new PlaceholdersSupport(sheet, sheetWrapper, placeholderHelper);
            toCell(sheet.getFirstRowNum(), cellNum);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ExcelPoiBuilder setCell(int rowNum, int cellNum, String value) {
        this.rowNum = rowNum;
        this.cellNum = cellNum;
        sheetWrapper.setCell(rowNum, cellNum, value, null);
        return this;
    }

    @Override
    public ExcelPoiBuilder setCell(int rowNum, int cellNum, Date value, String format) {
        this.rowNum = rowNum;
        this.cellNum = cellNum;
        sheetWrapper.setCell(rowNum, cellNum, value, format, null);
        return this;
    }

    @Override
    public ExcelPoiBuilder setCell(int rowNum, int cellNum, BigDecimal value, String format) {
        this.rowNum = rowNum;
        this.cellNum = cellNum;
        sheetWrapper.setCell(rowNum, cellNum, value, format, null);
        return this;
    }

    @Override
    public <T> ExcelBuilder insertItems(int rowNum, int cellNum, Collection<T> items, ItemWriter<T> writer) {
        toCell(rowNum, cellNum);
        if (items == null || items.isEmpty()) {
            return toRelativeRow(1);
        }
        sheetWrapper.prepareRowsBasedOn(this.rowNum, items.size());
        int i = 0;
        for (T item : items) {
            writer.writeRow(this, i++, item);
            toCell(this.rowNum + 1, cellNum);
        }
        return this;
    }

    @Override
    public ExcelBuilder applyPlaceholders(KeyMapper keyMapper) {
        placeholdersSupport.applyPlaceholders(null, false, keyMapper);
        return this;
    }

    @Override
    public ExcelBuilder applyPlaceholders(final String keyPrefix, final boolean nullToEmpty,
                                          final KeyMapper keyMapper) {
        placeholdersSupport.applyPlaceholders(keyPrefix, nullToEmpty, keyMapper);
        return this;
    }

    @Override
    public ExcelBuilder applyDataModelPropertyPlaceholders(String keyPrefix, final Serializable dataModel) {
        placeholdersSupport.applyDataModelPropertyPlaceholders(keyPrefix, dataModel);
        return this;
    }

    @Override
    public ExcelBuilder clearCell(int rowNum, int cellNum) {
        sheetWrapper.clearCell(rowNum, cellNum);
        return this;
    }

    @Override
    public ExcelBuilder clearCell() {
        return clearCell(rowNum, cellNum);
    }

    @Override
    public ExcelBuilder clearRow(int rowNum) {
        sheetWrapper.clearRow(rowNum);
        if (rowNum >= sheetWrapper.getLastRowNum()) {
            toCell(sheetWrapper.getLastRowNum(), cellNum);
        } else {
            toCell(rowNum, cellNum);
        }
        if (log.isTraceEnabled()) {
            log.trace("Cleaning row {}, current row {}", rowNum, this.rowNum);
        }
        return this;
    }

    @Override
    public ExcelBuilder clearRow() {
        return clearRow(rowNum);
    }

    @Override
    public ExcelBuilder deleteRow(int rowNum) {
        sheetWrapper.deleteRow(rowNum);
        if (rowNum >= sheetWrapper.getLastRowNum()) {
            toCell(sheetWrapper.getLastRowNum(), cellNum);
        } else {
            toCell(rowNum, cellNum);
        }
        if (log.isTraceEnabled()) {
            log.trace("Deleting row {}, current row {}", rowNum, this.rowNum);
        }
        return this;
    }

    @Override
    public ExcelBuilder deleteRow() {
        return deleteRow(rowNum);
    }
}
