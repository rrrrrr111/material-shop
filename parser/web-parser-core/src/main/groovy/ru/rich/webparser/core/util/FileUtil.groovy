package ru.rich.webparser.core.util

import org.apache.commons.io.IOUtils
import org.apache.commons.lang3.StringUtils
import org.springframework.core.io.ClassPathResource

import java.nio.charset.Charset
import java.nio.charset.StandardCharsets
import java.nio.file.Paths

/**
 * Утилиты для работы с файлами
 */
class FileUtil {

    /**
     * Ищет файл в проекте
     */
    static String findFile(String basePath) {
        if (new File(basePath).exists()) {
            return basePath
        }
        if (StringUtils.countMatches(basePath, "../") > 5) {
            throw new RuntimeException(String.format("File %s not found", basePath))
        }
        return findFile("../" + basePath)
    }

    static String toAbsolutePath(String filePath) {
        Paths.get(filePath).toAbsolutePath().toString()
    }
    /**
     * Загрузка файла из Classpath в UTF-8
     */
    static String readClasspathFile(String pathName) {
        return readClasspathFile(pathName, StandardCharsets.UTF_8)
    }

    /**
     * Загрузка файла из Classpath в указанной кодировке
     */
    static String readClasspathFile(String pathName, Charset charset) {
        def is = new ClassPathResource(pathName).getInputStream()
        return IOUtils.toString(is, charset)
    }
}
