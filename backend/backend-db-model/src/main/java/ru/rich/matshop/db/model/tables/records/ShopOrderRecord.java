/*
 * This file is generated by jOOQ.
 */
package ru.rich.matshop.db.model.tables.records;


import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record15;
import org.jooq.Row15;
import org.jooq.impl.UpdatableRecordImpl;
import ru.rich.matshop.db.model.tables.ShopOrderTable;

import javax.annotation.Generated;
import java.util.Date;


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
public class ShopOrderRecord extends UpdatableRecordImpl<ShopOrderRecord> implements Record15<Long, Integer, Long, Long, Long, Long, Long, String, String, Long, String, String, String, Date, Date> {

    private static final long serialVersionUID = 891632377;

    /**
     * Setter for <code>matshop.shop_order.id</code>.
     */
    public void setId(Long value) {
        set(0, value);
    }

    /**
     * Getter for <code>matshop.shop_order.id</code>.
     */
    public Long getId() {
        return (Long) get(0);
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
    public void setClientPersonId(Long value) {
        set(2, value);
    }

    /**
     * Getter for <code>matshop.shop_order.client_person_id</code>.
     */
    public Long getClientPersonId() {
        return (Long) get(2);
    }

    /**
     * Setter for <code>matshop.shop_order.address_id</code>.
     */
    public void setAddressId(Long value) {
        set(3, value);
    }

    /**
     * Getter for <code>matshop.shop_order.address_id</code>.
     */
    public Long getAddressId() {
        return (Long) get(3);
    }

    /**
     * Setter for <code>matshop.shop_order.goods_amount</code>.
     */
    public void setGoodsAmount(Long value) {
        set(4, value);
    }

    /**
     * Getter for <code>matshop.shop_order.goods_amount</code>.
     */
    public Long getGoodsAmount() {
        return (Long) get(4);
    }

    /**
     * Setter for <code>matshop.shop_order.delivery_amount</code>.
     */
    public void setDeliveryAmount(Long value) {
        set(5, value);
    }

    /**
     * Getter for <code>matshop.shop_order.delivery_amount</code>.
     */
    public Long getDeliveryAmount() {
        return (Long) get(5);
    }

    /**
     * Setter for <code>matshop.shop_order.total_amount</code>.
     */
    public void setTotalAmount(Long value) {
        set(6, value);
    }

    /**
     * Getter for <code>matshop.shop_order.total_amount</code>.
     */
    public Long getTotalAmount() {
        return (Long) get(6);
    }

    /**
     * Setter for <code>matshop.shop_order.delivery_type</code>.
     */
    public void setDeliveryType(String value) {
        set(7, value);
    }

    /**
     * Getter for <code>matshop.shop_order.delivery_type</code>.
     */
    public String getDeliveryType() {
        return (String) get(7);
    }

    /**
     * Setter for <code>matshop.shop_order.state</code>.
     */
    public void setState(String value) {
        set(8, value);
    }

    /**
     * Getter for <code>matshop.shop_order.state</code>.
     */
    public String getState() {
        return (String) get(8);
    }

    /**
     * Setter for <code>matshop.shop_order.assigned_person_id</code>.
     */
    public void setAssignedPersonId(Long value) {
        set(9, value);
    }

    /**
     * Getter for <code>matshop.shop_order.assigned_person_id</code>.
     */
    public Long getAssignedPersonId() {
        return (Long) get(9);
    }

    /**
     * Setter for <code>matshop.shop_order.service_comment</code>.
     */
    public void setServiceComment(String value) {
        set(10, value);
    }

    /**
     * Getter for <code>matshop.shop_order.service_comment</code>.
     */
    public String getServiceComment() {
        return (String) get(10);
    }

    /**
     * Setter for <code>matshop.shop_order.payment_info</code>.
     */
    public void setPaymentInfo(String value) {
        set(11, value);
    }

    /**
     * Getter for <code>matshop.shop_order.payment_info</code>.
     */
    public String getPaymentInfo() {
        return (String) get(11);
    }

    /**
     * Setter for <code>matshop.shop_order.payment_type</code>.
     */
    public void setPaymentType(String value) {
        set(12, value);
    }

    /**
     * Getter for <code>matshop.shop_order.payment_type</code>.
     */
    public String getPaymentType() {
        return (String) get(12);
    }

    /**
     * Setter for <code>matshop.shop_order.create_date</code>.
     */
    public void setCreateDate(Date value) {
        set(13, value);
    }

    /**
     * Getter for <code>matshop.shop_order.create_date</code>.
     */
    public Date getCreateDate() {
        return (Date) get(13);
    }

    /**
     * Setter for <code>matshop.shop_order.edit_date</code>.
     */
    public void setEditDate(Date value) {
        set(14, value);
    }

    /**
     * Getter for <code>matshop.shop_order.edit_date</code>.
     */
    public Date getEditDate() {
        return (Date) get(14);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Record1<Long> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record15 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row15<Long, Integer, Long, Long, Long, Long, Long, String, String, Long, String, String, String, Date, Date> fieldsRow() {
        return (Row15) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row15<Long, Integer, Long, Long, Long, Long, Long, String, String, Long, String, String, String, Date, Date> valuesRow() {
        return (Row15) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field1() {
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
    public Field<Long> field3() {
        return ShopOrderTable.SHOP_ORDER.CLIENT_PERSON_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field4() {
        return ShopOrderTable.SHOP_ORDER.ADDRESS_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field5() {
        return ShopOrderTable.SHOP_ORDER.GOODS_AMOUNT;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field6() {
        return ShopOrderTable.SHOP_ORDER.DELIVERY_AMOUNT;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field7() {
        return ShopOrderTable.SHOP_ORDER.TOTAL_AMOUNT;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field8() {
        return ShopOrderTable.SHOP_ORDER.DELIVERY_TYPE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field9() {
        return ShopOrderTable.SHOP_ORDER.STATE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field10() {
        return ShopOrderTable.SHOP_ORDER.ASSIGNED_PERSON_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field11() {
        return ShopOrderTable.SHOP_ORDER.SERVICE_COMMENT;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field12() {
        return ShopOrderTable.SHOP_ORDER.PAYMENT_INFO;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field13() {
        return ShopOrderTable.SHOP_ORDER.PAYMENT_TYPE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Date> field14() {
        return ShopOrderTable.SHOP_ORDER.CREATE_DATE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Date> field15() {
        return ShopOrderTable.SHOP_ORDER.EDIT_DATE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long component1() {
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
    public Long component3() {
        return getClientPersonId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long component4() {
        return getAddressId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long component5() {
        return getGoodsAmount();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long component6() {
        return getDeliveryAmount();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long component7() {
        return getTotalAmount();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component8() {
        return getDeliveryType();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component9() {
        return getState();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long component10() {
        return getAssignedPersonId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component11() {
        return getServiceComment();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component12() {
        return getPaymentInfo();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component13() {
        return getPaymentType();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Date component14() {
        return getCreateDate();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Date component15() {
        return getEditDate();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value1() {
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
    public Long value3() {
        return getClientPersonId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value4() {
        return getAddressId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value5() {
        return getGoodsAmount();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value6() {
        return getDeliveryAmount();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value7() {
        return getTotalAmount();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value8() {
        return getDeliveryType();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value9() {
        return getState();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value10() {
        return getAssignedPersonId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value11() {
        return getServiceComment();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value12() {
        return getPaymentInfo();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value13() {
        return getPaymentType();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Date value14() {
        return getCreateDate();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Date value15() {
        return getEditDate();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value1(Long value) {
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
    public ShopOrderRecord value3(Long value) {
        setClientPersonId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value4(Long value) {
        setAddressId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value5(Long value) {
        setGoodsAmount(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value6(Long value) {
        setDeliveryAmount(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value7(Long value) {
        setTotalAmount(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value8(String value) {
        setDeliveryType(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value9(String value) {
        setState(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value10(Long value) {
        setAssignedPersonId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value11(String value) {
        setServiceComment(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value12(String value) {
        setPaymentInfo(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value13(String value) {
        setPaymentType(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value14(Date value) {
        setCreateDate(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord value15(Date value) {
        setEditDate(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopOrderRecord values(Long value1, Integer value2, Long value3, Long value4, Long value5, Long value6, Long value7, String value8, String value9, Long value10, String value11, String value12, String value13, Date value14, Date value15) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        value6(value6);
        value7(value7);
        value8(value8);
        value9(value9);
        value10(value10);
        value11(value11);
        value12(value12);
        value13(value13);
        value14(value14);
        value15(value15);
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
    public ShopOrderRecord(Long id, Integer shopId, Long clientPersonId, Long addressId, Long goodsAmount, Long deliveryAmount, Long totalAmount, String deliveryType, String state, Long assignedPersonId, String serviceComment, String paymentInfo, String paymentType, Date createDate, Date editDate) {
        super(ShopOrderTable.SHOP_ORDER);

        set(0, id);
        set(1, shopId);
        set(2, clientPersonId);
        set(3, addressId);
        set(4, goodsAmount);
        set(5, deliveryAmount);
        set(6, totalAmount);
        set(7, deliveryType);
        set(8, state);
        set(9, assignedPersonId);
        set(10, serviceComment);
        set(11, paymentInfo);
        set(12, paymentType);
        set(13, createDate);
        set(14, editDate);
    }
}
