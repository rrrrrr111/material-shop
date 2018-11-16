package ru.rich.matshop.webapi.api.feed.model;

import ru.rich.matshop.webapi.api.common.rest.AbstractRestResponse;
import ru.rich.matshop.webapi.api.common.paging.PageResponse;

import java.util.List;

/**
 *
 */
public class FeedResponse extends AbstractRestResponse {

    private PageResponse pageResponse;
    private List<FeedProduct> products;

    public PageResponse getPageResponse() {
        return pageResponse;
    }

    public void setPageResponse(PageResponse pageResponse) {
        this.pageResponse = pageResponse;
    }

    public List<FeedProduct> getProducts() {
        return products;
    }

    public void setProducts(List<FeedProduct> feedProducts) {
        this.products = feedProducts;
    }

    @Override
    public String toString() {
        return "FeedResponse{" +
                "pageResponse=" + pageResponse +
                ", products=" + products +
                '}';
    }
}
