package ru.rich.matshop.webapi.api.order.model;

public class ShopOrderGoodsInfo extends ShopOrderGoods {

    private String productName;

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    @Override
    public String toString() {
        return "ShopOrderGoodsInfo{" +
                "id=" + getId() +
                ", shopOrderId=" + getShopOrderId() +
                ", productId=" + getProductId() +
                ", quantity=" + getQuantity() +
                ", price=" + getPrice() +
                ", productName='" + productName + '\'' +
                '}';
    }
}
