package ru.rich.matshop.webapi.api.order;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;
import ru.rich.matshop.webapi.api.order.model.ShopOrder;

import java.util.Date;

import static ru.rich.matshop.db.model.Tables.SHOP_ORDER;

@Repository
public class ShopOrderDao {

    private final DSLContext create;

    ShopOrderDao(DSLContext create) {
        this.create = create;
    }


    public ShopOrder getById(Long id) {
        return create.selectFrom(SHOP_ORDER)
                .where(SHOP_ORDER.ID.eq(id))
                .fetchOneInto(ShopOrder.class);
    }

    public Long insert(ShopOrder o) {
        var now = new Date();
        return create.insertInto(SHOP_ORDER)
                .set(create.newRecord(SHOP_ORDER, o))
                .set(SHOP_ORDER.CREATE_DATE, now)
                .set(SHOP_ORDER.EDIT_DATE, now)
                .returning(SHOP_ORDER.ID)
                .fetchOne()
                .getId();
    }
}