package ru.rich.matshop.report;

/**
 * Creator создающий печатную форму на основе шаблона
 *
 * @param <D>
 */
public interface TemplateBasedCreator<D> extends Creator<D> {

    /**
     * Возвращает путь к шаблону
     *
     * @param data
     * @return путь к шаблону
     */
    String getTemplatePath(D data);
}
