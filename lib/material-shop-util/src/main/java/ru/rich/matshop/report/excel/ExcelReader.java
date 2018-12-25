package ru.rich.matshop.report.excel;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Чтение данных из Excel файла
 */
public interface ExcelReader<T extends ExcelReader> extends SheetNavigator<T> {

    String getStringValue();

    BigDecimal getNumericValue();

    Date getDateValue();

    String getNextStringValue();

    BigDecimal getNextNumericValue();

    Date getNextDateValue();
}