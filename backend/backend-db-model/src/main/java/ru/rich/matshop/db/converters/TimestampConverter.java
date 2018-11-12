package ru.rich.matshop.db.converters;

import org.jooq.Converter;

import java.sql.Timestamp;
import java.util.Date;

/**
 * Конвертер {@code java.sql.Timestamp} в {@code java.util.Date}
 */
public class TimestampConverter implements Converter<Timestamp, Date> {

    @Override
    public Date from(Timestamp ts) {
        if (ts == null) {
            return null;
        }
        return new Date(ts.getTime());
    }

    @Override
    public Timestamp to(Date date) {
        if (date == null) {
            return null;
        }
        return new Timestamp(date.getTime());
    }

    @Override
    public Class<Timestamp> fromType() {
        return Timestamp.class;
    }

    @Override
    public Class<Date> toType() {
        return Date.class;
    }
}
