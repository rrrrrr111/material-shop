package ru.rich.webparser.core.parser

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import ru.rich.webparser.core.collector.Collector
import ru.rich.webparser.core.collector.Value
import ru.rich.webparser.core.template.RuleType
import ru.rich.webparser.core.template.SearchableRule
import ru.rich.webparser.core.template.SequentialString

import static ru.rich.webparser.core.parser.ParserService.ParserListener

/**
 *
 */
@CompileStatic
@Slf4j
class CollectingListener implements ParserListener {

    final Collector collector
    final char[] html

    CollectingListener(Collector collector, char[] html) {
        this.collector = collector
        this.html = html
    }

    @Override
    void onRuleFound(SearchableRule rule, String value, int index) {

        switch (rule.type) {
            case RuleType.VAL:
                onValFound(rule, value, index)
                break
            case RuleType.LIST:
                onListFound(rule, value, index)
                break
            case RuleType.MAP:
                onMapFound(rule, value, index)
                break
            case RuleType.TABLE:
                onTableFound(rule, value, index)
                break
            default:
                throw new IllegalStateException("Unknown rule ${rule.type}")
        }
    }

    @Override
    void onStringFound(SequentialString str, int index) {
    }

    private void onValFound(SearchableRule rule, String value, int index) {
        def name = rule.name
        Value v = collector.getValue(name)
        if (v) {
            log.warn "Value '$name' found twice, last at index $index, value:'$value', value ignored"
            return
        }
        collector.putValue(name, value)
    }

    private void onListFound(SearchableRule rule, String value, int index) {
        def name = rule.name
        collector.addToList(name, value)
    }

    private void onMapFound(SearchableRule rule, String value, int index) {
        def name = rule.name
        if (rule.flags.contains("key")) {
            collector.putMapKey(name, value)

        } else if (rule.flags.contains("val")) {
            collector.putMapVal(name, value)
        }
    }

    private void onTableFound(SearchableRule rule, String value, int index) {
        def name = rule.name
        if (rule.flags.contains("seq")) {
            collector.setTableIsSequential(name)
        }
        if (rule.flags.contains("key")) {
            collector.putTableKey(name, value)

        } else if (rule.flags.contains("col")) {
            collector.putTableCol(name, value)

        } else if (rule.flags.contains("val")) {
            collector.putTableVal(name, value)
        }
    }

    void onFinish() {
        collector.checkOnFinish()
    }
}
