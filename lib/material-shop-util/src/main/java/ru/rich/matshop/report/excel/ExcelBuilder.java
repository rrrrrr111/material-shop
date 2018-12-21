package ru.rich.matshop.report.excel;

import java.io.Serializable;

/**
 * Наполняет Excel шаблон данными.
 * <p/>
 * 1. Реализация по шаблону Builder , - типа StringBuilder , QueryBuilder и т п ,
 * т е имеет состояние и позволяет писать цепочку вызовов, с вызовом финализирующего
 * метода в конце.  <br/>
 * 2. Ориентирован на формирование Excel документа на основе подготовленного шаблона,
 * т о основная часть документа, разметка стили и прочее готовится заранее. Документ
 * в основном создается путем наполнения шаблона и копирования строк шаблона, т о
 * CellStyle копируется, не рекомендуется создавать новые CellStyle т к при большом
 * объеме падает производительность.  <br/>
 * 3. Постоянно смотрит на определенные координаты (rowNum, cellNum) в шаблоне
 * Excel, и перемещается по координатам при вызове соотв. методов.  <br/>
 * 4. Имеет методы для ввода значений в ячейки, а также для манипулирования
 * элементами шаблона (добавление \ удаление строк и т.п.) а также методы типа
 * вставить коллекцию элементов с одновременной вставкой новых строк в шаблон для каждого
 * элемента коллекции.  <br/>
 * 5. Также имеет методы для работы с плейсхолдерами т е заменяет значения в шаблоне
 * типа ${labels.account} на переданные значения и также при этом умеет рефлексионно
 * брать значения из POJO типа ${dataObject.doc.account.num}
 * <p/>
 */
public interface ExcelBuilder extends BasicBuilder<ExcelBuilder> {

    /**
     * Применить плейсхолдеры (замена ключей на значения)
     * на текущем листе.
     * <p/>
     * Например ${labels.account.number} -> Номер счета
     * <p/>
     * При выполнении метода билдер передает в KeyMapper координаты
     * ячейки в которой найден плейсхолдер.
     *
     * @param keyPrefix   если не null то обрабатываются только плейсхолдеры
     *                    с соотв префиксом в имени, в метод KeyMapper'а ключ
     *                    передается уже без префикса. Если этот параметр null
     *                    то обрабатываются все плейсхолдеры.
     * @param nullToEmpty устанавливает ячейку в пустое значение если
     *                    keyMapper вернул null
     * @param keyMapper   класс выполняющий подмену ключа на значение
     */
    ExcelBuilder applyPlaceholders(String keyPrefix, boolean nullToEmpty, KeyMapper keyMapper);

    /**
     * Применить плейсхолдеры (замена ключей на значения)
     * на текущем листе.
     * <p/>
     * Например ${labels.account.number} -> Номер счета
     * При выполнении метода билдер передает в KeyMapper координаты
     * ячейки в которой найден плейсхолдер.
     *
     * @param keyMapper класс выполняющий подмену ключа на значение
     */
    ExcelBuilder applyPlaceholders(KeyMapper keyMapper);

    /**
     * Применить плейсхолдеры (замена ключей на значения)
     * Плейсхолдеры в шаблоне типа ${dataModel.property1.property2}
     * заменяются значениями из модели данных.
     * <p/>
     * см. http://commons.apache.org/proper/commons-beanutils/javadocs/v1.8.3/apidocs/org/apache/commons/beanutils/PropertyUtilsBean.html
     * <p/>
     * Для типов Date, Calendar, Number ячейки приводятся к соотв типу.
     * <p/>
     * Рефлексия не работает если POJO - nested private class
     *
     * @param keyPrefix если не null то обрабатываются только плейсхолдеры
     *                  с соотв префиксом в имени.
     *                  Например указан префикс "dataModel.", в этом случае
     *                  в шаблоне пишем ${dataModel.name} <br/>
     *                  Если этот параметр null
     *                  то обрабатываются все плейсхолдеры и соответственно в
     *                  шаблоне нужно писать без префикса, например ${name}
     * @param dataModel модель данных
     */
    ExcelBuilder applyDataModelPropertyPlaceholders(String keyPrefix, Serializable dataModel);

    /**
     * Очистка значения указанной ячейки
     *
     * @param rowNum  номер строки, начиная с 0
     * @param cellNum номер ячейки начиная с 0
     */
    ExcelBuilder clearCell(int rowNum, int cellNum);

    /**
     * Очистка значения текущй ячейки
     */
    ExcelBuilder clearCell();

    /**
     * Очистка строки (удаляются значения и стили)
     *
     * @param rowNum номер строки, начиная с 0
     */
    ExcelBuilder clearRow(int rowNum);

    /**
     * Очистка текущй строки (удаляются значения и стили)
     */
    ExcelBuilder clearRow();

    /**
     * Удаление указанной строки. Остаток страницы снизу смещается
     * вверх на одну строку. Позиция перемещается на первую строку за
     * удаляемой, номер строки не меняется. Если удаляется последняя строка,
     * позиция перемещается на предпоследнюю строку.
     * Если в удаляемой строке есть начало объединенных ячеек (верхний угол)
     * объединение удаляется.
     *
     * @param rowNum номер строки, начиная с 0
     */
    ExcelBuilder deleteRow(int rowNum);

    /**
     * Удаление текущей строки. Остаток страницы снизу смещается
     * вверх на одну строку. Позиция перемещается на первую строку за
     * удаляемой, номер строки не меняется. Если удаляется последняя строка,
     * позиция перемещается на предпоследнюю строку.
     * Если в удаляемой строке есть начало объединенных ячеек (верхний угол)
     * объединение удаляется.
     */
    ExcelBuilder deleteRow();
}