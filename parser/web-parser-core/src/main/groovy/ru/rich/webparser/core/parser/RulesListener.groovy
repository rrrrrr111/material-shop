package ru.rich.webparser.core.parser

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.apache.commons.lang3.ArrayUtils
import ru.rich.matshop.util.SearchArrayUtil
import ru.rich.webparser.core.collector.Collector
import ru.rich.webparser.core.collector.Value
import ru.rich.webparser.core.template.RuleType
import ru.rich.webparser.core.template.SearchableRegion
import ru.rich.webparser.core.template.SearchableRule

import static ru.rich.webparser.core.parser.ParserService.ParserListener

/**
 *
 */
@CompileStatic
@Slf4j
class RulesListener implements ParserListener {

    final Collector collector
    final char[] html

    RulesListener(Collector collector, char[] html) {
        this.collector = collector
        this.html = html
    }

    @Override
    void onFound(SearchableRegion region, int endIndex) {

        String value
        if (region.type.isRule) {
            SearchableRule rule = (SearchableRule) region

            int start = endIndex, end
            end = SearchArrayUtil.indexOfArray(html, start, rule.textAfter.toCharArray())

            value = new String(ArrayUtils.subarray(html, start, end))
            onRuleFound(rule, value, endIndex)
        }
    }

    private void onRuleFound(SearchableRule rule, String value, int atIndex) {
        switch (rule.type) {
            case RuleType.VAL:
                onValFound(rule, value, atIndex)
                break
            case RuleType.LIST:
                onListFound(rule, value, atIndex)
                break
            case RuleType.MAP:
                onMapFound(rule, value, atIndex)
                break
            case RuleType.MULTIMAP:
                onMultiMapFound(rule, value, atIndex)
                break
            default:
                throw new IllegalStateException("Unknown rule ${rule.type}")
        }
    }

    private void onValFound(SearchableRule rule, String value, int atIndex) {
        def name = rule.name
        log.info "Value $name found at index $atIndex"

        Value v = collector.getValue(name)
        if (v) {
            log.warn "Value $name found twice, last at index $atIndex"
            return
        }

        collector.putValue(name, value)
    }

    private void onListFound(SearchableRule rule, String value, int atIndex) {
        def name = rule.name
        log.info "List $name found at index $atIndex"

        collector.putToList(name, value)
    }

    private void onMapFound(SearchableRule rule, String value, int atIndex) {
        log.info "Map ${rule.name} found at index $atIndex"

    }

    private void onMultiMapFound(SearchableRule rule, String value, int atIndex) {
        log.info "MultiMap ${rule.name} found at index $atIndex"

    }
}
