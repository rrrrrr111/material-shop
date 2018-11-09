/*
 * This file is generated by jOOQ.
 */
package ru.rich.matshop.db.model;


import javax.annotation.Generated;

import ru.rich.matshop.db.model.tables.Address;
import ru.rich.matshop.db.model.tables.FlywaySchemaHistory;
import ru.rich.matshop.db.model.tables.Person;
import ru.rich.matshop.db.model.tables.Product;
import ru.rich.matshop.db.model.tables.ProductCosmetic;
import ru.rich.matshop.db.model.tables.ShopOrder;
import ru.rich.matshop.db.model.tables.ShopOrderGoods;
import ru.rich.matshop.db.model.tables.ShopOrderHistory;
import ru.rich.matshop.db.model.tables.Task;
import ru.rich.matshop.db.model.tables.TechLog;


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
    public static final Address ADDRESS = ru.rich.matshop.db.model.tables.Address.ADDRESS;

    /**
     * The table <code>matshop.flyway_schema_history</code>.
     */
    public static final FlywaySchemaHistory FLYWAY_SCHEMA_HISTORY = ru.rich.matshop.db.model.tables.FlywaySchemaHistory.FLYWAY_SCHEMA_HISTORY;

    /**
     * The table <code>matshop.person</code>.
     */
    public static final Person PERSON = ru.rich.matshop.db.model.tables.Person.PERSON;

    /**
     * The table <code>matshop.product</code>.
     */
    public static final Product PRODUCT = ru.rich.matshop.db.model.tables.Product.PRODUCT;

    /**
     * The table <code>matshop.product_cosmetic</code>.
     */
    public static final ProductCosmetic PRODUCT_COSMETIC = ru.rich.matshop.db.model.tables.ProductCosmetic.PRODUCT_COSMETIC;

    /**
     * The table <code>matshop.shop_order</code>.
     */
    public static final ShopOrder SHOP_ORDER = ru.rich.matshop.db.model.tables.ShopOrder.SHOP_ORDER;

    /**
     * The table <code>matshop.shop_order_goods</code>.
     */
    public static final ShopOrderGoods SHOP_ORDER_GOODS = ru.rich.matshop.db.model.tables.ShopOrderGoods.SHOP_ORDER_GOODS;

    /**
     * The table <code>matshop.shop_order_history</code>.
     */
    public static final ShopOrderHistory SHOP_ORDER_HISTORY = ru.rich.matshop.db.model.tables.ShopOrderHistory.SHOP_ORDER_HISTORY;

    /**
     * The table <code>matshop.task</code>.
     */
    public static final Task TASK = ru.rich.matshop.db.model.tables.Task.TASK;

    /**
     * The table <code>matshop.tech_log</code>.
     */
    public static final TechLog TECH_LOG = ru.rich.matshop.db.model.tables.TechLog.TECH_LOG;
}
