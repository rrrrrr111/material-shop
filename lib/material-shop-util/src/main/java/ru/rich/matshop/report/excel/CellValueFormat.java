package ru.rich.matshop.report.excel;

/**
 * Перечисление доступных форматов для Excel
 */
public enum CellValueFormat {

    /**
     * Формат даты
     */
    DATE("dd.MM.yyyy"),
    /**
     * Формат даты и времени с точностью до минут
     */
    DATE_MINUTES("dd.MM.yyyy HH:mm"),
    /**
     * Формат даты и времени с точностью до секунд
     */
    DATE_SECONDS("dd.MM.yyyy HH:mm:ss"),
    /**
     * Формат даты в виде дня и месяца
     */
    DATE_DAY_MONTH("dd.MM"),
    /**
     * Формат денег для Excel
     */
    MONEY("###,##0.00##");


    private final String value;

    CellValueFormat(String value) {
        this.value = value;
    }

    /**
     * Формат по-умолчанию
     *
     * @return формат по-умолчанию
     */
    public String getValue() {
        return value;
    }
}
