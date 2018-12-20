package ru.rich.webparser.core.extract.html

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.apache.commons.io.FileUtils
import org.apache.commons.io.IOUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.extract.PageExtractor

import java.nio.charset.Charset
import java.nio.charset.StandardCharsets

/**
 * Загрузка HTML страниц
 *
 */
@Service
@CompileStatic
@Slf4j
class HtmlPageExtractorService implements PageExtractor {
    final static Charset PAGE_CHARSET = StandardCharsets.UTF_8

    @Value('${webParser.workDir:parser/web-parser-core/build}')
    String workDir
    @Autowired
    HttpClientSupport httpClientSupport
    @Autowired
    CanonicalizationService canonicalizationService

    @Override
    char[] extract(Configuration conf, Page p) {
        log.info "Loading HTML page: $p"

        char[] html = loadHtml(conf, p)
        char[] normalisedHtml = canonicalizationService.normalise(conf, p, html)
        normalisedHtml
    }

    private char[] loadHtml(Configuration conf, Page p) {
        httpClientSupport.executeGetMethod(p.url) { is ->

            char[] html = IOUtils.toCharArray(is, PAGE_CHARSET)

            if (p.dropRowToDisk) {

                FileUtils.writeStringToFile(
                        new File("$workDir/pages/${conf.projectName}/${p.name}_row.html"),
                        new String(html),
                        PAGE_CHARSET
                )
            }
            html
        }
    }
}
