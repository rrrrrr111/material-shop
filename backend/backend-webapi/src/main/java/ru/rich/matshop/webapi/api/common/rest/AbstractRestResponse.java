package ru.rich.matshop.webapi.api.common.rest;

/**
 * Общие данные REST ответа
 */
public abstract class AbstractRestResponse {

    /**
     * Идентификатор сервера
     */
    private Integer serverId;
    /**
     * Сообщение об ошибке, null если успех
     */
    private String message;

    public AbstractRestResponse(String message) {
        this.message = message;
    }

    public AbstractRestResponse() {
    }

    public Integer getServerId() {
        return serverId;
    }

    public void setServerId(Integer serverId) {
        this.serverId = serverId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "AbstractRestResponse{" +
                "serverId=" + serverId +
                ", message='" + message + '\'' +
                '}';
    }
}