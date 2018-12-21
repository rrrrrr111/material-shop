package ru.rich.matshop.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.PropertyPlaceholderHelper;
import ru.rich.matshop.util.FileUtil;


/**
 * Сервис формирования печатных форм документов
 * по определенному шаблону в определенном формате,
 * для наследования Spring бинами.
 * <p>
 * Абстрактый класс содержит общие данные для бинов наследников.
 * <p>
 * Реализации бинов могут размещаться в соотв. модулях по месту зависимостей.
 *
 * @param <D>
 */
public abstract class AbstractTemplateBasedCreator<D> implements TemplateBasedCreator<D> {

    @Autowired
    private PropertyPlaceholderHelper placeholderHelper;

    /**
     * Путь к шаблону
     */
    private String templatePath;

    protected AbstractTemplateBasedCreator(String templatePath) {
        this.templatePath = templatePath;
    }

    protected AbstractTemplateBasedCreator() {
    }


    @Override
    public String getTemplatePath(D data) {
        return templatePath;
    }

    /**
     * Установка пути к шаблону
     *
     * @param templatePath пусть к шаблону отчета
     */
    public void setTemplatePath(String templatePath) {
        this.templatePath = templatePath;
    }

    @Override
    public String getOutputFileName(D data) {
        return FileUtil.generateFileName(getId(), getOutputFormat().getExtension());
    }

    public PropertyPlaceholderHelper getPlaceholderHelper() {
        return placeholderHelper;
    }

    public void setPlaceholderHelper(PropertyPlaceholderHelper placeholderHelper) {
        this.placeholderHelper = placeholderHelper;
    }
}
