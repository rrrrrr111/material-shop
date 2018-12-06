package ru.rich.matshop.webapi.api.product.list;

import ru.rich.matshop.webapi.api.common.rest.AbstractRestRequest;
import ru.rich.matshop.webapi.api.common.paging.PageRequest;
import ru.rich.matshop.webapi.api.product.model.ProductFilter;

/**
 *
 */
public class ProductListRequest extends AbstractRestRequest {

    private PageRequest pageRequest;
    private ProductFilter productFilter;

    public PageRequest getPageRequest() {
        return pageRequest;
    }

    public void setPageRequest(PageRequest pageRequest) {
        this.pageRequest = pageRequest;
    }

    public ProductFilter getProductFilter() {
        return productFilter;
    }

    public void setProductFilter(ProductFilter productFilter) {
        this.productFilter = productFilter;
    }

    @Override
    public String toString() {
        return "ProductListRequest{" +
                "pageRequest=" + pageRequest +
                ", productFilter=" + productFilter +
                ", shopIdentity=" + getShopIdentity() +
                '}';
    }
}
