package ru.rich.matshop.webapi.api.order;

import org.springframework.stereotype.Service;

@Service
public class ShopOrderService {

    private final ShopOrderDao shopOrderDao;

    ShopOrderService(ShopOrderDao shopOrderDao) {
        this.shopOrderDao = shopOrderDao;
    }
}
