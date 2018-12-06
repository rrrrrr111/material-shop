/*
 * This file is generated by jOOQ.
 */
package ru.rich.matshop.db.model.tables.records;


import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record5;
import org.jooq.Row5;
import org.jooq.impl.UpdatableRecordImpl;

import ru.rich.matshop.db.model.tables.PTestTable;


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
public class PTestRecord extends UpdatableRecordImpl<PTestRecord> implements Record5<Long, Long, String, Long, Long> {

    private static final long serialVersionUID = 851118036;

    /**
     * Setter for <code>matshop.p_test.product_id</code>.
     */
    public void setProductId(Long value) {
        set(0, value);
    }

    /**
     * Getter for <code>matshop.p_test.product_id</code>.
     */
    public Long getProductId() {
        return (Long) get(0);
    }

    /**
     * Setter for <code>matshop.p_test.price</code>.
     */
    public void setPrice(Long value) {
        set(1, value);
    }

    /**
     * Getter for <code>matshop.p_test.price</code>.
     */
    public Long getPrice() {
        return (Long) get(1);
    }

    /**
     * Setter for <code>matshop.p_test.discount</code>.
     */
    public void setDiscount(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>matshop.p_test.discount</code>.
     */
    public String getDiscount() {
        return (String) get(2);
    }

    /**
     * Setter for <code>matshop.p_test.popularity</code>.
     */
    public void setPopularity(Long value) {
        set(3, value);
    }

    /**
     * Getter for <code>matshop.p_test.popularity</code>.
     */
    public Long getPopularity() {
        return (Long) get(3);
    }

    /**
     * Setter for <code>matshop.p_test.brand</code>.
     */
    public void setBrand(Long value) {
        set(4, value);
    }

    /**
     * Getter for <code>matshop.p_test.brand</code>.
     */
    public Long getBrand() {
        return (Long) get(4);
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
    // Record5 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row5<Long, Long, String, Long, Long> fieldsRow() {
        return (Row5) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row5<Long, Long, String, Long, Long> valuesRow() {
        return (Row5) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field1() {
        return PTestTable.P_TEST.PRODUCT_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field2() {
        return PTestTable.P_TEST.PRICE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field3() {
        return PTestTable.P_TEST.DISCOUNT;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field4() {
        return PTestTable.P_TEST.POPULARITY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field5() {
        return PTestTable.P_TEST.BRAND;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long component1() {
        return getProductId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long component2() {
        return getPrice();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component3() {
        return getDiscount();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long component4() {
        return getPopularity();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long component5() {
        return getBrand();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value1() {
        return getProductId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value2() {
        return getPrice();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value3() {
        return getDiscount();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value4() {
        return getPopularity();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value5() {
        return getBrand();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PTestRecord value1(Long value) {
        setProductId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PTestRecord value2(Long value) {
        setPrice(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PTestRecord value3(String value) {
        setDiscount(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PTestRecord value4(Long value) {
        setPopularity(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PTestRecord value5(Long value) {
        setBrand(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PTestRecord values(Long value1, Long value2, String value3, Long value4, Long value5) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached PTestRecord
     */
    public PTestRecord() {
        super(PTestTable.P_TEST);
    }

    /**
     * Create a detached, initialised PTestRecord
     */
    public PTestRecord(Long productId, Long price, String discount, Long popularity, Long brand) {
        super(PTestTable.P_TEST);

        set(0, productId);
        set(1, price);
        set(2, discount);
        set(3, popularity);
        set(4, brand);
    }
}