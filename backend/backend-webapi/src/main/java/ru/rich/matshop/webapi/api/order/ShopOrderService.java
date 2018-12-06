package ru.rich.matshop.webapi.api.order;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Service;
import ru.rich.matshop.webapi.api.common.paging.PageRequest;
import ru.rich.matshop.webapi.api.order.model.ShopOrder;
import ru.rich.matshop.webapi.api.order.model.ShopOrderState;

import java.util.List;

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

    public Pair<List<ShopOrder>, Boolean> getList(Long personId, PageRequest pageReq) {
        List<ShopOrder> list = shopOrderDao.getByPersonId(personId, pageReq);

        boolean hasMore = list.size() > pageReq.getCount();
        if (hasMore) {
            list.remove(list.size() - 1);
        }
        return Pair.of(list, hasMore);
    }

    private ShopOrder getById(Long id) {
        ShopOrder order = shopOrderDao.getById(id);
        order.setCartGoodsList(shopOrderGoodsDao.getByOrderId(id));
        return order;
    }
}
