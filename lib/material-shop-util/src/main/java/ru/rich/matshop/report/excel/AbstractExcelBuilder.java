package ru.rich.matshop.report.excel;

import org.apache.poi.ss.usermodel.Workbook;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;

/**
 * Общие методы для билдеров
 */
abstract class AbstractExcelBuilder<T extends BasicBuilder> implements BasicBuilder<T> {

    PlaceholdersSupport placeholdersSupport;
    PoiWorkbookWrapper wbWrapper;
    PoiSheetWrapper sheetWrapper;

    int rowNum;
    int cellNum;

    @Override
    public T toCell(int rowNum, int cellNum) {
        this.rowNum = rowNum;
        this.cellNum = cellNum;
        return (T) this;
    }

    @Override
    public T toCell(int cellNum) {
        toCell(rowNum, cellNum);
        return (T) this;
    }

    @Override
    public T setCell(int rowNum, int cellNum, Date value) {
        return setCell(rowNum, cellNum, value, null);
    }

    @Override
    public T setCell(int rowNum, int cellNum, BigDecimal value) {
        return setCell(rowNum, cellNum, value, null);
    }

    @Override
    public T setCell(String value) {
        return setCell(rowNum, cellNum, value);
    }

    @Override
    public T setCell(Date value) {
        return setCell(rowNum, cellNum, value, null);
    }

    @Override
    public T setCell(BigDecimal value) {
        return setCell(rowNum, cellNum, value, null);
    }

    @Override
    public T setNextCell(String value) {
        return setCell(rowNum, ++cellNum, value);
    }

    @Override
    public T setNextCell(Date value) {
        return setCell(rowNum, ++cellNum, value);
    }

    @Override
    public T setNextCell(Date value, String format) {
        return setCell(rowNum, ++cellNum, value, format);
    }

    @Override
    public T setNextCell(BigDecimal value) {
        return setCell(rowNum, ++cellNum, value);
    }

    @Override
    public T toRelative(int rows, int cells) {
        return toCell(rowNum + rows, cellNum + cells);
    }

    @Override
    public T toRelative(int cells) {
        return toCell(rowNum, cellNum + cells);
    }

    @Override
    public T toRelativeRow(int rows) {
        return toCell(rowNum + rows, cellNum);
    }

    @Override
    public T toNextRow() {
        return toRelativeRow(1);
    }

    @Override
    public <I> T insertItems(Collection<I> items, ItemWriter<I> writer) {
        return insertItems(rowNum, cellNum, items, writer);
    }

    @Override
    public T setDateFormat(String dateFormat) {
        sheetWrapper.setDateFormat(dateFormat);
        return (T) this;
    }

    @Override
    public T setNumberFormat(String numberFormat) {
        sheetWrapper.setNumberFormat(numberFormat);
        return (T) this;
    }

    @Override
    public T setRowHeight(short height) {
        sheetWrapper.setRowHeight(rowNum, height);
        return (T) this;
    }

    @Override
    public int getRowNum() {
        return rowNum;
    }

    @Override
    public int getCellNum() {
        return cellNum;
    }

    @Override
    public int getLastRowNum() {
        return sheetWrapper.getLastRowNum();
    }

    public byte[] build() {
        return wbWrapper.toBytes();
    }

    Workbook getWorkbook() {
        return wbWrapper.getWorkbook();
    }
}
