package ru.rich.matshop.util;

import org.apache.commons.lang3.ClassUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;

import java.util.List;

/**
 * Утилитыне методы для работы с исключениями
 */
public final class ExceptionUtil {

    private ExceptionUtil() {
        // never instantiate this class
    }

    /**
     * Формирует единый текст из всех вложенных исключений
     */
    public static String getAllErrorMessage(Throwable ex) {
        final StringBuilder sb = new StringBuilder();
        final List<Throwable> errors = ExceptionUtils.getThrowableList(ex);
        for (Throwable e : errors) {
            String msg = ExceptionUtils.getMessage(e);
            if (sb.indexOf(msg) < 0) {
                sb.append(msg).append(" : ");
            }
        }
        return sb.length() > 3
                ? sb.substring(0, sb.length() - 3)
                : sb.toString();
    }

    /**
     * Ищет исключение указанного типа среди вложенных, наследники игнорируются
     */
    public static <T extends Throwable> T findExactException(Throwable t, Class<T> causeClass) {
        final int idx = ExceptionUtils.indexOfThrowable(t, causeClass);
        if (idx > -1) {
            return (T) ExceptionUtils.getThrowables(t)[idx];
        }
        return null;
    }

    /**
     * Ищет исключение указанного типа среди вложенных, наследники также учитываются
     */
    public static <T extends Throwable> T findExceptionOfType(Throwable t, Class<T> causeClass) {
        final int idx = ExceptionUtils.indexOfType(t, causeClass);
        if (idx > -1) {
            return (T) ExceptionUtils.getThrowables(t)[idx];
        }
        return null;
    }

    /**
     * Получение текста сообщения из переданного исключения.
     *
     * @param e исключение из которого нужно извлечь текст сообщения
     * @return Если у исключения есть описание, возвращается оно, если его нет то вернётся класс исключения без пакета.<br>
     * Если параметр null, вернется пустая строка.
     */
    public static String getMessage(Exception e) {
        if (e == null) {
            return "";
        }
        return e.getMessage() != null ? e.getMessage() : ClassUtils.getShortClassName(e.getClass());
    }
}
