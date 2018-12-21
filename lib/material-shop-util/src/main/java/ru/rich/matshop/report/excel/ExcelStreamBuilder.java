package ru.rich.matshop.report.excel;

/**
 * Поточный Builder Excel отчета на основе шаблона. Построение отчета происходит методом
 * копирования данных и стилей из шаблона.
 * <p>
 * Работает в паре с {@link ExcelBuilder}, обычный ExcelBuilder используется для
 * работы с шаблоном документа, т. к. поточное API не допускает чтение данных из шаблона.
 *
 * @see ExcelBuilder
 */
public interface ExcelStreamBuilder extends BasicBuilder<ExcelStreamBuilder> {

    /**
     * Возвращает {@link ExcelBuilder} связанный с данным билдером и шаблоном отчета.
     */
    ExcelBuilder getTemplateBuilder();

    /**
     * Копирование строк из шаблона, в том числе и объединенных ячеек.
     * Копирование происходит в текущую позицию билдера.
     *
     * @param fromRow номера строки "c", начиная с 0
     * @param toRow   номера строки "по", начиная с 0
     */
    ExcelStreamBuilder copyRowsFromTemplate(int fromRow, int toRow);
}
