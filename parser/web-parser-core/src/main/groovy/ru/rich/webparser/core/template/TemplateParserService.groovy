package ru.rich.webparser.core.template

import groovy.transform.CompileStatic
import groovy.transform.PackageScope
import groovy.util.logging.Slf4j
import org.apache.commons.io.FileUtils
import org.apache.commons.io.FilenameUtils
import org.apache.commons.lang3.StringUtils
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.model.Page

import java.util.regex.Matcher

import static java.nio.charset.StandardCharsets.UTF_8

@Service
@CompileStatic
@Slf4j
class TemplateParserService {

    /**
     * Подготовка шаблонов для парсинга страниц
     */
    def prepareTemplates(String dir, List<Page> pages) {

        pages.each { p ->

            String templatePath = FilenameUtils.concat(dir, p.templateFileName)
            String template = FileUtils.readFileToString(new File(templatePath), UTF_8)
            prepareTemplate(p, template)
        }
    }

    @PackageScope
    def prepareTemplate(Page p, String template) {

        String[] regions = template.split(/\s*[.][.][.]\s*/)
        log.info "Parsing template ${p.templateFileName}, ${regions.length} regions found"

        int counter = 0
        def tpl = new PageTemplate()
        p.pageTemplate = tpl

        for (String r in regions) {

            switch (r) {
                case ~/^\s*(.+)\s*[\r\n]{1,2}[$][$](\w+)\((\w+)\)([.\w]*)\s*[\r\n]{1,2}\s*(.+)\s*$/:

                    def textBefore = (String) Matcher.lastMatcher.group(1)
                    def typeStr = (String) Matcher.lastMatcher.group(2)
                    def name = (String) Matcher.lastMatcher.group(3)
                    def flagsStr = (String) Matcher.lastMatcher.group(4)
                    def textAfter = (String) Matcher.lastMatcher.group(5)

                    def flags = StringUtils.split(flagsStr, '.' as char)
                    def type = RuleType.fromAlias(typeStr)

                    tpl.sequenceRegions << new SearchableRule(++counter, type, name, textBefore, textAfter, flags)
                    break
                default:
                    if (!r) continue
                    assert !r.contains(/$$/): "Rule $r ignored by RegExp"
                    tpl.sequenceRegions << new SequentialString(++counter, r)
                    break
            }
            log.info "Region qualified as ${tpl.sequenceRegions.last()}"
        }
    }
}