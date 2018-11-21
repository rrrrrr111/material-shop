package ru.rich.matshop.webapi.util;

import org.springframework.util.Assert;

/**
 * Утилитыне методы для DAO
 */
public class DaoUtil {

    public static void isOne(int res) {
        Assert.isTrue(res == 1, "Result must be 1, but got " + res);
    }
}
