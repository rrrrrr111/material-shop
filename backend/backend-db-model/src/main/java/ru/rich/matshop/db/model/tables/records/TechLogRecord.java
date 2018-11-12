/*
 * This file is generated by jOOQ.
 */
package ru.rich.matshop.db.model.tables.records;


import java.util.Date;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record5;
import org.jooq.Row5;
import org.jooq.impl.UpdatableRecordImpl;

import ru.rich.matshop.db.model.tables.TechLogTable;


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
public class TechLogRecord extends UpdatableRecordImpl<TechLogRecord> implements Record5<Long, String, Long, String, Date> {

    private static final long serialVersionUID = 1178309883;

    /**
     * Setter for <code>matshop.tech_log.id</code>.
     */
    public void setId(Long value) {
        set(0, value);
    }

    /**
     * Getter for <code>matshop.tech_log.id</code>.
     */
    public Long getId() {
        return (Long) get(0);
    }

    /**
     * Setter for <code>matshop.tech_log.type</code>.
     */
    public void setType(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>matshop.tech_log.type</code>.
     */
    public String getType() {
        return (String) get(1);
    }

    /**
     * Setter for <code>matshop.tech_log.object_id</code>.
     */
    public void setObjectId(Long value) {
        set(2, value);
    }

    /**
     * Getter for <code>matshop.tech_log.object_id</code>.
     */
    public Long getObjectId() {
        return (Long) get(2);
    }

    /**
     * Setter for <code>matshop.tech_log.data</code>.
     */
    public void setData(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>matshop.tech_log.data</code>.
     */
    public String getData() {
        return (String) get(3);
    }

    /**
     * Setter for <code>matshop.tech_log.event_date</code>.
     */
    public void setEventDate(Date value) {
        set(4, value);
    }

    /**
     * Getter for <code>matshop.tech_log.event_date</code>.
     */
    public Date getEventDate() {
        return (Date) get(4);
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
    public Row5<Long, String, Long, String, Date> fieldsRow() {
        return (Row5) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row5<Long, String, Long, String, Date> valuesRow() {
        return (Row5) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field1() {
        return TechLogTable.TECH_LOG.ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return TechLogTable.TECH_LOG.TYPE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field3() {
        return TechLogTable.TECH_LOG.OBJECT_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field4() {
        return TechLogTable.TECH_LOG.DATA;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Date> field5() {
        return TechLogTable.TECH_LOG.EVENT_DATE;
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
    public String component2() {
        return getType();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long component3() {
        return getObjectId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component4() {
        return getData();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Date component5() {
        return getEventDate();
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
    public String value2() {
        return getType();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value3() {
        return getObjectId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value4() {
        return getData();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Date value5() {
        return getEventDate();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TechLogRecord value1(Long value) {
        setId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TechLogRecord value2(String value) {
        setType(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TechLogRecord value3(Long value) {
        setObjectId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TechLogRecord value4(String value) {
        setData(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TechLogRecord value5(Date value) {
        setEventDate(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TechLogRecord values(Long value1, String value2, Long value3, String value4, Date value5) {
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
     * Create a detached TechLogRecord
     */
    public TechLogRecord() {
        super(TechLogTable.TECH_LOG);
    }

    /**
     * Create a detached, initialised TechLogRecord
     */
    public TechLogRecord(Long id, String type, Long objectId, String data, Date eventDate) {
        super(TechLogTable.TECH_LOG);

        set(0, id);
        set(1, type);
        set(2, objectId);
        set(3, data);
        set(4, eventDate);
    }
}