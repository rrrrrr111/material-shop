package ru.rich.matshop.report.excel;

import com.google.common.base.Preconditions;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Наполняет Excel шаблон данными, реализация на основе Apache POI SXSSF
 * <p/>
 * Примеры работы http://poi.apache.org/spreadsheet/how-to.html#sxssf
 */
class ExcelPoiStreamBuilder extends AbstractExcelBuilder<ExcelStreamBuilder> implements ExcelStreamBuilder {
    private static final Logger log = LoggerFactory.getLogger(ExcelPoiStreamBuilder.class);

    private final ExcelPoiBuilder eb;
    private final PoiCopySupport copySupport = new PoiCopySupport();

    private Map<Integer, CellStyle> rowStyleCache = new HashMap<>();

    public ExcelPoiStreamBuilder(ExcelPoiBuilder excelPoiBuilder) {
        eb = excelPoiBuilder;
        Workbook wb = new SXSSFWorkbook(1000);
        wbWrapper = new PoiWorkbookWrapper(wb);
        Sheet sheet = wb.createSheet(eb.sheetWrapper.getSheetName());
        sheetWrapper = new PoiSheetWrapper(sheet);
        copySupport.copySheetInfo(eb.sheetWrapper.getSheet(), sheet);
    }

    @Override
    public ExcelStreamBuilder setCell(int rowNum, int cellNum, String value) {
        return setCell(rowNum, cellNum, value, prepareStyle(rowNum, cellNum));
    }

    @Override
    public ExcelStreamBuilder setCell(int rowNum, int cellNum, Date value, String format) {
        return setCell(rowNum, cellNum, value, format, prepareStyle(rowNum, cellNum));
    }

    @Override
    public ExcelStreamBuilder setCell(int rowNum, int cellNum, BigDecimal value, String format) {
        return setCell(rowNum, cellNum, value, format, prepareStyle(rowNum, cellNum));
    }

    /**
     * Стиль ячейки берется из кэша, если кэш не пуст, иначе копируется из шаблона
     */
    private CellStyle prepareStyle(int rowNum, int cellNum) {
        if (rowStyleCache.isEmpty()) {
            return copySupport.copyStyle(
                    eb.sheetWrapper.getCellStyle(rowNum, cellNum), getWorkbook());
        }
        return rowStyleCache.get(cellNum);
    }

    private ExcelPoiStreamBuilder setCell(int rowNum, int cellNum, String value, CellStyle style) {
        this.rowNum = rowNum;
        this.cellNum = cellNum;
        sheetWrapper.setCell(rowNum, cellNum, value, style);
        return this;
    }

    private ExcelPoiStreamBuilder setCell(int rowNum, int cellNum, Date value, String format, CellStyle style) {
        this.rowNum = rowNum;
        this.cellNum = cellNum;
        sheetWrapper.setCell(rowNum, cellNum, value, format, style);
        return this;
    }

    private ExcelPoiStreamBuilder setCell(int rowNum, int cellNum, BigDecimal value, String format, CellStyle style) {
        this.rowNum = rowNum;
        this.cellNum = cellNum;
        sheetWrapper.setCell(rowNum, cellNum, value, format, style);
        return this;
    }

    @Override
    public ExcelStreamBuilder copyRowsFromTemplate(int fromRow, int toRow) {
        int initialRow = this.rowNum;
        for (int rowNum = fromRow; rowNum <= toRow; rowNum++) {
            Row row = copySupport.copyRow(eb.sheetWrapper.getSheet().getRow(rowNum), sheetWrapper.getRow(this.rowNum++));
            if (log.isTraceEnabled()) {
                log.trace("Copy row {} from template, {} cells copied", rowNum, row == null ? 0 : row.getPhysicalNumberOfCells());
            }
        }

        for (CellRangeAddress region : eb.sheetWrapper.getMergedRegions()) {
            if (fromRow <= region.getFirstRow() && region.getLastRow() <= toRow) {
                sheetWrapper.copyMergedRegion(initialRow - fromRow, region);
                continue;
            }
            Preconditions.checkState(
                    region.getFirstRow() < fromRow && region.getLastRow() < fromRow
                            || region.getFirstRow() > toRow && region.getLastRow() > toRow, "Illegal region %s", region);
        }
        return this;
    }

    @Override
    public ExcelBuilder getTemplateBuilder() {
        return eb;
    }

    @Override
    public <I> ExcelStreamBuilder insertItems(int rowNum, int cellNum, Collection<I> items, ItemWriter<I> writer) {
        toCell(rowNum, cellNum);
        if (items == null || items.isEmpty()) {
            return toRelativeRow(1);
        }

        int i = 0;
        for (I item : items) {
            writer.writeRow(this, i++, item);

            if (i == 1) {  // кешируем стили первой строки после ее записи
                prepareCache(sheetWrapper.getRow(this.rowNum));
            }

            toCell(this.rowNum + 1, cellNum);
        }
        rowStyleCache.clear();
        return this;
    }

    private void prepareCache(Row row) {
        for (int i = row.getFirstCellNum(); i <= row.getLastCellNum(); i++) {
            Cell cell = row.getCell(i);
            if (cell != null) {
                CellStyle style = copySupport.copyStyle(cell.getCellStyle(), getWorkbook());
                rowStyleCache.put(i, style);
            }
        }
    }
}