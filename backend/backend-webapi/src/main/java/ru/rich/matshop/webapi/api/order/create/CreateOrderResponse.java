package ru.rich.matshop.webapi.api.order.create;

import ru.rich.matshop.webapi.api.common.rest.AbstractRestResponse;
import ru.rich.matshop.webapi.api.order.model.ShopOrder;
import ru.rich.matshop.webapi.api.user.model.Person;

public class CreateOrderResponse extends AbstractRestResponse {

    /**
     * Аутэнтифицированный пользователь обновлен в БД
     */
    private Boolean authPersonUpdated;
    private Person person;
    private ShopOrder order;

    public Boolean getAuthPersonUpdated() {
        return authPersonUpdated;
    }

    public void setAuthPersonUpdated(Boolean authPersonUpdated) {
        this.authPersonUpdated = authPersonUpdated;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public ShopOrder getOrder() {
        return order;
    }

    public void setOrder(ShopOrder order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return "CreateOrderResponse{" +
                "authPersonUpdated=" + authPersonUpdated +
                ", person=" + person +
                ", order=" + order +
                ", serverId=" + getServerId() +
                ", message='" + getMessage() + '\'' +
                '}';
    }
}
