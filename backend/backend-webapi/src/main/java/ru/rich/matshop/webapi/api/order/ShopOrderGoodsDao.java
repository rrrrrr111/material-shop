package ru.rich.matshop.webapi.api.order;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;
import ru.rich.matshop.webapi.api.order.model.ShopOrderGoods;

import java.util.List;

import static ru.rich.matshop.db.model.Tables.SHOP_ORDER_GOODS;

@Repository
public class ShopOrderGoodsDao {

    private final DSLContext create;

    ShopOrderGoodsDao(DSLContext create) {
        this.create = create;
    }

    public List<ShopOrderGoods> getByOrderId(Long orderId) {
        return create.selectFrom(SHOP_ORDER_GOODS)
                .where(SHOP_ORDER_GOODS.SHOP_ORDER_ID.eq(orderId))
                .fetchInto(ShopOrderGoods.class);
    }

    public Long insert(ShopOrderGoods og) {
        return create.insertInto(SHOP_ORDER_GOODS)
                .set(create.newRecord(SHOP_ORDER_GOODS, og))
                .returning(SHOP_ORDER_GOODS.ID)
                .fetchOne()
                .getId();
    }
}