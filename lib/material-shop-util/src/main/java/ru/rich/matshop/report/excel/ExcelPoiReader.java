package ru.rich.matshop.report.excel;

import org.apache.poi.ss.usermodel.Cell;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.Date;


/**
 * Чтение данных из Excel файла, реализация на основе Apache POI HSSF
 * <p/>
 * Примеры работы с POI https://poi.apache.org/spreadsheet/examples.html
 */
class ExcelPoiReader implements ExcelReader<ExcelReader> {
    private static final Logger log = LoggerFactory.getLogger(ExcelPoiReader.class);

    private final ExcelPoiBuilder builder;

    ExcelPoiReader(ExcelPoiBuilder builder) {
        this.builder = builder;
    }

    @Override
    public String getStringValue() {
        return getCell(builder.cellNum).getStringCellValue();
    }

    @Override
    public BigDecimal getNumericValue() {
        return BigDecimal.valueOf(getCell(builder.cellNum).getNumericCellValue());
    }

    @Override
    public Date getDateValue() {
        return getCell(builder.cellNum).getDateCellValue();
    }

    @Override
    public String getNextStringValue() {
        return getCell(++builder.cellNum).getStringCellValue();
    }

    @Override
    public BigDecimal getNextNumericValue() {
        return BigDecimal.valueOf(getCell(++builder.cellNum).getNumericCellValue());
    }

    @Override
    public Date getNextDateValue() {
        return getCell(++builder.cellNum).getDateCellValue();
    }

    private Cell getCell(int cellNum) {
        return builder.sheetWrapper.getCell(
                builder.rowNum,
                cellNum
        );
    }

    @Override
    public ExcelReader toCell(int rowNum, int cellNum) {
        builder.toCell(rowNum, cellNum);
        return this;
    }

    @Override
    public ExcelReader toCell(int cellNum) {
        builder.toCell(cellNum);
        return this;
    }

    @Override
    public ExcelReader toRelative(int rows, int cells) {
        builder.toRelative(rows, cells);
        return this;
    }

    @Override
    public ExcelReader toRelative(int cells) {
        builder.toRelative(cells);
        return this;
    }

    @Override
    public ExcelReader toRelativeRow(int rows) {
        builder.toRelativeRow(rows);
        return this;
    }

    @Override
    public ExcelReader toNextRow() {
        builder.toNextRow();
        return this;
    }
}
