/*
 * This file is generated by jOOQ.
 */
package ru.rich.matshop.db.model.tables;


import java.sql.Timestamp;
import java.util.Arrays;
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
public class ShopOrder extends TableImpl<ShopOrderRecord> {

    private static final long serialVersionUID = 992996932;

    /**
     * The reference instance of <code>matshop.shop_order</code>
     */
    public static final ShopOrder SHOP_ORDER = new ShopOrder();

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
    public final TableField<ShopOrderRecord, Integer> ID = createField("id", org.jooq.impl.SQLDataType.INTEGER.nullable(false).defaultValue(org.jooq.impl.DSL.field("nextval('shop_order_id_seq'::regclass)", org.jooq.impl.SQLDataType.INTEGER)), this, "");

    /**
     * The column <code>matshop.shop_order.shop_id</code>.
     */
    public final TableField<ShopOrderRecord, Integer> SHOP_ID = createField("shop_id", org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>matshop.shop_order.client_person_id</code>.
     */
    public final TableField<ShopOrderRecord, Integer> CLIENT_PERSON_ID = createField("client_person_id", org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>matshop.shop_order.address_id</code>.
     */
    public final TableField<ShopOrderRecord, Integer> ADDRESS_ID = createField("address_id", org.jooq.impl.SQLDataType.INTEGER, this, "");

    /**
     * The column <code>matshop.shop_order.ammount</code>.
     */
    public final TableField<ShopOrderRecord, Long> AMMOUNT = createField("ammount", org.jooq.impl.SQLDataType.BIGINT, this, "");

    /**
     * The column <code>matshop.shop_order.state</code>.
     */
    public final TableField<ShopOrderRecord, String> STATE = createField("state", org.jooq.impl.SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>matshop.shop_order.assigned_person_id</code>.
     */
    public final TableField<ShopOrderRecord, Integer> ASSIGNED_PERSON_ID = createField("assigned_person_id", org.jooq.impl.SQLDataType.INTEGER, this, "");

    /**
     * The column <code>matshop.shop_order.service_comment</code>.
     */
    public final TableField<ShopOrderRecord, String> SERVICE_COMMENT = createField("service_comment", org.jooq.impl.SQLDataType.VARCHAR(10000), this, "");

    /**
     * The column <code>matshop.shop_order.edit_date</code>.
     */
    public final TableField<ShopOrderRecord, Timestamp> EDIT_DATE = createField("edit_date", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false), this, "");

    /**
     * Create a <code>matshop.shop_order</code> table reference
     */
    public ShopOrder() {
        this(DSL.name("shop_order"), null);
    }

    /**
     * Create an aliased <code>matshop.shop_order</code> table reference
     */
    public ShopOrder(String alias) {
        this(DSL.name(alias), SHOP_ORDER);
    }

    /**
     * Create an aliased <code>matshop.shop_order</code> table reference
     */
    public ShopOrder(Name alias) {
        this(alias, SHOP_ORDER);
    }

    private ShopOrder(Name alias, Table<ShopOrderRecord> aliased) {
        this(alias, aliased, null);
    }

    private ShopOrder(Name alias, Table<ShopOrderRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""));
    }

    public <O extends Record> ShopOrder(Table<O> child, ForeignKey<O, ShopOrderRecord> key) {
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
    public Identity<ShopOrderRecord, Integer> getIdentity() {
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
        return Arrays.<ForeignKey<ShopOrderRecord, ?>>asList(Keys.SHOP_ORDER__SHOP_ORDER_CLIENT_PERSON_ID_FKEY, Keys.SHOP_ORDER__SHOP_ORDER_ADDRESS_ID_FKEY, Keys.SHOP_ORDER__SHOP_ORDER_ASSIGNED_PERSON_ID_FKEY);
    }

    public Person shopOrder_ShopOrderClientPersonIdFkey() {
        return new Person(this, Keys.SHOP_ORDER__SHOP_ORDER_CLIENT_PERSON_ID_FKEY);
    }

    public Address address() {
        return new Address(this, Keys.SHOP_ORDER__SHOP_ORDER_ADDRESS_ID_FKEY);
    }

    public Person shopOrder_ShopOrderAssignedPersonIdFkey() {
        return new Person(this, Keys.SHOP_ORDER__SHOP_ORDER_ASSIGNED_PERSON_ID_FKEY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrder as(String alias) {
        return new ShopOrder(DSL.name(alias), this);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrder as(Name alias) {
        return new ShopOrder(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public ShopOrder rename(String name) {
        return new ShopOrder(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public ShopOrder rename(Name name) {
        return new ShopOrder(name, null);
    }
}
