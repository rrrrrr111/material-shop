/*
 * This file is generated by jOOQ.
 */
package ru.rich.matshop.db.model;


import javax.annotation.Generated;

import org.jooq.Index;
import org.jooq.OrderField;
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


/**
 * A class modelling indexes of tables of the <code>matshop</code> schema.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.11.7"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Indexes {

    // -------------------------------------------------------------------------
    // INDEX definitions
    // -------------------------------------------------------------------------

    public static final Index ADDRESS_PKEY = Indexes0.ADDRESS_PKEY;
    public static final Index IDX_ADR_PERSON_ID = Indexes0.IDX_ADR_PERSON_ID;
    public static final Index IDX_PER_EMAIL = Indexes0.IDX_PER_EMAIL;
    public static final Index IDX_PER_PHONE = Indexes0.IDX_PER_PHONE;
    public static final Index PERSON_PKEY = Indexes0.PERSON_PKEY;
    public static final Index IDX_PRO_EDIT_DATE = Indexes0.IDX_PRO_EDIT_DATE;
    public static final Index PRODUCT_PKEY = Indexes0.PRODUCT_PKEY;
    public static final Index IDX_PCS_CATEGORY = Indexes0.IDX_PCS_CATEGORY;
    public static final Index IDX_PCS_NAME = Indexes0.IDX_PCS_NAME;
    public static final Index IDX_PCS_POPULARITY = Indexes0.IDX_PCS_POPULARITY;
    public static final Index IDX_PCS_PRICE = Indexes0.IDX_PCS_PRICE;
    public static final Index PRODUCT_COSMETIC_PKEY = Indexes0.PRODUCT_COSMETIC_PKEY;
    public static final Index IDX_SOR_A_PERSON_ID = Indexes0.IDX_SOR_A_PERSON_ID;
    public static final Index IDX_SOR_ADDRESS_ID = Indexes0.IDX_SOR_ADDRESS_ID;
    public static final Index IDX_SOR_C_PERSON_ID = Indexes0.IDX_SOR_C_PERSON_ID;
    public static final Index IDX_SOR_STATE = Indexes0.IDX_SOR_STATE;
    public static final Index SHOP_ORDER_PKEY = Indexes0.SHOP_ORDER_PKEY;
    public static final Index IDX_SOG_PRODUCT_ID = Indexes0.IDX_SOG_PRODUCT_ID;
    public static final Index IDX_SOG_SHOP_ORDER_ID = Indexes0.IDX_SOG_SHOP_ORDER_ID;
    public static final Index SHOP_ORDER_GOODS_PKEY = Indexes0.SHOP_ORDER_GOODS_PKEY;
    public static final Index IDX_SOH_NEW_A_PERSON_ID = Indexes0.IDX_SOH_NEW_A_PERSON_ID;
    public static final Index IDX_SOH_OLD_A_PERSON_ID = Indexes0.IDX_SOH_OLD_A_PERSON_ID;
    public static final Index IDX_SOH_SHOP_ORDER_ID = Indexes0.IDX_SOH_SHOP_ORDER_ID;
    public static final Index SHOP_ORDER_HISTORY_PKEY = Indexes0.SHOP_ORDER_HISTORY_PKEY;
    public static final Index IDX_TSK_TS = Indexes0.IDX_TSK_TS;
    public static final Index TASK_PKEY = Indexes0.TASK_PKEY;
    public static final Index IDX_TLG_OBJECT_ID = Indexes0.IDX_TLG_OBJECT_ID;
    public static final Index IDX_TLG_TS = Indexes0.IDX_TLG_TS;
    public static final Index TECH_LOG_PKEY = Indexes0.TECH_LOG_PKEY;

    // -------------------------------------------------------------------------
    // [#1459] distribute members to avoid static initialisers > 64kb
    // -------------------------------------------------------------------------

    private static class Indexes0 {
        public static Index ADDRESS_PKEY = Internal.createIndex("address_pkey", AddressTable.ADDRESS, new OrderField[] { AddressTable.ADDRESS.ID }, true);
        public static Index IDX_ADR_PERSON_ID = Internal.createIndex("idx_adr_person_id", AddressTable.ADDRESS, new OrderField[] { AddressTable.ADDRESS.PERSON_ID }, false);
        public static Index IDX_PER_EMAIL = Internal.createIndex("idx_per_email", PersonTable.PERSON, new OrderField[] { PersonTable.PERSON.EMAIL }, false);
        public static Index IDX_PER_PHONE = Internal.createIndex("idx_per_phone", PersonTable.PERSON, new OrderField[] { PersonTable.PERSON.PHONE }, false);
        public static Index PERSON_PKEY = Internal.createIndex("person_pkey", PersonTable.PERSON, new OrderField[] { PersonTable.PERSON.ID }, true);
        public static Index IDX_PRO_EDIT_DATE = Internal.createIndex("idx_pro_edit_date", ProductTable.PRODUCT, new OrderField[] { ProductTable.PRODUCT.EDIT_DATE }, false);
        public static Index PRODUCT_PKEY = Internal.createIndex("product_pkey", ProductTable.PRODUCT, new OrderField[] { ProductTable.PRODUCT.ID }, true);
        public static Index IDX_PCS_CATEGORY = Internal.createIndex("idx_pcs_category", ProductCosmeticTable.PRODUCT_COSMETIC, new OrderField[] { ProductCosmeticTable.PRODUCT_COSMETIC.CATEGORY }, false);
        public static Index IDX_PCS_NAME = Internal.createIndex("idx_pcs_name", ProductCosmeticTable.PRODUCT_COSMETIC, new OrderField[] { ProductCosmeticTable.PRODUCT_COSMETIC.NAME }, false);
        public static Index IDX_PCS_POPULARITY = Internal.createIndex("idx_pcs_popularity", ProductCosmeticTable.PRODUCT_COSMETIC, new OrderField[] { ProductCosmeticTable.PRODUCT_COSMETIC.POPULARITY }, false);
        public static Index IDX_PCS_PRICE = Internal.createIndex("idx_pcs_price", ProductCosmeticTable.PRODUCT_COSMETIC, new OrderField[] { ProductCosmeticTable.PRODUCT_COSMETIC.PRICE }, false);
        public static Index PRODUCT_COSMETIC_PKEY = Internal.createIndex("product_cosmetic_pkey", ProductCosmeticTable.PRODUCT_COSMETIC, new OrderField[] { ProductCosmeticTable.PRODUCT_COSMETIC.PRODUCT_ID }, true);
        public static Index IDX_SOR_A_PERSON_ID = Internal.createIndex("idx_sor_a_person_id", ShopOrderTable.SHOP_ORDER, new OrderField[] { ShopOrderTable.SHOP_ORDER.ASSIGNED_PERSON_ID }, false);
        public static Index IDX_SOR_ADDRESS_ID = Internal.createIndex("idx_sor_address_id", ShopOrderTable.SHOP_ORDER, new OrderField[] { ShopOrderTable.SHOP_ORDER.ADDRESS_ID }, false);
        public static Index IDX_SOR_C_PERSON_ID = Internal.createIndex("idx_sor_c_person_id", ShopOrderTable.SHOP_ORDER, new OrderField[] { ShopOrderTable.SHOP_ORDER.CLIENT_PERSON_ID }, false);
        public static Index IDX_SOR_STATE = Internal.createIndex("idx_sor_state", ShopOrderTable.SHOP_ORDER, new OrderField[] { ShopOrderTable.SHOP_ORDER.STATE, ShopOrderTable.SHOP_ORDER.EDIT_DATE }, false);
        public static Index SHOP_ORDER_PKEY = Internal.createIndex("shop_order_pkey", ShopOrderTable.SHOP_ORDER, new OrderField[] { ShopOrderTable.SHOP_ORDER.ID }, true);
        public static Index IDX_SOG_PRODUCT_ID = Internal.createIndex("idx_sog_product_id", ShopOrderGoodsTable.SHOP_ORDER_GOODS, new OrderField[] { ShopOrderGoodsTable.SHOP_ORDER_GOODS.PRODUCT_ID }, false);
        public static Index IDX_SOG_SHOP_ORDER_ID = Internal.createIndex("idx_sog_shop_order_id", ShopOrderGoodsTable.SHOP_ORDER_GOODS, new OrderField[] { ShopOrderGoodsTable.SHOP_ORDER_GOODS.SHOP_ORDER_ID }, false);
        public static Index SHOP_ORDER_GOODS_PKEY = Internal.createIndex("shop_order_goods_pkey", ShopOrderGoodsTable.SHOP_ORDER_GOODS, new OrderField[] { ShopOrderGoodsTable.SHOP_ORDER_GOODS.ID }, true);
        public static Index IDX_SOH_NEW_A_PERSON_ID = Internal.createIndex("idx_soh_new_a_person_id", ShopOrderHistoryTable.SHOP_ORDER_HISTORY, new OrderField[] { ShopOrderHistoryTable.SHOP_ORDER_HISTORY.NEW_ASSIGNED_PERSON_ID }, false);
        public static Index IDX_SOH_OLD_A_PERSON_ID = Internal.createIndex("idx_soh_old_a_person_id", ShopOrderHistoryTable.SHOP_ORDER_HISTORY, new OrderField[] { ShopOrderHistoryTable.SHOP_ORDER_HISTORY.OLD_ASSIGNED_PERSON_ID }, false);
        public static Index IDX_SOH_SHOP_ORDER_ID = Internal.createIndex("idx_soh_shop_order_id", ShopOrderHistoryTable.SHOP_ORDER_HISTORY, new OrderField[] { ShopOrderHistoryTable.SHOP_ORDER_HISTORY.SHOP_ORDER_ID }, false);
        public static Index SHOP_ORDER_HISTORY_PKEY = Internal.createIndex("shop_order_history_pkey", ShopOrderHistoryTable.SHOP_ORDER_HISTORY, new OrderField[] { ShopOrderHistoryTable.SHOP_ORDER_HISTORY.ID }, true);
        public static Index IDX_TSK_TS = Internal.createIndex("idx_tsk_ts", TaskTable.TASK, new OrderField[] { TaskTable.TASK.TYPE, TaskTable.TASK.STATE }, false);
        public static Index TASK_PKEY = Internal.createIndex("task_pkey", TaskTable.TASK, new OrderField[] { TaskTable.TASK.ID }, true);
        public static Index IDX_TLG_OBJECT_ID = Internal.createIndex("idx_tlg_object_id", TechLogTable.TECH_LOG, new OrderField[] { TechLogTable.TECH_LOG.OBJECT_ID }, false);
        public static Index IDX_TLG_TS = Internal.createIndex("idx_tlg_ts", TechLogTable.TECH_LOG, new OrderField[] { TechLogTable.TECH_LOG.EVENT_DATE }, false);
        public static Index TECH_LOG_PKEY = Internal.createIndex("tech_log_pkey", TechLogTable.TECH_LOG, new OrderField[] { TechLogTable.TECH_LOG.ID }, true);
    }
}