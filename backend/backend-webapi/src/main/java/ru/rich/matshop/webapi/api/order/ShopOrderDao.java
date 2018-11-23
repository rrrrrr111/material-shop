package ru.rich.matshop.webapi.api.order;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

@Repository
public class ShopOrderDao {

    private final DSLContext create;

    ShopOrderDao(DSLContext create) {
        this.create = create;
    }


}