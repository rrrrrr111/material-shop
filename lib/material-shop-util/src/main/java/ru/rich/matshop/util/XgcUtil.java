package ru.rich.matshop.util;

import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeConstants;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * Conversion of {@code XMLGregorianCalendar} to {@code Date} and vice versa
 * <p/>
 * <p/>
 * <p/>
 * Created by Roman Churganov on 04.03.2015.
 */
public class XgcUtil {

    private static DatatypeFactory df = null;

    static {
        try {
            df = DatatypeFactory.newInstance();
        } catch (DatatypeConfigurationException dce) {
            throw new IllegalStateException(
                    "Exception while obtaining DatatypeFactory instance", dce);
        }
    }


    public static XMLGregorianCalendar asXgc(String format, String value, boolean toDate) {
        if (value == null || value.trim().length() == 0) {
            return null;
        }
        try {
            return asXgc(new SimpleDateFormat(format).parse(value), toDate);
        } catch (ParseException e) {
            throw new RuntimeException(String.format("Wrong format : %s for value : %s", format, value), e);
        }
    }

    /**
     * Converts a java.util.Date into an instance of XMLGregorianCalendar
     *
     * @param date   Instance of java.util.Date or a null reference
     * @param toDate if true, strips time and timezone
     * @return XMLGregorianCalendar instance whose value is based upon the
     * value in the date parameter. If the date parameter is null then
     * this method will simply return null.
     */
    public static XMLGregorianCalendar asXgc(java.util.Date date, boolean toDate) {
        if (date == null) {
            return null;
        } else {
            GregorianCalendar gc = new GregorianCalendar();
            gc.setTimeInMillis(date.getTime());
            XMLGregorianCalendar xgc = df.newXMLGregorianCalendar(gc);
            if (toDate) {
                xgc.setTimezone(DatatypeConstants.FIELD_UNDEFINED);
                xgc.setTime(DatatypeConstants.FIELD_UNDEFINED,
                        DatatypeConstants.FIELD_UNDEFINED,
                        DatatypeConstants.FIELD_UNDEFINED);
            }
            return xgc;
        }
    }

    /**
     * Creates an instance of XMLGregorianCalendar
     *
     * @param year       the value used to set the <code>YEAR</code> calendar field in the calendar.
     * @param month      the value used to set the <code>MONTH</code> calendar field in the calendar.
     *                   Month value is 0-based. e.g., 0 for January.
     * @param dayOfMonth the value used to set the <code>DAY_OF_MONTH</code> calendar field in the calendar.
     * @return XMLGregorianCalendar instance whose value is based upon the
     * value in the date parameter. If the date parameter is null then
     * this method will simply return null.
     */
    public static XMLGregorianCalendar asXgc(int year, int month, int dayOfMonth) {
        return asXgc(year, month, dayOfMonth, false);
    }

    /**
     * Creates an instance of XMLGregorianCalendar
     *
     * @param year       the value used to set the <code>YEAR</code> calendar field in the calendar.
     * @param month      the value used to set the <code>MONTH</code> calendar field in the calendar.
     *                   Month value is 0-based. e.g., 0 for January.
     * @param dayOfMonth the value used to set the <code>DAY_OF_MONTH</code> calendar field in the calendar.
     * @param toDate     if true, truncates all minor then date data to conform XML date format
     * @return XMLGregorianCalendar instance whose value is based upon the
     * value in the date parameter. If the date parameter is null then
     * this method will simply return null.
     */
    public static XMLGregorianCalendar asXgc(int year, int month, int dayOfMonth, boolean toDate) {
        GregorianCalendar gc = new GregorianCalendar(year, month, dayOfMonth);
        XMLGregorianCalendar xgc = df.newXMLGregorianCalendar(gc);
        if (toDate) {
            xgc.setTimezone(DatatypeConstants.FIELD_UNDEFINED);
            xgc.setTime(DatatypeConstants.FIELD_UNDEFINED,
                    DatatypeConstants.FIELD_UNDEFINED,
                    DatatypeConstants.FIELD_UNDEFINED);
        }
        return xgc;
    }

    public static XMLGregorianCalendar getCurrentXgcDateTime() {
        return asXgc(new Date(), false);
    }

    public static XMLGregorianCalendar getCurrentXgcDate() {
        return asXgc(new Date(), true);
    }

    /**
     * Creates an instance of XMLGregorianCalendar
     *
     * @return XMLGregorianCalendar instance whose value is based upon the current time
     */
    public static XMLGregorianCalendar getCurrentXgcTime() {
        Date date = new Date();
        GregorianCalendar gc = new GregorianCalendar();
        gc.setTimeInMillis(date.getTime());
        return df.newXMLGregorianCalendarTime(
                gc.get(Calendar.HOUR_OF_DAY),
                gc.get(Calendar.MINUTE),
                gc.get(Calendar.SECOND),
                DatatypeConstants.FIELD_UNDEFINED
        );
    }

    /**
     * Converts an XMLGregorianCalendar to an instance of java.util.Date
     *
     * @param xgc Instance of XMLGregorianCalendar or a null reference
     * @return java.util.Date instance whose value is based upon the
     * value in the xgc parameter. If the xgc parameter is null then
     * this method will simply return null.
     */
    public static java.util.Date asDate(XMLGregorianCalendar xgc) {
        if (xgc == null) {
            return null;
        } else {
            return xgc.toGregorianCalendar().getTime();
        }
    }

    /**
     * Converts an XMLGregorianCalendar to an instance of java.sql.Timestamp
     *
     * @param xgc Instance of XMLGregorianCalendar or a null reference
     * @return java.sql.Timestamp instance whose value is based upon the
     * value in the xgc parameter. If the xgc parameter is null then
     * this method will simply return null.
     */
    public static Timestamp asTimestamp(XMLGregorianCalendar xgc) {
        if (xgc == null) {
            return null;
        } else {
            return new Timestamp(xgc.toGregorianCalendar().getTimeInMillis());
        }
    }
}
