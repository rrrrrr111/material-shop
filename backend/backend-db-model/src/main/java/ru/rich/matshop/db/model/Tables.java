/*
 * This file is generated by jOOQ.
 */
package ru.rich.matshop.db.model;


import javax.annotation.Generated;

import ru.rich.matshop.db.model.tables.AddressTable;
import ru.rich.matshop.db.model.tables.PersonTable;
import ru.rich.matshop.db.model.tables.ProductCosmeticTable;
import ru.rich.matshop.db.model.tables.ProductTable;
import ru.rich.matshop.db.model.tables.ShopOrderGoodsTable;
import ru.rich.matshop.db.model.tables.ShopOrderHistoryTable;
import ru.rich.matshop.db.model.tables.ShopOrderTable;
import ru.rich.matshop.db.model.tables.TaskTable;
import ru.rich.matshop.db.model.tables.TechLogTable;


/**
 * Convenience access to all tables in matshop
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.11.7"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Tables {

    /**
     * The table <code>matshop.address</code>.
     */
    public static final AddressTable ADDRESS = ru.rich.matshop.db.model.tables.AddressTable.ADDRESS;

    /**
     * The table <code>matshop.person</code>.
     */
    public static final PersonTable PERSON = ru.rich.matshop.db.model.tables.PersonTable.PERSON;

    /**
     * The table <code>matshop.product</code>.
     */
    public static final ProductTable PRODUCT = ru.rich.matshop.db.model.tables.ProductTable.PRODUCT;

    /**
     * The table <code>matshop.product_cosmetic</code>.
     */
    public static final ProductCosmeticTable PRODUCT_COSMETIC = ru.rich.matshop.db.model.tables.ProductCosmeticTable.PRODUCT_COSMETIC;

    /**
     * The table <code>matshop.shop_order</code>.
     */
    public static final ShopOrderTable SHOP_ORDER = ru.rich.matshop.db.model.tables.ShopOrderTable.SHOP_ORDER;

    /**
     * The table <code>matshop.shop_order_goods</code>.
     */
    public static final ShopOrderGoodsTable SHOP_ORDER_GOODS = ru.rich.matshop.db.model.tables.ShopOrderGoodsTable.SHOP_ORDER_GOODS;

    /**
     * The table <code>matshop.shop_order_history</code>.
     */
    public static final ShopOrderHistoryTable SHOP_ORDER_HISTORY = ru.rich.matshop.db.model.tables.ShopOrderHistoryTable.SHOP_ORDER_HISTORY;

    /**
     * The table <code>matshop.task</code>.
     */
    public static final TaskTable TASK = ru.rich.matshop.db.model.tables.TaskTable.TASK;

    /**
     * The table <code>matshop.tech_log</code>.
     */
    public static final TechLogTable TECH_LOG = ru.rich.matshop.db.model.tables.TechLogTable.TECH_LOG;
}