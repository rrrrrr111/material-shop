/*
 * This file is generated by jOOQ.
 */
package ru.rich.matshop.db.model.tables;


import java.util.Arrays;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.ForeignKey;
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
import ru.rich.matshop.db.model.tables.records.PTestRecord;


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
public class PTestTable extends TableImpl<PTestRecord> {

    private static final long serialVersionUID = -2102400464;

    /**
     * The reference instance of <code>matshop.p_test</code>
     */
    public static final PTestTable P_TEST = new PTestTable();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<PTestRecord> getRecordType() {
        return PTestRecord.class;
    }

    /**
     * The column <code>matshop.p_test.product_id</code>.
     */
    public final TableField<PTestRecord, Long> PRODUCT_ID = createField("product_id", org.jooq.impl.SQLDataType.BIGINT.nullable(false), this, "");

    /**
     * The column <code>matshop.p_test.price</code>.
     */
    public final TableField<PTestRecord, Long> PRICE = createField("price", org.jooq.impl.SQLDataType.BIGINT.nullable(false), this, "");

    /**
     * The column <code>matshop.p_test.discount</code>.
     */
    public final TableField<PTestRecord, String> DISCOUNT = createField("discount", org.jooq.impl.SQLDataType.VARCHAR(100), this, "");

    /**
     * The column <code>matshop.p_test.popularity</code>.
     */
    public final TableField<PTestRecord, Long> POPULARITY = createField("popularity", org.jooq.impl.SQLDataType.BIGINT.nullable(false).defaultValue(org.jooq.impl.DSL.field("0", org.jooq.impl.SQLDataType.BIGINT)), this, "");

    /**
     * The column <code>matshop.p_test.brand</code>.
     */
    public final TableField<PTestRecord, Long> BRAND = createField("brand", org.jooq.impl.SQLDataType.BIGINT.nullable(false), this, "");

    /**
     * Create a <code>matshop.p_test</code> table reference
     */
    public PTestTable() {
        this(DSL.name("p_test"), null);
    }

    /**
     * Create an aliased <code>matshop.p_test</code> table reference
     */
    public PTestTable(String alias) {
        this(DSL.name(alias), P_TEST);
    }

    /**
     * Create an aliased <code>matshop.p_test</code> table reference
     */
    public PTestTable(Name alias) {
        this(alias, P_TEST);
    }

    private PTestTable(Name alias, Table<PTestRecord> aliased) {
        this(alias, aliased, null);
    }

    private PTestTable(Name alias, Table<PTestRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""));
    }

    public <O extends Record> PTestTable(Table<O> child, ForeignKey<O, PTestRecord> key) {
        super(child, key, P_TEST);
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
        return Arrays.<Index>asList(Indexes.IDX_PTS_CATEGORY, Indexes.IDX_PTS_NAME, Indexes.IDX_PTS_POPULARITY, Indexes.IDX_PTS_PRICE, Indexes.P_TEST_PKEY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UniqueKey<PTestRecord> getPrimaryKey() {
        return Keys.P_TEST_PKEY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<PTestRecord>> getKeys() {
        return Arrays.<UniqueKey<PTestRecord>>asList(Keys.P_TEST_PKEY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<ForeignKey<PTestRecord, ?>> getReferences() {
        return Arrays.<ForeignKey<PTestRecord, ?>>asList(Keys.P_TEST__P_TEST_PRODUCT_ID_FKEY);
    }

    public ProductTable product() {
        return new ProductTable(this, Keys.P_TEST__P_TEST_PRODUCT_ID_FKEY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PTestTable as(String alias) {
        return new PTestTable(DSL.name(alias), this);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PTestTable as(Name alias) {
        return new PTestTable(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public PTestTable rename(String name) {
        return new PTestTable(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public PTestTable rename(Name name) {
        return new PTestTable(name, null);
    }
}