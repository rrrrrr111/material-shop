package ru.rich.webparser.core.extract.html

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.apache.commons.io.FileUtils
import org.apache.commons.io.IOUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.func.FunctionContext
import ru.rich.webparser.core.configuration.func.InterpolationHelper
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.configuration.model.ResourcePage
import ru.rich.webparser.core.extract.PageExtractor
import ru.rich.webparser.core.transform.collector.Collector

import java.nio.charset.Charset
import java.nio.charset.StandardCharsets

/**
 * Загрузка данных страниц
 */
@Service
@CompileStatic
@Slf4j
class ResourcePageExtractor implements PageExtractor<ResourcePage> {
    final static Charset PAGE_CHARSET = StandardCharsets.UTF_8

    @Value('${webParser.workDir:parser/web-parser-core/build}')
    String workDir
    @Autowired
    HttpClientSupport httpClientSupport
    @Autowired
    CanonicalizationService canonicalizationService
    @Autowired
    InterpolationHelper interpolationHelper

    @Override
    char[] extract(Configuration conf, ResourcePage p, Collector c) {
        log.info "Extracting page: ${p.name}, url: ${p.url}"

        interpolationHelper.interpolateFunctions(p, new FunctionContext(c))

        char[] html = loadHtml(conf, p)
        char[] normalisedHtml = canonicalizationService.normalise(conf, p, html)
        normalisedHtml
    }

    private char[] loadHtml(Configuration conf, ResourcePage p) {
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

    @Override
    boolean isApplicable(Page p) {
        return p instanceof ResourcePage
    }
}
