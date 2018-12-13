package ru.rich.webparser.core.download

import groovy.transform.CompileStatic
import org.apache.commons.io.FileUtils
import org.apache.commons.io.IOUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.Page

import java.nio.charset.Charset
import java.nio.charset.StandardCharsets

/**
 * Загрузка HTML страниц
 *
 */
@Service
@CompileStatic
class LoadHtmlService {
    final static Charset PAGE_CHARSET = StandardCharsets.UTF_8

    @Autowired
    HttpClientSupport httpClientSupport

    char[] loadHtml(Configuration conf, Page p) {
        httpClientSupport.executeGetMethod(p.url) { is ->

            char[] html = IOUtils.toCharArray(is, PAGE_CHARSET)

            if (p.dropRowToDisk) {

                def pageName = p.templateFileName.substring(0, p.templateFileName.indexOf('.'))
                FileUtils.writeStringToFile(
                        new File("parser\\pages\\${conf.projectName}\\${pageName}_row.html"),
                        new String(html),
                        PAGE_CHARSET
                )
            }
            html
        }
    }
}
