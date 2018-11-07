package ru.rich.matshop.webapi.api.feed.model;

import ru.rich.matshop.webapi.api.RestRequest;

import java.util.List;

/**
 *
 */
public class FeedResponse extends RestRequest {

    private List<Product> products;

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    @Override
    public String toString() {
        return "FeedResponse{" +
                "products=" + products +
                '}';
    }
}
