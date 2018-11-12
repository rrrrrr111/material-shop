/*
 * This file is generated by jOOQ.
 */
package ru.rich.matshop.db.model.tables.records;


import java.sql.Timestamp;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record9;
import org.jooq.Row9;
import org.jooq.impl.UpdatableRecordImpl;

import ru.rich.matshop.db.model.tables.ShopOrderTable;


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
public class ShopOrderRecord extends UpdatableRecordImpl<ShopOrderRecord> implements Record9<Integer, Integer, Integer, Integer, Long, String, Integer, String, Timestamp> {

    private static final long serialVersionUID = -1492285627;

    /**
     * Setter for <code>matshop.shop_order.id</code>.
     */
    public void setId(Integer value) {
        set(0, value);
    }

    /**
     * Getter for <code>matshop.shop_order.id</code>.
     */
    public Integer getId() {
        return (Integer) get(0);
    }

    /**
     * Setter for <code>matshop.shop_order.shop_id</code>.
     */
    public void setShopId(Integer value) {
        set(1, value);
    }

    /**
     * Getter for <code>matshop.shop_order.shop_id</code>.
     */
    public Integer getShopId() {
        return (Integer) get(1);
    }

    /**
     * Setter for <code>matshop.shop_order.client_person_id</code>.
     */
    public void setClientPersonId(Integer value) {
        set(2, value);
    }

    /**
     * Getter for <code>matshop.shop_order.client_person_id</code>.
     */
    public Integer getClientPersonId() {
        return (Integer) get(2);
    }

    /**
     * Setter for <code>matshop.shop_order.address_id</code>.
     */
    public void setAddressId(Integer value) {
        set(3, value);
    }

    /**
     * Getter for <code>matshop.shop_order.address_id</code>.
     */
    public Integer getAddressId() {
        return (Integer) get(3);
    }

    /**
     * Setter for <code>matshop.shop_order.ammount</code>.
     */
    public void setAmmount(Long value) {
        set(4, value);
    }

    /**
     * Getter for <code>matshop.shop_order.ammount</code>.
     */
    public Long getAmmount() {
        return (Long) get(4);
    }

    /**
     * Setter for <code>matshop.shop_order.state</code>.
     */
    public void setState(String value) {
        set(5, value);
    }

    /**
     * Getter for <code>matshop.shop_order.state</code>.
     */
    public String getState() {
        return (String) get(5);
    }

    /**
     * Setter for <code>matshop.shop_order.assigned_person_id</code>.
     */
    public void setAssignedPersonId(Integer value) {
        set(6, value);
    }

    /**
     * Getter for <code>matshop.shop_order.assigned_person_id</code>.
     */
    public Integer getAssignedPersonId() {
        return (Integer) get(6);
    }

    /**
     * Setter for <code>matshop.shop_order.service_comment</code>.
     */
    public void setServiceComment(String value) {
        set(7, value);
    }

    /**
     * Getter for <code>matshop.shop_order.service_comment</code>.
     */
    public String getServiceComment() {
        return (String) get(7);
    }

    /**
     * Setter for <code>matshop.shop_order.edit_date</code>.
     */
    public void setEditDate(Timestamp value) {
        set(8, value);
    }

    /**
     * Getter for <code>matshop.shop_order.edit_date</code>.
     */
    public Timestamp getEditDate() {
        return (Timestamp) get(8);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Record1<Integer> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record9 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row9<Integer, Integer, Integer, Integer, Long, String, Integer, String, Timestamp> fieldsRow() {
        return (Row9) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row9<Integer, Integer, Integer, Integer, Long, String, Integer, String, Timestamp> valuesRow() {
        return (Row9) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Integer> field1() {
        return ShopOrderTable.SHOP_ORDER.ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Integer> field2() {
        return ShopOrderTable.SHOP_ORDER.SHOP_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Integer> field3() {
        return ShopOrderTable.SHOP_ORDER.CLIENT_PERSON_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Integer> field4() {
        return ShopOrderTable.SHOP_ORDER.ADDRESS_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field5() {
        return ShopOrderTable.SHOP_ORDER.AMMOUNT;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field6() {
        return ShopOrderTable.SHOP_ORDER.STATE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Integer> field7() {
        return ShopOrderTable.SHOP_ORDER.ASSIGNED_PERSON_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field8() {
        return ShopOrderTable.SHOP_ORDER.SERVICE_COMMENT;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Timestamp> field9() {
        return ShopOrderTable.SHOP_ORDER.EDIT_DATE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer component1() {
        return getId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer component2() {
        return getShopId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer component3() {
        return getClientPersonId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer component4() {
        return getAddressId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long component5() {
        return getAmmount();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component6() {
        return getState();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer component7() {
        return getAssignedPersonId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component8() {
        return getServiceComment();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Timestamp component9() {
        return getEditDate();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer value1() {
        return getId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer value2() {
        return getShopId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer value3() {
        return getClientPersonId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer value4() {
        return getAddressId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value5() {
        return getAmmount();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value6() {
        return getState();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer value7() {
        return getAssignedPersonId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value8() {
        return getServiceComment();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Timestamp value9() {
        return getEditDate();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value1(Integer value) {
        setId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value2(Integer value) {
        setShopId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value3(Integer value) {
        setClientPersonId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value4(Integer value) {
        setAddressId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value5(Long value) {
        setAmmount(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value6(String value) {
        setState(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value7(Integer value) {
        setAssignedPersonId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value8(String value) {
        setServiceComment(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value9(Timestamp value) {
        setEditDate(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord values(Integer value1, Integer value2, Integer value3, Integer value4, Long value5, String value6, Integer value7, String value8, Timestamp value9) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        value6(value6);
        value7(value7);
        value8(value8);
        value9(value9);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached ShopOrderRecord
     */
    public ShopOrderRecord() {
        super(ShopOrderTable.SHOP_ORDER);
    }

    /**
     * Create a detached, initialised ShopOrderRecord
     */
    public ShopOrderRecord(Integer id, Integer shopId, Integer clientPersonId, Integer addressId, Long ammount, String state, Integer assignedPersonId, String serviceComment, Timestamp editDate) {
        super(ShopOrderTable.SHOP_ORDER);

        set(0, id);
        set(1, shopId);
        set(2, clientPersonId);
        set(3, addressId);
        set(4, ammount);
        set(5, state);
        set(6, assignedPersonId);
        set(7, serviceComment);
        set(8, editDate);
    }
}
