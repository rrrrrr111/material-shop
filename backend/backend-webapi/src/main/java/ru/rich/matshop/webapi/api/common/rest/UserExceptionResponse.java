package ru.rich.matshop.webapi.api.common.rest;

public class UserExceptionResponse extends AbstractRestResponse {

    public UserExceptionResponse(String message) {
        super(message);
    }

    @Override
    public String toString() {
        return "UserExceptionResponse{" +
                "serverId=" + getServerId() +
                ", serverId=" + getServerId() +
                ", message='" + getMessage() + '\'' +
                '}';
    }
}
