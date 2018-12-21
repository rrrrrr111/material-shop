package ru.rich.matshop.report.excel;

import org.springframework.util.PropertyPlaceholderHelper;
import ru.rich.matshop.report.TemplateBasedCreator;

/**
 * Поточный сервис формирования Excel печатных форм документов на основе шаблона.
 */
public interface ExcelStreamCreator<D> extends TemplateBasedCreator<D> {

    /**
     * формирование печатной формы
     */
    void create(ExcelStreamBuilder esb, D dataModel);

    /**
     * Возвращает PropertyPlaceholderHelper
     */
    PropertyPlaceholderHelper getPlaceholderHelper();
}
