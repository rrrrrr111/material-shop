package ru.rich.matshop.report.excel;

/**
 * Перемещение по Excel документу
 */
public interface SheetNavigator<T extends SheetNavigator> {

    /**
     * Перемещение к указанной ячейке
     *
     * @param rowNum  номер строки, начиная с 0
     * @param cellNum номер ячейки начиная с 0
     */
    T toCell(int rowNum, int cellNum);

    /**
     * Перемещение к указанной ячейке в текущей строке
     *
     * @param cellNum номер ячейки начиная с 0
     */
    T toCell(int cellNum);

    /**
     * Сдвиг относительно текущей ячейки
     *
     * @param rows  кол-во строк на которое нужно передвинуться
     * @param cells кол-во столбцов на которое нужно передвинуться
     */
    T toRelative(int rows, int cells);

    /**
     * Сдвиг в текущей строке вправо или влево относительно текущей ячейки
     *
     * @param cells кол-во столбцов на которое нужно передвинуться
     */
    T toRelative(int cells);

    /**
     * Сдвиг в текущем столбце вверх или вниз относительно текущей строки
     *
     * @param rows кол-во строк на которое нужно передвинуться
     */
    T toRelativeRow(int rows);

    /**
     * Сдвиг к следующей строке в столбце
     */
    T toNextRow();
}
