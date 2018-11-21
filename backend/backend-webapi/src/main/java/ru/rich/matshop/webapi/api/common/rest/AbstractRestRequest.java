package ru.rich.matshop.webapi.api.common.rest;

import javax.validation.constraints.NotBlank;

/**
 * Общие данные REST запросов
 */
public abstract class AbstractRestRequest {

    @NotBlank
    private String shopId;

    public String getShopId() {
        return shopId;
    }

    public void setShopId(String shopId) {
        this.shopId = shopId;
    }
}
