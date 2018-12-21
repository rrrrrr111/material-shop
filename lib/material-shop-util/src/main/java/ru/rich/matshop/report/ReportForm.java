package ru.rich.matshop.report;

import java.io.Serializable;

/**
 * Данные сформированной печатной формы
 */
public class ReportForm implements Serializable {

    private static final long serialVersionUID = -1L;

    /**
     * Имя файла печатной формы
     */
    private String fileName;

    /**
     * Печатная форма
     */
    private byte[] data;

    /**
     * MIME тип
     */
    private String mimeType;

    /**
     * Конструктор по-умолчанию
     */
    public ReportForm() {
    }

    /**
     * Конструктор
     *
     * @param fileName имя файла выходного печатного документа
     * @param data     поток данных печатного документа
     * @param mimeType тип выходного печатного документа
     */
    public ReportForm(String fileName, byte[] data, String mimeType) {
        this.fileName = fileName;
        this.data = data;
        this.mimeType = mimeType;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    @Override
    public String toString() {
        return "ReportForm{" +
                "fileName='" + fileName + '\'' +
                ", mimeType='" + mimeType + '\'' +
                '}';
    }
}
