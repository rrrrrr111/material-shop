package ru.rich.matshop.webapi.api.feed.model;

import java.math.BigInteger;

public class FeedProduct {

    private Long productId;
    private String image;
    private String link;
    private String name;
    private BigInteger price;

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigInteger getPrice() {
        return price;
    }

    public void setPrice(BigInteger price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "FeedProduct{" +
                "productId=" + productId +
                ", image='" + image + '\'' +
                ", link='" + link + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}
