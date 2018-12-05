package ru.rich.matshop.webapi.api.order;

import org.springframework.stereotype.Service;
import ru.rich.matshop.webapi.api.order.model.ShopOrder;
import ru.rich.matshop.webapi.api.order.model.ShopOrderState;

@Service
public class ShopOrderService {

    private final ShopOrderDao shopOrderDao;
    private final ShopOrderGoodsDao shopOrderGoodsDao;

    ShopOrderService(ShopOrderDao shopOrderDao, ShopOrderGoodsDao shopOrderGoodsDao) {
        this.shopOrderDao = shopOrderDao;
        this.shopOrderGoodsDao = shopOrderGoodsDao;
    }

    public ShopOrder createOrder(ShopOrder order) {

        order.setState(ShopOrderState.NEW);
        Long orderId = shopOrderDao.insert(order);
        order.getCartGoodsList().forEach(og -> {
            og.setShopOrderId(orderId);
            shopOrderGoodsDao.insert(og);
        });
        return getById(orderId);
    }

    private ShopOrder getById(Long id) {
        ShopOrder order = shopOrderDao.getById(id);
        order.setCartGoodsList(shopOrderGoodsDao.getByOrderId(id));
        return order;
    }
}
