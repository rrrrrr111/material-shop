package ru.rich.matshop.webapi.api.order.list;

import ru.rich.matshop.webapi.api.common.paging.PageResponse;
import ru.rich.matshop.webapi.api.common.rest.AbstractRestResponse;
import ru.rich.matshop.webapi.api.order.model.ShopOrder;

import java.util.List;

public class OrderListResponse extends AbstractRestResponse {

    private PageResponse pageResponse;
    private List<ShopOrder> orders;

    public PageResponse getPageResponse() {
        return pageResponse;
    }

    public void setPageResponse(PageResponse pageResponse) {
        this.pageResponse = pageResponse;
    }

    public List<ShopOrder> getOrders() {
        return orders;
    }

    public void setOrders(List<ShopOrder> orders) {
        this.orders = orders;
    }

    @Override
    public String toString() {
        return "OrderListResponse{" +
                "pageResponse=" + pageResponse +
                ", orders=" + orders +
                ", serverId=" + getServerId() +
                ", message='" + getMessage() + '\'' +
                '}';
    }
}
