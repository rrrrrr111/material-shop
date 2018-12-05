package ru.rich.matshop.webapi.api.common.rest;

import javax.validation.constraints.NotBlank;

/**
 * Общие данные REST запросов
 */
public abstract class AbstractRestRequest {

    @NotBlank
    private String shopIdentity;

    public String getShopIdentity() {
        return shopIdentity;
    }

    public void setShopIdentity(String shopIdentity) {
        this.shopIdentity = shopIdentity;
    }
}
