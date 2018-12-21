package ru.rich.matshop.report.excel;

import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.mutable.MutableObject;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.PropertyPlaceholderHelper;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Замена плейсхолдеров на значения.
 */
class PlaceholdersSupport {
    private static final Logger log = LoggerFactory.getLogger(PlaceholdersSupport.class);

    private Sheet sheet;
    private PoiSheetWrapper sheetWrapper;
    private PropertyPlaceholderHelper placeholderHelper;

    PlaceholdersSupport(Sheet sheet, PoiSheetWrapper sheetWrapper, PropertyPlaceholderHelper placeholderHelper) {
        this.sheet = sheet;
        this.sheetWrapper = sheetWrapper;
        this.placeholderHelper = placeholderHelper;
    }

    void applyDataModelPropertyPlaceholders(String keyPrefix, final Object dataModel) {
        final BeanUtilsBean bub = new BeanUtilsBean();
        applyPlaceholders(keyPrefix, true, (rowNum, cellNum, key) -> {
            try {
                return bub.getPropertyUtils().getProperty(dataModel, key);
            } catch (Exception e) {
                throw new RuntimeException(
                        String.format("Exception while resolving key %s with dataModel : %s", key, dataModel), e);
            }
        });
    }

    void applyPlaceholders(String keyPrefix, boolean nullToEmpty, KeyMapper keyMapper) {
        final int lastRowNum = sheet.getLastRowNum();
        for (int i = sheet.getFirstRowNum(); i <= lastRowNum; i++) {
            Row row = sheet.getRow(i);
            if (row != null) {
                final int lastCellNum = row.getLastCellNum();
                for (int j = row.getFirstCellNum(); j <= lastCellNum; j++) {
                    final Cell cell = row.getCell(j, Row.MissingCellPolicy.RETURN_BLANK_AS_NULL);
                    if (cell != null && cell.getCellType() == CellType.STRING) {
                        resolveCell(cell, keyPrefix, keyMapper, nullToEmpty, i, j);
                    }
                }
            }
        }
    }

    private void resolveCell(Cell cell,
                             final String keyPrefix,
                             final KeyMapper keyMapper,
                             final boolean nullToEmpty,
                             final int rowNum, final int cellNum) {
        final String currentCellValue = cell.getStringCellValue();
        final MutableObject<ResolveState> state = new MutableObject<>(ResolveState.NOT_RESOLVED);
        final MutableObject<Object> value = new MutableObject<>(null);

        if (StringUtils.isNoneBlank(currentCellValue)) {

            // если PlaceholderResolver вернул null то хелпер возвращает изначально переданную строку
            // без изменений, иначе заменяет вхождение плейсхолдеров на значение полученное от PlaceholderResolver
            // если в строке несколько плейсхолдеров PlaceholderResolver заменяет их последовательно
            final String newStringCellValue = placeholderHelper.replacePlaceholders(currentCellValue,
                    key -> {
                        final String resolvedValue;
                        if (keyPrefix != null) { // если префикс указан обрабатываются только ключи начинающиеся с префикса
                            if (key.startsWith(keyPrefix)) {
                                key = key.substring(keyPrefix.length(), key.length());
                                resolvedValue = resolveKey(key, keyMapper, value, state, nullToEmpty, rowNum, cellNum);
                            } else {
                                return null;
                            }
                        } else {
                            resolvedValue = resolveKey(key, keyMapper, value, state, nullToEmpty, rowNum, cellNum);
                        }
                        if (log.isTraceEnabled()) {
                            log.trace("Resolving placeholder '{}' to '{}'", key, resolvedValue);
                        }
                        return resolvedValue;
                    });
            switch (state.getValue()) {
                case RESOLVED_TO_STRING:
                case RESOLVED_TO_NULL:
                    if (nullToEmpty && StringUtils.isBlank(newStringCellValue)) {
                        cell.setCellType(CellType.BLANK);
                    } else if (!currentCellValue.equals(newStringCellValue)) {
                        cell.setCellValue(newStringCellValue);
                    }
                    break;
                case RESOLVED_TO_DATE:
                    sheetWrapper.setCell(rowNum, cellNum, (Date) value.getValue(), null, null);
                    break;
                case RESOLVED_TO_NUMBER:
                    sheetWrapper.setCell(rowNum, cellNum, BigDecimal.valueOf(((Number) value.getValue()).doubleValue()), null, null);
                    break;
            }
        }
    }

    private String resolveKey(String key,
                              KeyMapper keyMapper,
                              MutableObject<Object> mappedValue,
                              MutableObject<ResolveState> state,
                              boolean nullToEmpty, int rowNum, int cellNum) {
        Object value = keyMapper.resolve(rowNum, cellNum, key);
        if (value == null) {
            value = nullToEmpty ? "" : null;
            state.setValue(nullToEmpty ? ResolveState.RESOLVED_TO_STRING : ResolveState.RESOLVED_TO_NULL);
        } else if (value instanceof Number) {
            state.setValue(ResolveState.RESOLVED_TO_NUMBER);
        } else if (value instanceof Date) {
            state.setValue(ResolveState.RESOLVED_TO_DATE);
        } else {
            state.setValue(ResolveState.RESOLVED_TO_STRING);
        }
        mappedValue.setValue(value);
        if (state.getValue() == ResolveState.RESOLVED_TO_STRING) {
            return value.toString();
        } else {
            return null;
        }
    }

    private enum ResolveState {
        NOT_RESOLVED,
        RESOLVED_TO_NULL,
        RESOLVED_TO_STRING,
        RESOLVED_TO_NUMBER,
        RESOLVED_TO_DATE,
    }
}
