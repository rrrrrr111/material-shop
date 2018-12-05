package ru.rich.matshop.webapi.api.order;

import org.springframework.stereotype.Service;
import ru.rich.matshop.webapi.api.order.model.ShopOrder;

@Service
public class ShopOrderService {

    private final ShopOrderDao shopOrderDao;

    ShopOrderService(ShopOrderDao shopOrderDao) {
        this.shopOrderDao = shopOrderDao;
    }

    public ShopOrder createOrder(ShopOrder order) {
        return null;
    }
}
