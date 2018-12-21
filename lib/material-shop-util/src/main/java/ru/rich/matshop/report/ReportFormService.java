package ru.rich.matshop.report;

/**
 * Сервис формирования отчетов.
 * Для формирования документа передается идентификатор {@link Creator<D>} печатной формы и объект
 * данных. В зависимости от идентификатора он выбирает соотв Creator бин.
 */
public interface ReportFormService {

    /**
     * Сформировать печатную форму с заданным именем
     *
     * @param <D>                тип данных печатной формыы
     * @param reportFormCreatorId Id {@link Creator<D>} печатной формы
     * @param data               данные печатной формы
     * @param formFilename       имя печатной формы
     * @return сформированная печатная форма
     */
    <D> ReportForm create(String reportFormCreatorId, D data, String formFilename);

    /**
     * Сформировать печатную форму
     *
     * @param <D>                тип данных печатной формыы
     * @param reportFormCreatorId Id {@link Creator<D>} печатной формы
     * @param data               данные печатной формы
     * @return сформированная печатная форма
     */

    <D> ReportForm create(String reportFormCreatorId, D data);
}
