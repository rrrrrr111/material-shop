package ru.rich.matshop.webapi.api.order.list;

import ru.rich.matshop.webapi.api.common.paging.PageRequest;
import ru.rich.matshop.webapi.api.common.rest.AbstractRestRequest;
import ru.rich.matshop.webapi.api.user.auth.validation.CurrentUserId;

public class OrderListRequest extends AbstractRestRequest {

    @CurrentUserId
    private Long personId;
    private PageRequest pageRequest;

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public PageRequest getPageRequest() {
        return pageRequest;
    }

    public void setPageRequest(PageRequest pageRequest) {
        this.pageRequest = pageRequest;
    }

    @Override
    public String toString() {
        return "OrderListRequest{" +
                "personId=" + personId +
                ", pageRequest=" + pageRequest +
                ", shopId=" + getShopId() +
                '}';
    }
}
