package ru.rich.matshop.util;

import com.google.common.base.Preconditions;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.util.Date;

/**
 * Утилитыне методы для работы с файлами
 */
public class FileUtil {

    private static final String PREFIX = "%1$s_";
    private static final String DATE_WITH_TIME = "%2$tY-%2$tm-%2$td_%2$tH-%2$tM-%2$tS";
    private static final String SUFFIX = "_%3$s";
    private static final String EXTENSION = ".%4$s";

    private FileUtil() {
    }

    /**
     * Проверяет существует ли файл и доступен ли для чтения
     */
    public static String checkFileForRead(File f, boolean throwException) {
        try {
            String errMess = null;
            if (!f.exists()) {
                errMess = String.format("File %s not available", f.getPath());
            } else if (f.isDirectory()) {
                errMess = String.format("File %s is directory", f.getPath());
            } else if (!f.canRead()) {
                errMess = String.format("File %s cannot be read", f.getPath());
            }
            if (errMess != null && throwException) {
                throw new RuntimeException(errMess);
            }
            return errMess;
        } catch (Exception ex) {
            if (throwException) {
                throw ex;
            }
            return ex.getMessage();
        }
    }

    /**
     * Проверяет существует ли папка и доступна ли для чтения
     */
    public static String checkDirForRead(File d, boolean throwException) {
        try {
            String errMess = null;
            if (!d.exists()) {
                errMess = String.format("Directory %s not available", d.getPath());
            } else if (d.isFile()) {
                errMess = String.format("Directory %s is file", d.getPath());
            } else if (!d.canRead()) {
                errMess = String.format("Directory %s cannot be read", d.getPath());
            }
            if (errMess != null && throwException) {
                throw new RuntimeException(errMess);
            }
            return errMess;
        } catch (Exception ex) {
            if (throwException) {
                throw ex;
            }
            return ex.getMessage();
        }
    }

    /**
     * Создает папку
     */
    public static String createDir(File d, boolean throwException) {
        try {
            String errMess = null;
            if (d.exists() && d.isFile()) {
                errMess = String.format("Directory %s cannot be created " +
                        "because a file with the same name already exists", d.getPath());
            } else if (d.exists()) {
                return null;
            } else if (!d.mkdirs()) {
                errMess = String.format("Directory %s cannot be created", d.getPath());
            }
            if (throwException && errMess != null) {
                throw new RuntimeException(errMess);
            }
            return errMess;
        } catch (Exception ex) {
            if (throwException) throw ex;
            return ex.getMessage();
        }
    }

    public static String generateFileName(String prefix, String extension) {
        return generateFileName(prefix, new Date(), null, extension);
    }

    public static String generateFileName(String prefix, Date date, String extension) {
        return generateFileName(prefix, date, null, extension);
    }

    public static String generateFileName(String prefix, Date date, String suffix, String extension) {
        Preconditions.checkNotNull(date, "Дата не может быть null");

        String fileNameFormat = getFileNameFormat(prefix, suffix, extension);

        String lowerPrefix = prefix != null ? prefix.toLowerCase() : null;
        String lowerSuffix = suffix != null ? suffix.toLowerCase() : null;

        return String.format(fileNameFormat, lowerPrefix, date, lowerSuffix, extension);
    }

    /**
     * Формируем строку формата в зависимости от переданных значений
     *
     * @param prefix    префикс
     * @param extension расширение файла
     * @return формат строки для имени файла
     */
    private static String getFileNameFormat(String prefix, String suffix, String extension) {
        StringBuilder format = new StringBuilder(50);

        if (StringUtils.isNotBlank(prefix)) {
            format.append(PREFIX);
        }

        format.append(DATE_WITH_TIME);

        if (StringUtils.isNotBlank(suffix)) {
            format.append(SUFFIX);
        }

        if (StringUtils.isNotBlank(extension)) {
            format.append(EXTENSION);
        }

        return format.toString();
    }
}
