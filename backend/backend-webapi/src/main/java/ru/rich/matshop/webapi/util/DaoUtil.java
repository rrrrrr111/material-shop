package ru.rich.matshop.webapi.util;

import org.apache.commons.lang3.StringUtils;
import org.jooq.Field;
import org.jooq.OrderField;
import org.jooq.Table;
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

    public static OrderField<?> asOrderField(String sorting, Table table) {
        if (StringUtils.isBlank(sorting)) {
            return table.field("id").desc();
        }
        String[] parts = sorting.trim().toLowerCase().split("[\\s]+");
        Field field = table.field(parts[0]);
        if (parts.length > 1) {
            String last = parts[parts.length - 1];
            if ("desc".equals(last)) {
                return field.desc();
            } else if ("asc".equals(last)) {
                return field.asc();
            }
        }
        return field;
    }
}
