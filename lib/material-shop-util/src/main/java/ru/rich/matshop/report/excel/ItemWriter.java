package ru.rich.matshop.report.excel;

/**
 * Обработчик элемента коллекции
 */
public interface ItemWriter<I> {
    /**
     * Обработка элемента
     *
     * @param basicBuilder билдер выполняющий генерацию строки
     * @param itemNum      номер элемента в списке
     * @param item         элемент
     */
    void writeRow(BasicBuilder<? extends BasicBuilder> basicBuilder, int itemNum, I item);
}
