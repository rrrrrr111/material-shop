package ru.rich.matshop.report.excel;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;

/**
 * Копирование данных POI Excel документа
 */
class PoiCopySupport {

    void copySheetInfo(Sheet fromSheet, Sheet toSheet) {

        if (fromSheet.getColumnBreaks() != null) {
            for (int colBreak : fromSheet.getColumnBreaks()) {
                toSheet.setColumnBreak(colBreak);
            }
        }
        CellRangeAddress repeatingColumns = fromSheet.getRepeatingColumns();
        if (repeatingColumns != null) {
            toSheet.setRepeatingColumns(repeatingColumns.copy());
        }
        toSheet.setDefaultColumnWidth(fromSheet.getDefaultColumnWidth());
        toSheet.setDefaultRowHeight(fromSheet.getDefaultRowHeight());
        toSheet.setAutobreaks(fromSheet.getAutobreaks());
        toSheet.setDisplayFormulas(fromSheet.isDisplayFormulas());
        toSheet.setDisplayGridlines(fromSheet.isDisplayGridlines());
        toSheet.setDisplayZeros(fromSheet.isDisplayZeros());
        toSheet.setFitToPage(fromSheet.getFitToPage());
        toSheet.setForceFormulaRecalculation(fromSheet.getForceFormulaRecalculation());
        toSheet.setHorizontallyCenter(fromSheet.getHorizontallyCenter());
        toSheet.setVerticallyCenter(fromSheet.getVerticallyCenter());
        toSheet.setRightToLeft(fromSheet.isRightToLeft());
        toSheet.setRowSumsBelow(fromSheet.getRowSumsBelow());
        toSheet.setRowSumsRight(fromSheet.getRowSumsRight());
        toSheet.setSelected(fromSheet.isSelected());

        int maxColumnNum = 0;
        for (int rowNum = fromSheet.getFirstRowNum(); rowNum <= fromSheet.getLastRowNum(); rowNum++) {
            Row row = fromSheet.getRow(rowNum);
            if (row != null) {
                maxColumnNum = Math.max(maxColumnNum, row.getLastCellNum());
            }
        }
        for (int i = 0; i <= maxColumnNum; i++) {

            int columnWidth = fromSheet.getColumnWidth(i);
            if (columnWidth > 0) {
                toSheet.setColumnWidth(i, columnWidth);
            }

            toSheet.setColumnHidden(i, fromSheet.isColumnHidden(i));

            CellStyle columnStyle = fromSheet.getColumnStyle(i);
            if (columnStyle != null) {
                toSheet.setDefaultColumnStyle(i, copyStyle(columnStyle, toSheet.getWorkbook()));
            }
        }
    }

    Row copyRow(Row srcRow, Row dstRow) {
        if (srcRow != null) {
            if (srcRow.isFormatted()) {
                dstRow.setRowStyle(copyStyle(srcRow.getRowStyle(), dstRow.getSheet().getWorkbook()));
            }
            if (srcRow.getHeight() > -1) {
                dstRow.setHeight(srcRow.getHeight());
            }
            copyCells(srcRow, dstRow);
        }
        return dstRow;
    }

    private void copyCells(Row fromRow, Row toRow) {
        for (int cellNum = fromRow.getFirstCellNum(); cellNum < fromRow.getLastCellNum(); cellNum++) {

            Cell fromCell = fromRow.getCell(cellNum);
            if (fromCell == null) {
                continue;
            }

            Cell toCell = toRow.createCell(cellNum, fromCell.getCellType());
            toCell.setCellStyle(copyStyle(fromCell.getCellStyle(), toRow.getSheet().getWorkbook()));

            if (fromCell.getCellComment() != null) {
                toCell.setCellComment(fromCell.getCellComment());
            }
            if (fromCell.getHyperlink() != null) {
                toCell.setHyperlink(fromCell.getHyperlink());
            }

            copyCellValue(fromCell, toCell);
        }
    }

    CellStyle copyStyle(CellStyle fromStyle, Workbook toWorkbook) {
        CellStyle style = toWorkbook.createCellStyle();
        style.cloneStyleFrom(fromStyle);
        return style;
    }

    private static void copyCellValue(Cell fromCell, Cell toCell) {
        switch (fromCell.getCellType()) {
            case BLANK:
                toCell.setCellValue(fromCell.getStringCellValue());
                break;
            case BOOLEAN:
                toCell.setCellValue(fromCell.getBooleanCellValue());
                break;
            case ERROR:
                toCell.setCellErrorValue(fromCell.getErrorCellValue());
                break;
            case FORMULA:
                toCell.setCellFormula(fromCell.getCellFormula());
                break;
            case NUMERIC:
                toCell.setCellValue(fromCell.getNumericCellValue());
                break;
            case STRING:
                toCell.setCellValue(fromCell.getRichStringCellValue());
                break;
            default: {
                throw new UnsupportedOperationException("Unknown cell type : " + fromCell.getCellType());
            }
        }
    }
}
