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

import ru.rich.matshop.db.converters.SqlDateConverter;
import ru.rich.matshop.db.converters.TimestampConverter;
import ru.rich.matshop.db.model.Indexes;
import ru.rich.matshop.db.model.Keys;
import ru.rich.matshop.db.model.Matshop;
import ru.rich.matshop.db.model.tables.records.PersonRecord;


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
public class PersonTable extends TableImpl<PersonRecord> {

    private static final long serialVersionUID = -76292916;

    /**
     * The reference instance of <code>matshop.person</code>
     */
    public static final PersonTable PERSON = new PersonTable();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<PersonRecord> getRecordType() {
        return PersonRecord.class;
    }

    /**
     * The column <code>matshop.person.id</code>.
     */
    public final TableField<PersonRecord, Long> ID = createField("id", org.jooq.impl.SQLDataType.BIGINT.nullable(false).defaultValue(org.jooq.impl.DSL.field("nextval('person_id_seq'::regclass)", org.jooq.impl.SQLDataType.BIGINT)), this, "");

    /**
     * The column <code>matshop.person.email</code>.
     */
    public final TableField<PersonRecord, String> EMAIL = createField("email", org.jooq.impl.SQLDataType.VARCHAR(200), this, "");

    /**
     * The column <code>matshop.person.password</code>.
     */
    public final TableField<PersonRecord, String> PASSWORD = createField("password", org.jooq.impl.SQLDataType.VARCHAR(1000), this, "");

    /**
     * The column <code>matshop.person.phone</code>.
     */
    public final TableField<PersonRecord, String> PHONE = createField("phone", org.jooq.impl.SQLDataType.VARCHAR(100), this, "");

    /**
     * The column <code>matshop.person.first_name</code>.
     */
    public final TableField<PersonRecord, String> FIRST_NAME = createField("first_name", org.jooq.impl.SQLDataType.VARCHAR(100), this, "");

    /**
     * The column <code>matshop.person.last_name</code>.
     */
    public final TableField<PersonRecord, String> LAST_NAME = createField("last_name", org.jooq.impl.SQLDataType.VARCHAR(100), this, "");

    /**
     * The column <code>matshop.person.date_of_birth</code>.
     */
    public final TableField<PersonRecord, Date> DATE_OF_BIRTH = createField("date_of_birth", org.jooq.impl.SQLDataType.DATE, this, "", new SqlDateConverter());

    /**
     * The column <code>matshop.person.sex</code>.
     */
    public final TableField<PersonRecord, String> SEX = createField("sex", org.jooq.impl.SQLDataType.CHAR(1), this, "");

    /**
     * The column <code>matshop.person.agreement_checked</code>.
     */
    public final TableField<PersonRecord, Boolean> AGREEMENT_CHECKED = createField("agreement_checked", org.jooq.impl.SQLDataType.BOOLEAN.nullable(false), this, "");

    /**
     * The column <code>matshop.person.locked</code>.
     */
    public final TableField<PersonRecord, Boolean> LOCKED = createField("locked", org.jooq.impl.SQLDataType.BOOLEAN.nullable(false).defaultValue(org.jooq.impl.DSL.field("false", org.jooq.impl.SQLDataType.BOOLEAN)), this, "");

    /**
     * The column <code>matshop.person.role</code>.
     */
    public final TableField<PersonRecord, String> ROLE = createField("role", org.jooq.impl.SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>matshop.person.last_visit</code>.
     */
    public final TableField<PersonRecord, Date> LAST_VISIT = createField("last_visit", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false), this, "", new TimestampConverter());

    /**
     * The column <code>matshop.person.edit_date</code>.
     */
    public final TableField<PersonRecord, Date> EDIT_DATE = createField("edit_date", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false), this, "", new TimestampConverter());

    /**
     * Create a <code>matshop.person</code> table reference
     */
    public PersonTable() {
        this(DSL.name("person"), null);
    }

    /**
     * Create an aliased <code>matshop.person</code> table reference
     */
    public PersonTable(String alias) {
        this(DSL.name(alias), PERSON);
    }

    /**
     * Create an aliased <code>matshop.person</code> table reference
     */
    public PersonTable(Name alias) {
        this(alias, PERSON);
    }

    private PersonTable(Name alias, Table<PersonRecord> aliased) {
        this(alias, aliased, null);
    }

    private PersonTable(Name alias, Table<PersonRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""));
    }

    public <O extends Record> PersonTable(Table<O> child, ForeignKey<O, PersonRecord> key) {
        super(child, key, PERSON);
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
        return Arrays.<Index>asList(Indexes.IDX_PER_EMAIL, Indexes.IDX_PER_PHONE, Indexes.PERSON_PKEY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Identity<PersonRecord, Long> getIdentity() {
        return Keys.IDENTITY_PERSON;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UniqueKey<PersonRecord> getPrimaryKey() {
        return Keys.PERSON_PKEY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<PersonRecord>> getKeys() {
        return Arrays.<UniqueKey<PersonRecord>>asList(Keys.PERSON_PKEY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PersonTable as(String alias) {
        return new PersonTable(DSL.name(alias), this);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PersonTable as(Name alias) {
        return new PersonTable(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public PersonTable rename(String name) {
        return new PersonTable(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public PersonTable rename(Name name) {
        return new PersonTable(name, null);
    }
}
