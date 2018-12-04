package ru.rich.matshop.webapi.api.order.create;

import ru.rich.matshop.webapi.api.common.rest.AbstractRestResponse;

public class CreateOrderResponse extends AbstractRestResponse {

    private boolean personUpdated;

    public boolean isPersonUpdated() {
        return personUpdated;
    }

    public void setPersonUpdated(boolean personUpdated) {
        this.personUpdated = personUpdated;
    }

    @Override
    public String toString() {
        return "CreateOrderResponse{" +
                "personUpdated=" + personUpdated +
                ", serverId=" + getServerId() +
                ", message='" + getMessage() + '\'' +
                '}';
    }
}
