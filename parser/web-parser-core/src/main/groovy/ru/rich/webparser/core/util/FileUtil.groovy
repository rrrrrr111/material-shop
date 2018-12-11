package ru.rich.webparser.core.util

import org.apache.commons.lang3.StringUtils

import java.nio.file.Paths

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
}
