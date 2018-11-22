package ru.rich.matshop.webapi.api.common.rest;

public class EmptyResponse extends AbstractRestResponse {

    @Override
    public String toString() {
        return "EmptyResponse{" +
                "serverId=" + getServerId() +
                ", message='" + getMessage() + '\'' +
                '}';
    }
}
