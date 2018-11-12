package ru.rich.matshop.db.converters;

import org.jooq.Converter;

import java.util.Date;

/**
 * Конвертер {@code java.sql.Date} в {@code java.util.Date}
 */
public class SqlDateConverter implements Converter<java.sql.Date, Date> {
    @Override
    public Date from(java.sql.Date date) {
        if (date == null) {
            return null;
        }
        return new Date(date.getTime());
    }

    @Override
    public java.sql.Date to(Date date) {
        if (date == null) {
            return null;
        }
        return new java.sql.Date(date.getTime());
    }

    @Override
    public Class<java.sql.Date> fromType() {
        return java.sql.Date.class;
    }

    @Override
    public Class<Date> toType() {
        return Date.class;
    }
}
