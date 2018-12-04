package ru.rich.matshop.webapi.api.order.create;

import ru.rich.matshop.webapi.api.common.rest.AbstractRestRequest;
import ru.rich.matshop.webapi.api.order.model.ShopOrder;
import ru.rich.matshop.webapi.api.user.model.Person;

public class CreateOrderRequest extends AbstractRestRequest {

    private Person person;
    private ShopOrder order;

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
        return "CreateOrderRequest{" +
                "person=" + person +
                ", order=" + order +
                ", shopId=" + getShopId() +
                '}';
    }
}
