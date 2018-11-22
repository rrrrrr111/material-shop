package ru.rich.matshop.webapi.api.common.rest;

public class EmptyRequest extends AbstractRestRequest {

    @Override
    public String toString() {
        return "EmptyRequest{" +
                "shopId=" + getShopId() +
                '}';
    }
}
