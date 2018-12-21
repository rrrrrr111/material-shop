package ru.rich.matshop.report.excel;

import org.springframework.util.PropertyPlaceholderHelper;
import ru.rich.matshop.report.TemplateBasedCreator;

/**
 * Сервис формирования Excel печатных форм документов на основе шаблона.
 *
 * @param <D>
 */
public interface ExcelCreator<D> extends TemplateBasedCreator<D> {

    /**
     * формирование печатной формы
     *
     * @param eb ссылка на построитель отчетов Excel
     * @param dataModel
     */
    void create(ExcelBuilder eb, D dataModel);

    /**
     * Возвращает PropertyPlaceholderHelper
     *
     * @return
     */
    PropertyPlaceholderHelper getPlaceholderHelper();
}
