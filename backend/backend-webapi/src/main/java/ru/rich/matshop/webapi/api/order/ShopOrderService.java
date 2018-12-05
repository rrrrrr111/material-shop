package ru.rich.matshop.webapi.api.order;

import org.springframework.stereotype.Service;
import ru.rich.matshop.webapi.api.order.model.ShopOrder;
import ru.rich.matshop.webapi.api.order.model.ShopOrderState;

@Service
public class ShopOrderService {

    private final ShopOrderDao shopOrderDao;

    ShopOrderService(ShopOrderDao shopOrderDao) {
        this.shopOrderDao = shopOrderDao;
    }

    public ShopOrder createOrder(ShopOrder order) {

        order.setState(ShopOrderState.NEW);
        Long orderId = shopOrderDao.insert(order);
        return getById(orderId);
    }

    private ShopOrder getById(Long id) {
        return shopOrderDao.getById(id);
    }
}
