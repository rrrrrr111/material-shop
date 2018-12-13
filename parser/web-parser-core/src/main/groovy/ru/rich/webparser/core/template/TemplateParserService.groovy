package ru.rich.webparser.core.template

import groovy.transform.CompileStatic
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

    private prepareTemplate(Page p, String template) {

        String[] regions = template.split(/\s*[.][.][.]\s*/)
        log.info "Parsing template ${p.templateFileName}, ${regions.length} regions found"

        def tpl = new PageTemplate()
        p.pageTemplate = tpl

        for (String r in regions) {

            SearchableRegion s
            switch (r) {
                case ~/^\s*(.+)\s*[\r\n]{1,2}[$][$](\w+)\((\w+)\)([.\w]*)\s*[\r\n]{1,2}\s*(.+)\s*$/:

                    def textBefore = (String) Matcher.lastMatcher.group(1)
                    def typeStr = (String) Matcher.lastMatcher.group(2)
                    def name = (String) Matcher.lastMatcher.group(3)
                    def flagsStr = (String) Matcher.lastMatcher.group(4)
                    def textAfter = (String) Matcher.lastMatcher.group(5)

                    def flags = StringUtils.split(flagsStr, '.' as char)
                    def type = RuleType.fromAlias(typeStr)

                    s = new SearchableRule(type, name, textBefore, textAfter, flags)
                    break
                default:
                    assert !r.contains(/$$/): "Rule $r ignored by RegExp"
                    s = new SequentialString(r)
                    break
            }

            log.info "Region qualified as $s"
            tpl.sequenceRegions << s
        }
    }
}