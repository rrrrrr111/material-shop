package ru.rich.matshop.report.excel;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * Обертка для работы c листом документа POI Excel
 */
class PoiSheetWrapper {
    private static final Logger log = LoggerFactory.getLogger(PoiSheetWrapper.class);

    private String dateFormat = CellValueFormat.DATE.getValue();
    private String numberFormat = CellValueFormat.MONEY.getValue();

    private Sheet sheet;
    private Row row;

    PoiSheetWrapper(Sheet sheet) {
        this.sheet = sheet;
    }

    void setCell(int rowNum, int cellNum, Date value, String format, CellStyle style) {
        Cell cell = getCell(rowNum, cellNum);
        if (value == null) {
            cell.setCellType(CellType.BLANK);
        } else {
            if (format == null) {
                format = dateFormat;
            }
            setCellStyle(cell, format, style);
            cell.setCellValue(value);
        }
        if (log.isTraceEnabled()) {
            log.trace("Set cell [{}, {}] Date value {}", rowNum, cellNum,
                    value == null ? null : DateFormatUtils.ISO_8601_EXTENDED_DATETIME_TIME_ZONE_FORMAT.format(value));
        }
    }

    void setCell(int rowNum, int cellNum, BigDecimal value, String format, CellStyle style) {
        Cell cell = getCell(rowNum, cellNum);
        if (value == null) {
            cell.setCellType(CellType.BLANK);
        } else {
            if (format == null) {
                format = numberFormat;
            }
            setCellStyle(cell, format, style);
            cell.setCellValue(value.doubleValue());
        }
        if (log.isTraceEnabled()) {
            log.trace("Set cell [{}, {}] BigDecimal value {}", rowNum, cellNum, value);
        }
    }

    void setCell(int rowNum, int cellNum, String value, CellStyle style) {
        Cell cell = getCell(rowNum, cellNum);
        cell.setCellValue(value);
        if (style != null) {
            cell.setCellStyle(style);
        }
        if (log.isTraceEnabled()) {
            log.trace("Set cell [{}, {}] String value {}", rowNum, cellNum, value);
        }
    }

    private Cell getCell(int rowNum, int cellNum) {
        return getRow(rowNum).getCell(cellNum, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
    }

    Row getRow(int rowNum) {
        if (row == null || row.getRowNum() != rowNum) {
            row = sheet.getRow(rowNum);
            if (row == null) {
                row = sheet.createRow(rowNum);
            }
        }
        return row;
    }

    private void setCellStyle(Cell cell, String format, CellStyle style) {
        if (format != null) {
            style = (style == null ? cell.getCellStyle() : style);
            style.setDataFormat(sheet.getWorkbook().createDataFormat().getFormat(format));
            cell.setCellStyle(style);
        } else if (style != null) {
            cell.setCellStyle(style);
        }
    }

    public void deleteRow(int rowNum) {
        row = sheet.getRow(rowNum);
        if (row != null) {
            for (int i = sheet.getNumMergedRegions() - 1; i >= 0; i--) {
                final CellRangeAddress mergedRegion = sheet.getMergedRegion(i);
                if (mergedRegion.getFirstRow() == rowNum) {
                    sheet.removeMergedRegion(i);
                    if (log.isTraceEnabled()) {
                        log.trace("Removing merged region {}", mergedRegion.formatAsString());
                    }
                }
            }
            clearRow(rowNum);
        }
        int lastRowNum = sheet.getLastRowNum();
        if (rowNum < lastRowNum) {
            sheet.shiftRows(rowNum + 1, lastRowNum, -1, true, false);
        }
    }

    void clearCell(int rowNum, int cellNum) {
        getCell(rowNum, cellNum).setCellType(CellType.BLANK);
        if (log.isTraceEnabled()) {
            log.trace("Clean cell [{}, {}]", rowNum, cellNum);
        }
    }

    void setRowHeight(int rowNum, short height) {
        sheet.getRow(rowNum).setHeight(height);
    }

    void clearRow(int rowNum) {
        row = sheet.getRow(rowNum);
        if (row != null) {
            sheet.removeRow(row);
            row = null;
        }
    }

    /**
     * Готовит указанное количество строк на основе текущей со сдвигом остатка
     * страницы вниз, (из текущей строки копируются только стили). Текущее
     * положение не меняется. Строка-шаблон удаляется.
     *
     * @param rowsCount - количество подготавливаемых строк
     */
    void prepareRowsBasedOn(int rowNum, int rowsCount) {
        Row templateRow = sheet.getRow(rowNum);
        sheet.shiftRows(rowNum, sheet.getLastRowNum(), rowsCount, true, false); // сдвигаем вниз остаток страницы на необходимое кол-во строк
        if (log.isTraceEnabled()) {
            log.trace("Shifting down rows {}-{} to {}-{}", rowNum, sheet.getLastRowNum() - 1, rowNum + 1, sheet.getLastRowNum());
        }
        for (int i = 0; i < rowsCount; i++, rowNum++) { // копируем стили из строки-шаблона
            for (int j = templateRow.getFirstCellNum(); j <= templateRow.getLastCellNum(); j++) {
                Cell cell = templateRow.getCell(j);
                if (cell != null) {
                    getCell(rowNum, j).setCellStyle(cell.getCellStyle());
                }
            }
            if (log.isTraceEnabled()) {
                log.trace("Copy row {} from template, {} cells copied", rowNum, templateRow.getLastCellNum() - templateRow.getFirstCellNum());
            }
        }
        deleteRow(rowNum); // удалим строку-шаблон
    }

    void copyMergedRegion(int rowShift, CellRangeAddress region) {
        CellRangeAddress copy = region.copy();
        copy.setFirstRow(rowShift + copy.getFirstRow());
        copy.setLastRow(rowShift + copy.getLastRow());
        sheet.addMergedRegion(copy);
    }

    void setDateFormat(String dateFormat) {
        this.dateFormat = dateFormat;
    }

    void setNumberFormat(String moneyFormat) {
        this.numberFormat = moneyFormat;
    }

    int getLastRowNum() {
        return sheet.getLastRowNum();
    }

    String getSheetName() {
        return sheet.getSheetName();
    }

    List<CellRangeAddress> getMergedRegions() {
        return sheet.getMergedRegions();
    }

    Sheet getSheet() {
        return sheet;
    }

    CellStyle getCellStyle(int rowNum, int cellNum) {
        return getCell(rowNum, cellNum).getCellStyle();
    }
}