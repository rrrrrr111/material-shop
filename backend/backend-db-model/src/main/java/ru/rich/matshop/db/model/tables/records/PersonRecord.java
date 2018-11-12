/*
 * This file is generated by jOOQ.
 */
package ru.rich.matshop.db.model.tables.records;


import java.util.Date;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record10;
import org.jooq.Row10;
import org.jooq.impl.UpdatableRecordImpl;

import ru.rich.matshop.db.model.tables.PersonTable;


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
public class PersonRecord extends UpdatableRecordImpl<PersonRecord> implements Record10<Long, String, String, String, String, String, Date, String, Boolean, Date> {

    private static final long serialVersionUID = -1189212670;

    /**
     * Setter for <code>matshop.person.id</code>.
     */
    public void setId(Long value) {
        set(0, value);
    }

    /**
     * Getter for <code>matshop.person.id</code>.
     */
    public Long getId() {
        return (Long) get(0);
    }

    /**
     * Setter for <code>matshop.person.email</code>.
     */
    public void setEmail(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>matshop.person.email</code>.
     */
    public String getEmail() {
        return (String) get(1);
    }

    /**
     * Setter for <code>matshop.person.password</code>.
     */
    public void setPassword(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>matshop.person.password</code>.
     */
    public String getPassword() {
        return (String) get(2);
    }

    /**
     * Setter for <code>matshop.person.phone</code>.
     */
    public void setPhone(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>matshop.person.phone</code>.
     */
    public String getPhone() {
        return (String) get(3);
    }

    /**
     * Setter for <code>matshop.person.first_name</code>.
     */
    public void setFirstName(String value) {
        set(4, value);
    }

    /**
     * Getter for <code>matshop.person.first_name</code>.
     */
    public String getFirstName() {
        return (String) get(4);
    }

    /**
     * Setter for <code>matshop.person.last_name</code>.
     */
    public void setLastName(String value) {
        set(5, value);
    }

    /**
     * Getter for <code>matshop.person.last_name</code>.
     */
    public String getLastName() {
        return (String) get(5);
    }

    /**
     * Setter for <code>matshop.person.date_of_birth</code>.
     */
    public void setDateOfBirth(Date value) {
        set(6, value);
    }

    /**
     * Getter for <code>matshop.person.date_of_birth</code>.
     */
    public Date getDateOfBirth() {
        return (Date) get(6);
    }

    /**
     * Setter for <code>matshop.person.sex</code>.
     */
    public void setSex(String value) {
        set(7, value);
    }

    /**
     * Getter for <code>matshop.person.sex</code>.
     */
    public String getSex() {
        return (String) get(7);
    }

    /**
     * Setter for <code>matshop.person.agreement_checked</code>.
     */
    public void setAgreementChecked(Boolean value) {
        set(8, value);
    }

    /**
     * Getter for <code>matshop.person.agreement_checked</code>.
     */
    public Boolean getAgreementChecked() {
        return (Boolean) get(8);
    }

    /**
     * Setter for <code>matshop.person.edit_date</code>.
     */
    public void setEditDate(Date value) {
        set(9, value);
    }

    /**
     * Getter for <code>matshop.person.edit_date</code>.
     */
    public Date getEditDate() {
        return (Date) get(9);
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
    // Record10 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row10<Long, String, String, String, String, String, Date, String, Boolean, Date> fieldsRow() {
        return (Row10) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row10<Long, String, String, String, String, String, Date, String, Boolean, Date> valuesRow() {
        return (Row10) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field1() {
        return PersonTable.PERSON.ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return PersonTable.PERSON.EMAIL;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field3() {
        return PersonTable.PERSON.PASSWORD;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field4() {
        return PersonTable.PERSON.PHONE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field5() {
        return PersonTable.PERSON.FIRST_NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field6() {
        return PersonTable.PERSON.LAST_NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Date> field7() {
        return PersonTable.PERSON.DATE_OF_BIRTH;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field8() {
        return PersonTable.PERSON.SEX;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Boolean> field9() {
        return PersonTable.PERSON.AGREEMENT_CHECKED;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Date> field10() {
        return PersonTable.PERSON.EDIT_DATE;
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
        return getEmail();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component3() {
        return getPassword();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component4() {
        return getPhone();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component5() {
        return getFirstName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component6() {
        return getLastName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Date component7() {
        return getDateOfBirth();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component8() {
        return getSex();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean component9() {
        return getAgreementChecked();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Date component10() {
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
    public String value2() {
        return getEmail();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value3() {
        return getPassword();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value4() {
        return getPhone();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value5() {
        return getFirstName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value6() {
        return getLastName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Date value7() {
        return getDateOfBirth();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value8() {
        return getSex();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean value9() {
        return getAgreementChecked();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Date value10() {
        return getEditDate();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PersonRecord value1(Long value) {
        setId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PersonRecord value2(String value) {
        setEmail(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PersonRecord value3(String value) {
        setPassword(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PersonRecord value4(String value) {
        setPhone(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PersonRecord value5(String value) {
        setFirstName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PersonRecord value6(String value) {
        setLastName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PersonRecord value7(Date value) {
        setDateOfBirth(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PersonRecord value8(String value) {
        setSex(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PersonRecord value9(Boolean value) {
        setAgreementChecked(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PersonRecord value10(Date value) {
        setEditDate(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PersonRecord values(Long value1, String value2, String value3, String value4, String value5, String value6, Date value7, String value8, Boolean value9, Date value10) {
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
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached PersonRecord
     */
    public PersonRecord() {
        super(PersonTable.PERSON);
    }

    /**
     * Create a detached, initialised PersonRecord
     */
    public PersonRecord(Long id, String email, String password, String phone, String firstName, String lastName, Date dateOfBirth, String sex, Boolean agreementChecked, Date editDate) {
        super(PersonTable.PERSON);

        set(0, id);
        set(1, email);
        set(2, password);
        set(3, phone);
        set(4, firstName);
        set(5, lastName);
        set(6, dateOfBirth);
        set(7, sex);
        set(8, agreementChecked);
        set(9, editDate);
    }
}