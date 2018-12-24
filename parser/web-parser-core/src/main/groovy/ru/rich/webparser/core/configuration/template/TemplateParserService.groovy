package ru.rich.webparser.core.configuration.template

import groovy.transform.CompileStatic
import groovy.transform.PackageScope
import groovy.util.logging.Slf4j
import org.apache.commons.io.FileUtils
import org.apache.commons.io.FilenameUtils
import org.apache.commons.lang3.StringUtils
import org.apache.commons.lang3.mutable.MutableInt
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.model.ResourcePage
import ru.rich.webparser.core.configuration.model.WithSubPages
import ru.rich.webparser.core.configuration.model.WithTemplate

import java.nio.charset.Charset
import java.nio.charset.StandardCharsets

/**
 * Подготовка шаблонов для парсинга страниц
 */
@Service
@CompileStatic
@Slf4j
class TemplateParserService {

    public static final Charset TEMPLATE_CHARSET = StandardCharsets.UTF_8

    void prepareTemplates(String dir, List<ResourcePage> pages) {

        pages.each { p ->

            if (p instanceof WithSubPages) {
                prepareTemplates(dir, ((WithSubPages) p).subPages)
            }
            if (p instanceof WithTemplate) {
                prepareTemplate(dir, (WithTemplate) p)
            }
        }
    }


    private void prepareTemplate(String dir, WithTemplate page) {
        String templateSource = loadTemplateSource(dir, page.templateFileName)
        page.pageTemplate = parseTemplate(page.templateFileName, templateSource)
    }

    @PackageScope
    PageTemplate parseTemplate(String templateFileName, String templateStr) {

        String[] regions = templateStr.split(/\s*[.][.][.]\s*/)
        def counter = new MutableInt()
        def tpl = new PageTemplate()

        for (String region in regions) {
            if (region.contains(/$$/)) {
                tpl.sequenceRegions.addAll(extractRules(region, counter))
            } else if (StringUtils.isNotBlank(region)) {
                tpl.sequenceRegions << new SequentialString(counter.incrementAndGet(), region)
                log.info "String region found in template ${tpl.sequenceRegions.last()}"
            }
        }
        log.info "Parsing template ${templateFileName}, ${tpl.sequenceRegions.size()} sequence regions found"
        tpl
    }

    private String loadTemplateSource(String dir, String templateFileName) {

        String templatePath = FilenameUtils.concat(dir, templateFileName)
        FileUtils.readFileToString(new File(templatePath), TEMPLATE_CHARSET)
    }

    private List<SearchableRule> extractRules(String region, MutableInt counter) {
        def rules = []
        String[] lines = region.split(/[\r\n]{1,2}/)

        String textBefore = "", textAfter = ""
        RuleType type = null
        String name = null
        String[] flags = null
        boolean after = false
        for (String line in lines) {

            if (line.contains(/$$/)) {
                if (after) {
                    rules << new SearchableRule(counter.incrementAndGet(), type, name, textBefore, textAfter, flags)
                    log.info "Rule region found in template ${rules.last()}"

                    textBefore = textAfter
                    textAfter = ""
                    type = null
                    name = null
                    flags = null
                }
                after = true

                def matcher = line =~ /^\s*[$][$](?<type>\w+)\((?<name>\w+)\)(?<flags>[.\w]*)\s*$/
                if (!matcher.matches()) {
                    throw new IllegalStateException($/line $line not matched to RegExp/$)
                }
                def typeStr = (String) matcher.group('type')
                def flagsStr = (String) matcher.group('flags')

                name = (String) matcher.group('name')
                flags = StringUtils.split(flagsStr, '.' as char)
                type = RuleType.fromAlias(typeStr)

            } else {
                if (after) {
                    textAfter += line + "\r\n"
                } else {
                    textBefore += line + "\r\n"
                }
            }
        }
        rules << new SearchableRule(counter.incrementAndGet(), type, name, textBefore, textAfter, flags)
        log.info "Rule region found in template ${rules.last()}"

        rules
    }
}