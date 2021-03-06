package ru.rich.matshop.report.excel;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;

/**
 * Общие методы для различных билдеров.
 */
public interface BasicBuilder<T extends BasicBuilder> extends SheetNavigator<T> {

    /**
     * Установка значения текущей ячейки,
     * тип и формат даты должен быть установлен в шаблоне
     *
     * @param value значение
     */
    T setCell(Date value);

    /**
     * Установка значения текущей ячейки
     *
     * @param value значение
     */
    T setCell(BigDecimal value);

    /**
     * Установка значения текущей ячейки
     *
     * @param value значение
     */
    T setCell(String value);

    /**
     * Установка значения указанной ячейки
     *
     * @param rowNum  номер строки, начиная с 0
     * @param cellNum номер ячейки начиная с 0
     * @param value   значение
     */
    T setCell(int rowNum, int cellNum, String value);

    /**
     * Установка значения указанной ячейки
     *
     * @param rowNum  номер строки, начиная с 0
     * @param cellNum номер ячейки начиная с 0
     * @param value   значение
     */
    T setCell(int rowNum, int cellNum, Date value, String format);

    /**
     * Установка значения указанной ячейки
     *
     * @param rowNum  номер строки, начиная с 0
     * @param cellNum номер ячейки начиная с 0
     * @param value   значение
     */
    T setCell(int rowNum, int cellNum, BigDecimal value, String format);

    /**
     * Установка значения указанной ячейки,
     * тип и формат даты должен быть установлен в шаблоне
     *
     * @param rowNum  номер строки, начиная с 0
     * @param cellNum номер ячейки начиная с 0
     * @param value   значение
     */
    T setCell(int rowNum, int cellNum, Date value);

    /**
     * Установка значения указанной ячейки
     *
     * @param rowNum  номер строки, начиная с 0
     * @param cellNum номер ячейки начиная с 0
     * @param value   значение
     */
    T setCell(int rowNum, int cellNum, BigDecimal value);

    /**
     * Установка значения следующей ячейки в строке
     *
     * @param value значение
     */
    T setNextCell(String value);

    /**
     * Установка значения следующей ячейки в строке,
     * тип и формат даты должен быть установлен в шаблоне
     *
     * @param value значение
     */
    T setNextCell(Date value);

    /**
     * Установка значения следующей ячейки в строке,
     * тип и формат даты передается параметром. Если формат == null,
     * то используется значение заданное с помощью {@code setDateFormat()}
     *
     * @param value  значение
     * @param format формат даты/времени
     */
    T setNextCell(Date value, String format);

    /**
     * Установка значения следующей ячейки в строке
     *
     * @param value значение
     */
    T setNextCell(BigDecimal value);

    /**
     * Вставка коллекции элементов в таблицу, текущая строка копируется со всеми стилями
     * для каждого элемента коллекции кроме последнего, по завершению обработки текущее
     * положение перемещается на следующую строку, в исходный столбец.
     *
     * @param rowNum  номер строки, начиная с 0
     * @param cellNum номер ячейки начиная с 0
     * @param items   коллекция элементов
     * @param writer  обработчик строки
     */
    <I> T insertItems(int rowNum, int cellNum, Collection<I> items, ItemWriter<I> writer);

    /**
     * Вставка коллекции элементов в таблицу, текущая строка копируется со всеми стилями
     * для каждого элемента коллекции кроме последнего, по завершению обработки текущее
     * положение перемещается на следующую строку, в исходный столбец.
     * Данный метод начинает вставку с текущей позиции.
     *
     * @param items  коллекция элементов
     * @param writer обработчик строки
     */
    <I> T insertItems(Collection<I> items, ItemWriter<I> writer);

    /**
     * Установка формата даты, можно использовать встроенные
     * форматы (см. BuiltinFormats) либо кастомные. Встроенные
     * форматы отображаются в соотв с локальными региональными настройками.
     * Формат используется при подстановке плейсхолдеров.
     */
    T setDateFormat(String dateFormat);

    /**
     * Установка числового формата, можно использовать встроенные
     * форматы (см. BuiltinFormats) либо кастомные. Встроенные
     * форматы отображаются в соотв с локальными региональными настройками.
     * Формат используется при подстановке плейсхолдеров.
     */
    T setNumberFormat(String numberFormat);

    /**
     * Установка высоты строки
     *
     * Set the row's height or set to ff (-1) for undefined/default-height. Set the height in "twips" or 1/20th of a point.
     */
    T setRowHeight(short height);

    /**
     * Возвращает текущий номер строки
     */
    int getRowNum();

    /**
     * Возвращает текущий номер ячейки
     */
    int getCellNum();

    /**
     * Возвращает последний номер строки
     */
    int getLastRowNum();
}