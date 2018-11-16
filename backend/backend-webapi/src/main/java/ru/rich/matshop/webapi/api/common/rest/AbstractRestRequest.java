package ru.rich.matshop.webapi.api.common.rest;

/**
 * Общие данные REST запросов
 */
public abstract class AbstractRestRequest {

    private String shopId;
    private String clientToken;

    public String getShopId() {
        return shopId;
    }

    public void setShopId(String shopId) {
        this.shopId = shopId;
    }

    public String getClientToken() {
        return clientToken;
    }

    public void setClientToken(String clientToken) {
        this.clientToken = clientToken;
    }
}
