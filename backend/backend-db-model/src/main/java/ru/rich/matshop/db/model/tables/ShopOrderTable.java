/*
 * This file is generated by jOOQ.
 */
package ru.rich.matshop.db.model.tables;


import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Identity;
import org.jooq.Index;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.TableImpl;

import ru.rich.matshop.db.converters.TimestampConverter;
import ru.rich.matshop.db.model.Indexes;
import ru.rich.matshop.db.model.Keys;
import ru.rich.matshop.db.model.Matshop;
import ru.rich.matshop.db.model.tables.records.ShopOrderRecord;


/**
 * This class is generated by jOOQ.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.11.7"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class ShopOrderTable extends TableImpl<ShopOrderRecord> {

    private static final long serialVersionUID = 1235861309;

    /**
     * The reference instance of <code>matshop.shop_order</code>
     */
    public static final ShopOrderTable SHOP_ORDER = new ShopOrderTable();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<ShopOrderRecord> getRecordType() {
        return ShopOrderRecord.class;
    }

    /**
     * The column <code>matshop.shop_order.id</code>.
     */
    public final TableField<ShopOrderRecord, Long> ID = createField("id", org.jooq.impl.SQLDataType.BIGINT.nullable(false).defaultValue(org.jooq.impl.DSL.field("nextval('shop_order_id_seq'::regclass)", org.jooq.impl.SQLDataType.BIGINT)), this, "");

    /**
     * The column <code>matshop.shop_order.shop_id</code>.
     */
    public final TableField<ShopOrderRecord, Integer> SHOP_ID = createField("shop_id", org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>matshop.shop_order.client_person_id</code>.
     */
    public final TableField<ShopOrderRecord, Long> CLIENT_PERSON_ID = createField("client_person_id", org.jooq.impl.SQLDataType.BIGINT.nullable(false), this, "");

    /**
     * The column <code>matshop.shop_order.person_address_id</code>.
     */
    public final TableField<ShopOrderRecord, Long> PERSON_ADDRESS_ID = createField("person_address_id", org.jooq.impl.SQLDataType.BIGINT, this, "");

    /**
     * The column <code>matshop.shop_order.goods_amount</code>.
     */
    public final TableField<ShopOrderRecord, Long> GOODS_AMOUNT = createField("goods_amount", org.jooq.impl.SQLDataType.BIGINT, this, "");

    /**
     * The column <code>matshop.shop_order.delivery_amount</code>.
     */
    public final TableField<ShopOrderRecord, Long> DELIVERY_AMOUNT = createField("delivery_amount", org.jooq.impl.SQLDataType.BIGINT, this, "");

    /**
     * The column <code>matshop.shop_order.total_amount</code>.
     */
    public final TableField<ShopOrderRecord, Long> TOTAL_AMOUNT = createField("total_amount", org.jooq.impl.SQLDataType.BIGINT, this, "");

    /**
     * The column <code>matshop.shop_order.delivery_type</code>.
     */
    public final TableField<ShopOrderRecord, String> DELIVERY_TYPE = createField("delivery_type", org.jooq.impl.SQLDataType.VARCHAR(100), this, "");

    /**
     * The column <code>matshop.shop_order.state</code>.
     */
    public final TableField<ShopOrderRecord, String> STATE = createField("state", org.jooq.impl.SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>matshop.shop_order.assigned_person_id</code>.
     */
    public final TableField<ShopOrderRecord, Long> ASSIGNED_PERSON_ID = createField("assigned_person_id", org.jooq.impl.SQLDataType.BIGINT, this, "");

    /**
     * The column <code>matshop.shop_order.service_comment</code>.
     */
    public final TableField<ShopOrderRecord, String> SERVICE_COMMENT = createField("service_comment", org.jooq.impl.SQLDataType.VARCHAR(10000), this, "");

    /**
     * The column <code>matshop.shop_order.payment_info</code>.
     */
    public final TableField<ShopOrderRecord, String> PAYMENT_INFO = createField("payment_info", org.jooq.impl.SQLDataType.VARCHAR(10000), this, "");

    /**
     * The column <code>matshop.shop_order.payment_type</code>.
     */
    public final TableField<ShopOrderRecord, String> PAYMENT_TYPE = createField("payment_type", org.jooq.impl.SQLDataType.VARCHAR(100), this, "");

    /**
     * The column <code>matshop.shop_order.create_date</code>.
     */
    public final TableField<ShopOrderRecord, Date> CREATE_DATE = createField("create_date", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false), this, "", new TimestampConverter());

    /**
     * The column <code>matshop.shop_order.edit_date</code>.
     */
    public final TableField<ShopOrderRecord, Date> EDIT_DATE = createField("edit_date", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false), this, "", new TimestampConverter());

    /**
     * Create a <code>matshop.shop_order</code> table reference
     */
    public ShopOrderTable() {
        this(DSL.name("shop_order"), null);
    }

    /**
     * Create an aliased <code>matshop.shop_order</code> table reference
     */
    public ShopOrderTable(String alias) {
        this(DSL.name(alias), SHOP_ORDER);
    }

    /**
     * Create an aliased <code>matshop.shop_order</code> table reference
     */
    public ShopOrderTable(Name alias) {
        this(alias, SHOP_ORDER);
    }

    private ShopOrderTable(Name alias, Table<ShopOrderRecord> aliased) {
        this(alias, aliased, null);
    }

    private ShopOrderTable(Name alias, Table<ShopOrderRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""));
    }

    public <O extends Record> ShopOrderTable(Table<O> child, ForeignKey<O, ShopOrderRecord> key) {
        super(child, key, SHOP_ORDER);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Schema getSchema() {
        return Matshop.MATSHOP;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Index> getIndexes() {
        return Arrays.<Index>asList(Indexes.IDX_SOR_A_PERSON_ID, Indexes.IDX_SOR_ADDRESS_ID, Indexes.IDX_SOR_C_PERSON_ID, Indexes.IDX_SOR_STATE, Indexes.SHOP_ORDER_PKEY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Identity<ShopOrderRecord, Long> getIdentity() {
        return Keys.IDENTITY_SHOP_ORDER;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UniqueKey<ShopOrderRecord> getPrimaryKey() {
        return Keys.SHOP_ORDER_PKEY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<ShopOrderRecord>> getKeys() {
        return Arrays.<UniqueKey<ShopOrderRecord>>asList(Keys.SHOP_ORDER_PKEY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<ForeignKey<ShopOrderRecord, ?>> getReferences() {
        return Arrays.<ForeignKey<ShopOrderRecord, ?>>asList(Keys.SHOP_ORDER__SHOP_ORDER_CLIENT_PERSON_ID_FKEY, Keys.SHOP_ORDER__SHOP_ORDER_PERSON_ADDRESS_ID_FKEY, Keys.SHOP_ORDER__SHOP_ORDER_ASSIGNED_PERSON_ID_FKEY);
    }

    public PersonTable shopOrder_ShopOrderClientPersonIdFkey() {
        return new PersonTable(this, Keys.SHOP_ORDER__SHOP_ORDER_CLIENT_PERSON_ID_FKEY);
    }

    public PersonAddressTable personAddress() {
        return new PersonAddressTable(this, Keys.SHOP_ORDER__SHOP_ORDER_PERSON_ADDRESS_ID_FKEY);
    }

    public PersonTable shopOrder_ShopOrderAssignedPersonIdFkey() {
        return new PersonTable(this, Keys.SHOP_ORDER__SHOP_ORDER_ASSIGNED_PERSON_ID_FKEY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderTable as(String alias) {
        return new ShopOrderTable(DSL.name(alias), this);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderTable as(Name alias) {
        return new ShopOrderTable(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public ShopOrderTable rename(String name) {
        return new ShopOrderTable(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public ShopOrderTable rename(Name name) {
        return new ShopOrderTable(name, null);
    }
}
