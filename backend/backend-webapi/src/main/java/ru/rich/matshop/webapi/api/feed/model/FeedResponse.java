package ru.rich.matshop.webapi.api.feed.model;

import ru.rich.matshop.webapi.api.RestRequest;

import java.util.List;

/**
 *
 */
public class FeedResponse extends RestRequest {

    private List<FeedProduct> products;

    public List<FeedProduct> getProducts() {
        return products;
    }

    public void setProducts(List<FeedProduct> feedProducts) {
        this.products = feedProducts;
    }

    @Override
    public String toString() {
        return "FeedResponse{" +
                "products=" + products +
                '}';
    }
}
