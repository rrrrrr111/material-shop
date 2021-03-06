package ru.rich.matshop.webapi.api.order.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

public class ShopOrderGoods {

    @Null
    private Long id;
    @Null
    private Long shopOrderId;
    @NotNull
    private Long productId;
    @NotNull
    private Integer quantity;
    @NotNull
    private Long price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getShopOrderId() {
        return shopOrderId;
    }

    public void setShopOrderId(Long shopOrderId) {
        this.shopOrderId = shopOrderId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "ShopOrderGoods{" +
                "id=" + id +
                ", shopOrderId=" + shopOrderId +
                ", productId=" + productId +
                ", quantity=" + quantity +
                ", price=" + price +
                '}';
    }
}
