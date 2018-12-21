package ru.rich.matshop.report;

/**
 * Creator строящий документ определенного типа,
 * базовый интерфейс для расширения другими интерфейсами.
 * @param <D>
 */
public interface Creator<D> {

    /**
     * Возвращает тип документа для которого предназначен данный Creator
	 * @return тип документа для которого предназначен данный Creator
     */
    String getId();

    /**
     * Возвращает формат документа получаемый на выходе
	 * @return формат документа получаемый на выходе
     */
    ReportFileFormat getOutputFormat();

    /**
     * формирует имя создаваемого файла печатной формы
	 * @param data
	 * @return имя создаваемого файла печатной формы
     */
    String getOutputFileName(D data);

}
