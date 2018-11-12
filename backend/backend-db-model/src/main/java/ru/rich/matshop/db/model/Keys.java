/*
 * This file is generated by jOOQ.
 */
package ru.rich.matshop.db.model;


import javax.annotation.Generated;

import org.jooq.ForeignKey;
import org.jooq.Identity;
import org.jooq.UniqueKey;
import org.jooq.impl.Internal;

import ru.rich.matshop.db.model.tables.AddressTable;
import ru.rich.matshop.db.model.tables.PersonTable;
import ru.rich.matshop.db.model.tables.ProductCosmeticTable;
import ru.rich.matshop.db.model.tables.ProductTable;
import ru.rich.matshop.db.model.tables.ShopOrderGoodsTable;
import ru.rich.matshop.db.model.tables.ShopOrderHistoryTable;
import ru.rich.matshop.db.model.tables.ShopOrderTable;
import ru.rich.matshop.db.model.tables.TaskTable;
import ru.rich.matshop.db.model.tables.TechLogTable;
import ru.rich.matshop.db.model.tables.records.AddressRecord;
import ru.rich.matshop.db.model.tables.records.PersonRecord;
import ru.rich.matshop.db.model.tables.records.ProductCosmeticRecord;
import ru.rich.matshop.db.model.tables.records.ProductRecord;
import ru.rich.matshop.db.model.tables.records.ShopOrderGoodsRecord;
import ru.rich.matshop.db.model.tables.records.ShopOrderHistoryRecord;
import ru.rich.matshop.db.model.tables.records.ShopOrderRecord;
import ru.rich.matshop.db.model.tables.records.TaskRecord;
import ru.rich.matshop.db.model.tables.records.TechLogRecord;


