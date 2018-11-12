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
import ru.rich.matshop.db.model.tables.records.TaskRecord;


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
public class TaskTable extends TableImpl<TaskRecord> {

    private static final long serialVersionUID = 1864155123;

    /**
     * The reference instance of <code>matshop.task</code>
     */
    public static final TaskTable TASK = new TaskTable();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<TaskRecord> getRecordType() {
        return TaskRecord.class;
    }

    /**
     * The column <code>matshop.task.id</code>.
     */
    public final TableField<TaskRecord, Long> ID = createField("id", org.jooq.impl.SQLDataType.BIGINT.nullable(false).defaultValue(org.jooq.impl.DSL.field("nextval('task_id_seq'::regclass)", org.jooq.impl.SQLDataType.BIGINT)), this, "");

    /**
     * The column <code>matshop.task.name</code>.
     */
    public final TableField<TaskRecord, String> NAME = createField("name", org.jooq.impl.SQLDataType.VARCHAR(1000).nullable(false), this, "");

    /**
     * The column <code>matshop.task.type</code>.
     */
    public final TableField<TaskRecord, String> TYPE = createField("type", org.jooq.impl.SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>matshop.task.state</code>.
     */
    public final TableField<TaskRecord, String> STATE = createField("state", org.jooq.impl.SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>matshop.task.last_data_date</code>.
     */
    public final TableField<TaskRecord, Date> LAST_DATA_DATE = createField("last_data_date", org.jooq.impl.SQLDataType.TIMESTAMP, this, "", new TimestampConverter());

    /**
     * The column <code>matshop.task.last_data_id</code>.
     */
    public final TableField<TaskRecord, Long> LAST_DATA_ID = createField("last_data_id", org.jooq.impl.SQLDataType.BIGINT, this, "");

    /**
     * The column <code>matshop.task.edit_date</code>.
     */
    public final TableField<TaskRecord, Date> EDIT_DATE = createField("edit_date", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false), this, "", new TimestampConverter());

    /**
     * Create a <code>matshop.task</code> table reference
     */
    public TaskTable() {
        this(DSL.name("task"), null);
    }

    /**
     * Create an aliased <code>matshop.task</code> table reference
     */
    public TaskTable(String alias) {
        this(DSL.name(alias), TASK);
    }

    /**
     * Create an aliased <code>matshop.task</code> table reference
     */
    public TaskTable(Name alias) {
        this(alias, TASK);
    }

    private TaskTable(Name alias, Table<TaskRecord> aliased) {
        this(alias, aliased, null);
    }

    private TaskTable(Name alias, Table<TaskRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""));
    }

    public <O extends Record> TaskTable(Table<O> child, ForeignKey<O, TaskRecord> key) {
        super(child, key, TASK);
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
        return Arrays.<Index>asList(Indexes.IDX_TSK_TS, Indexes.TASK_PKEY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Identity<TaskRecord, Long> getIdentity() {
        return Keys.IDENTITY_TASK;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UniqueKey<TaskRecord> getPrimaryKey() {
        return Keys.TASK_PKEY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<TaskRecord>> getKeys() {
        return Arrays.<UniqueKey<TaskRecord>>asList(Keys.TASK_PKEY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TaskTable as(String alias) {
        return new TaskTable(DSL.name(alias), this);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TaskTable as(Name alias) {
        return new TaskTable(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public TaskTable rename(String name) {
        return new TaskTable(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public TaskTable rename(Name name) {
        return new TaskTable(name, null);
    }
}