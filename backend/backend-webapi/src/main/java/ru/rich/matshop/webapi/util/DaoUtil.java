package ru.rich.matshop.webapi.util;

import ru.rich.matshop.webapi.api.common.rest.UserException;

/**
 * Утилитыне методы для DAO
 */
public class DaoUtil {

    public static void isOne(int res) {
        if (res != 1) {
            throw new UserException(
                    "Данные были изменены другим пользователем, обновите страницу и попробуйте еще раз",
                    String.format(
                            "Concurrent modification exception, expected 1 record to update but got: %s", res));
        }
    }
}