/**
 * A class modelling foreign key relationships and constraints of tables of 
 * the <code>matshop</code> schema.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.11.7"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Keys {

    // -------------------------------------------------------------------------
    // IDENTITY definitions
    // -------------------------------------------------------------------------

    public static final Identity<AddressRecord, Integer> IDENTITY_ADDRESS = Identities0.IDENTITY_ADDRESS;
    public static final Identity<PersonRecord, Integer> IDENTITY_PERSON = Identities0.IDENTITY_PERSON;
    public static final Identity<ProductRecord, Integer> IDENTITY_PRODUCT = Identities0.IDENTITY_PRODUCT;
    public static final Identity<ShopOrderRecord, Integer> IDENTITY_SHOP_ORDER = Identities0.IDENTITY_SHOP_ORDER;
    public static final Identity<ShopOrderGoodsRecord, Integer> IDENTITY_SHOP_ORDER_GOODS = Identities0.IDENTITY_SHOP_ORDER_GOODS;
    public static final Identity<ShopOrderHistoryRecord, Integer> IDENTITY_SHOP_ORDER_HISTORY = Identities0.IDENTITY_SHOP_ORDER_HISTORY;
    public static final Identity<TaskRecord, Integer> IDENTITY_TASK = Identities0.IDENTITY_TASK;
    public static final Identity<TechLogRecord, Integer> IDENTITY_TECH_LOG = Identities0.IDENTITY_TECH_LOG;

    // -------------------------------------------------------------------------
    // UNIQUE and PRIMARY KEY definitions
    // -------------------------------------------------------------------------

    public static final UniqueKey<AddressRecord> ADDRESS_PKEY = UniqueKeys0.ADDRESS_PKEY;
    public static final UniqueKey<PersonRecord> PERSON_PKEY = UniqueKeys0.PERSON_PKEY;
    public static final UniqueKey<ProductRecord> PRODUCT_PKEY = UniqueKeys0.PRODUCT_PKEY;
    public static final UniqueKey<ProductCosmeticRecord> PRODUCT_COSMETIC_PKEY = UniqueKeys0.PRODUCT_COSMETIC_PKEY;
    public static final UniqueKey<ShopOrderRecord> SHOP_ORDER_PKEY = UniqueKeys0.SHOP_ORDER_PKEY;
    public static final UniqueKey<ShopOrderGoodsRecord> SHOP_ORDER_GOODS_PKEY = UniqueKeys0.SHOP_ORDER_GOODS_PKEY;
    public static final UniqueKey<ShopOrderHistoryRecord> SHOP_ORDER_HISTORY_PKEY = UniqueKeys0.SHOP_ORDER_HISTORY_PKEY;
    public static final UniqueKey<TaskRecord> TASK_PKEY = UniqueKeys0.TASK_PKEY;
    public static final UniqueKey<TechLogRecord> TECH_LOG_PKEY = UniqueKeys0.TECH_LOG_PKEY;

    // -------------------------------------------------------------------------
    // FOREIGN KEY definitions
    // -------------------------------------------------------------------------

    public static final ForeignKey<AddressRecord, PersonRecord> ADDRESS__ADDRESS_PERSON_ID_FKEY = ForeignKeys0.ADDRESS__ADDRESS_PERSON_ID_FKEY;
    public static final ForeignKey<ProductCosmeticRecord, ProductRecord> PRODUCT_COSMETIC__PRODUCT_COSMETIC_PRODUCT_ID_FKEY = ForeignKeys0.PRODUCT_COSMETIC__PRODUCT_COSMETIC_PRODUCT_ID_FKEY;
    public static final ForeignKey<ShopOrderRecord, PersonRecord> SHOP_ORDER__SHOP_ORDER_CLIENT_PERSON_ID_FKEY = ForeignKeys0.SHOP_ORDER__SHOP_ORDER_CLIENT_PERSON_ID_FKEY;
    public static final ForeignKey<ShopOrderRecord, AddressRecord> SHOP_ORDER__SHOP_ORDER_ADDRESS_ID_FKEY = ForeignKeys0.SHOP_ORDER__SHOP_ORDER_ADDRESS_ID_FKEY;
    public static final ForeignKey<ShopOrderRecord, PersonRecord> SHOP_ORDER__SHOP_ORDER_ASSIGNED_PERSON_ID_FKEY = ForeignKeys0.SHOP_ORDER__SHOP_ORDER_ASSIGNED_PERSON_ID_FKEY;
    public static final ForeignKey<ShopOrderGoodsRecord, ShopOrderRecord> SHOP_ORDER_GOODS__SHOP_ORDER_GOODS_SHOP_ORDER_ID_FKEY = ForeignKeys0.SHOP_ORDER_GOODS__SHOP_ORDER_GOODS_SHOP_ORDER_ID_FKEY;
    public static final ForeignKey<ShopOrderGoodsRecord, ProductRecord> SHOP_ORDER_GOODS__SHOP_ORDER_GOODS_PRODUCT_ID_FKEY = ForeignKeys0.SHOP_ORDER_GOODS__SHOP_ORDER_GOODS_PRODUCT_ID_FKEY;
    public static final ForeignKey<ShopOrderHistoryRecord, ShopOrderRecord> SHOP_ORDER_HISTORY__SHOP_ORDER_HISTORY_SHOP_ORDER_ID_FKEY = ForeignKeys0.SHOP_ORDER_HISTORY__SHOP_ORDER_HISTORY_SHOP_ORDER_ID_FKEY;
    public static final ForeignKey<ShopOrderHistoryRecord, PersonRecord> SHOP_ORDER_HISTORY__SHOP_ORDER_HISTORY_OLD_ASSIGNED_PERSON_ID_FKEY = ForeignKeys0.SHOP_ORDER_HISTORY__SHOP_ORDER_HISTORY_OLD_ASSIGNED_PERSON_ID_FKEY;
    public static final ForeignKey<ShopOrderHistoryRecord, PersonRecord> SHOP_ORDER_HISTORY__SHOP_ORDER_HISTORY_NEW_ASSIGNED_PERSON_ID_FKEY = ForeignKeys0.SHOP_ORDER_HISTORY__SHOP_ORDER_HISTORY_NEW_ASSIGNED_PERSON_ID_FKEY;

    // -------------------------------------------------------------------------
    // [#1459] distribute members to avoid static initialisers > 64kb
    // -------------------------------------------------------------------------

    private static class Identities0 {
        public static Identity<AddressRecord, Integer> IDENTITY_ADDRESS = Internal.createIdentity(AddressTable.ADDRESS, AddressTable.ADDRESS.ID);
        public static Identity<PersonRecord, Integer> IDENTITY_PERSON = Internal.createIdentity(PersonTable.PERSON, PersonTable.PERSON.ID);
        public static Identity<ProductRecord, Integer> IDENTITY_PRODUCT = Internal.createIdentity(ProductTable.PRODUCT, ProductTable.PRODUCT.ID);
        public static Identity<ShopOrderRecord, Integer> IDENTITY_SHOP_ORDER = Internal.createIdentity(ShopOrderTable.SHOP_ORDER, ShopOrderTable.SHOP_ORDER.ID);
        public static Identity<ShopOrderGoodsRecord, Integer> IDENTITY_SHOP_ORDER_GOODS = Internal.createIdentity(ShopOrderGoodsTable.SHOP_ORDER_GOODS, ShopOrderGoodsTable.SHOP_ORDER_GOODS.ID);
        public static Identity<ShopOrderHistoryRecord, Integer> IDENTITY_SHOP_ORDER_HISTORY = Internal.createIdentity(ShopOrderHistoryTable.SHOP_ORDER_HISTORY, ShopOrderHistoryTable.SHOP_ORDER_HISTORY.ID);
        public static Identity<TaskRecord, Integer> IDENTITY_TASK = Internal.createIdentity(TaskTable.TASK, TaskTable.TASK.ID);
        public static Identity<TechLogRecord, Integer> IDENTITY_TECH_LOG = Internal.createIdentity(TechLogTable.TECH_LOG, TechLogTable.TECH_LOG.ID);
    }

    private static class UniqueKeys0 {
        public static final UniqueKey<AddressRecord> ADDRESS_PKEY = Internal.createUniqueKey(AddressTable.ADDRESS, "address_pkey", AddressTable.ADDRESS.ID);
        public static final UniqueKey<PersonRecord> PERSON_PKEY = Internal.createUniqueKey(PersonTable.PERSON, "person_pkey", PersonTable.PERSON.ID);
        public static final UniqueKey<ProductRecord> PRODUCT_PKEY = Internal.createUniqueKey(ProductTable.PRODUCT, "product_pkey", ProductTable.PRODUCT.ID);
        public static final UniqueKey<ProductCosmeticRecord> PRODUCT_COSMETIC_PKEY = Internal.createUniqueKey(ProductCosmeticTable.PRODUCT_COSMETIC, "product_cosmetic_pkey", ProductCosmeticTable.PRODUCT_COSMETIC.PRODUCT_ID);
        public static final UniqueKey<ShopOrderRecord> SHOP_ORDER_PKEY = Internal.createUniqueKey(ShopOrderTable.SHOP_ORDER, "shop_order_pkey", ShopOrderTable.SHOP_ORDER.ID);
        public static final UniqueKey<ShopOrderGoodsRecord> SHOP_ORDER_GOODS_PKEY = Internal.createUniqueKey(ShopOrderGoodsTable.SHOP_ORDER_GOODS, "shop_order_goods_pkey", ShopOrderGoodsTable.SHOP_ORDER_GOODS.ID);
        public static final UniqueKey<ShopOrderHistoryRecord> SHOP_ORDER_HISTORY_PKEY = Internal.createUniqueKey(ShopOrderHistoryTable.SHOP_ORDER_HISTORY, "shop_order_history_pkey", ShopOrderHistoryTable.SHOP_ORDER_HISTORY.ID);
        public static final UniqueKey<TaskRecord> TASK_PKEY = Internal.createUniqueKey(TaskTable.TASK, "task_pkey", TaskTable.TASK.ID);
        public static final UniqueKey<TechLogRecord> TECH_LOG_PKEY = Internal.createUniqueKey(TechLogTable.TECH_LOG, "tech_log_pkey", TechLogTable.TECH_LOG.ID);
    }

    private static class ForeignKeys0 {
        public static final ForeignKey<AddressRecord, PersonRecord> ADDRESS__ADDRESS_PERSON_ID_FKEY = Internal.createForeignKey(ru.rich.matshop.db.model.Keys.PERSON_PKEY, AddressTable.ADDRESS, "address__address_person_id_fkey", AddressTable.ADDRESS.PERSON_ID);
        public static final ForeignKey<ProductCosmeticRecord, ProductRecord> PRODUCT_COSMETIC__PRODUCT_COSMETIC_PRODUCT_ID_FKEY = Internal.createForeignKey(ru.rich.matshop.db.model.Keys.PRODUCT_PKEY, ProductCosmeticTable.PRODUCT_COSMETIC, "product_cosmetic__product_cosmetic_product_id_fkey", ProductCosmeticTable.PRODUCT_COSMETIC.PRODUCT_ID);
        public static final ForeignKey<ShopOrderRecord, PersonRecord> SHOP_ORDER__SHOP_ORDER_CLIENT_PERSON_ID_FKEY = Internal.createForeignKey(ru.rich.matshop.db.model.Keys.PERSON_PKEY, ShopOrderTable.SHOP_ORDER, "shop_order__shop_order_client_person_id_fkey", ShopOrderTable.SHOP_ORDER.CLIENT_PERSON_ID);
        public static final ForeignKey<ShopOrderRecord, AddressRecord> SHOP_ORDER__SHOP_ORDER_ADDRESS_ID_FKEY = Internal.createForeignKey(ru.rich.matshop.db.model.Keys.ADDRESS_PKEY, ShopOrderTable.SHOP_ORDER, "shop_order__shop_order_address_id_fkey", ShopOrderTable.SHOP_ORDER.ADDRESS_ID);
        public static final ForeignKey<ShopOrderRecord, PersonRecord> SHOP_ORDER__SHOP_ORDER_ASSIGNED_PERSON_ID_FKEY = Internal.createForeignKey(ru.rich.matshop.db.model.Keys.PERSON_PKEY, ShopOrderTable.SHOP_ORDER, "shop_order__shop_order_assigned_person_id_fkey", ShopOrderTable.SHOP_ORDER.ASSIGNED_PERSON_ID);
        public static final ForeignKey<ShopOrderGoodsRecord, ShopOrderRecord> SHOP_ORDER_GOODS__SHOP_ORDER_GOODS_SHOP_ORDER_ID_FKEY = Internal.createForeignKey(ru.rich.matshop.db.model.Keys.SHOP_ORDER_PKEY, ShopOrderGoodsTable.SHOP_ORDER_GOODS, "shop_order_goods__shop_order_goods_shop_order_id_fkey", ShopOrderGoodsTable.SHOP_ORDER_GOODS.SHOP_ORDER_ID);
        public static final ForeignKey<ShopOrderGoodsRecord, ProductRecord> SHOP_ORDER_GOODS__SHOP_ORDER_GOODS_PRODUCT_ID_FKEY = Internal.createForeignKey(ru.rich.matshop.db.model.Keys.PRODUCT_PKEY, ShopOrderGoodsTable.SHOP_ORDER_GOODS, "shop_order_goods__shop_order_goods_product_id_fkey", ShopOrderGoodsTable.SHOP_ORDER_GOODS.PRODUCT_ID);
        public static final ForeignKey<ShopOrderHistoryRecord, ShopOrderRecord> SHOP_ORDER_HISTORY__SHOP_ORDER_HISTORY_SHOP_ORDER_ID_FKEY = Internal.createForeignKey(ru.rich.matshop.db.model.Keys.SHOP_ORDER_PKEY, ShopOrderHistoryTable.SHOP_ORDER_HISTORY, "shop_order_history__shop_order_history_shop_order_id_fkey", ShopOrderHistoryTable.SHOP_ORDER_HISTORY.SHOP_ORDER_ID);
        public static final ForeignKey<ShopOrderHistoryRecord, PersonRecord> SHOP_ORDER_HISTORY__SHOP_ORDER_HISTORY_OLD_ASSIGNED_PERSON_ID_FKEY = Internal.createForeignKey(ru.rich.matshop.db.model.Keys.PERSON_PKEY, ShopOrderHistoryTable.SHOP_ORDER_HISTORY, "shop_order_history__shop_order_history_old_assigned_person_id_fkey", ShopOrderHistoryTable.SHOP_ORDER_HISTORY.OLD_ASSIGNED_PERSON_ID);
        public static final ForeignKey<ShopOrderHistoryRecord, PersonRecord> SHOP_ORDER_HISTORY__SHOP_ORDER_HISTORY_NEW_ASSIGNED_PERSON_ID_FKEY = Internal.createForeignKey(ru.rich.matshop.db.model.Keys.PERSON_PKEY, ShopOrderHistoryTable.SHOP_ORDER_HISTORY, "shop_order_history__shop_order_history_new_assigned_person_id_fkey", ShopOrderHistoryTable.SHOP_ORDER_HISTORY.NEW_ASSIGNED_PERSON_ID);
    }
}
