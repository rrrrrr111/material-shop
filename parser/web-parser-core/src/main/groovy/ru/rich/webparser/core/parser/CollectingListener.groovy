package ru.rich.webparser.core.parser

import groovy.transform.CompileStatic
import groovy.transform.PackageScope
import groovy.util.logging.Slf4j
import ru.rich.webparser.core.collector.Collector
import ru.rich.webparser.core.template.RuleType
import ru.rich.webparser.core.template.SearchableRule
import ru.rich.webparser.core.template.SequentialString

import static ru.rich.webparser.core.parser.ParserService.ParserListener


/**
 *
 */
@CompileStatic
@Slf4j
@PackageScope
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
                onValFound(rule, value)
                break
            case RuleType.LIST:
                onListFound(rule, value)
                break
            case RuleType.MAP:
                onMapFound(rule, value)
                break
            case RuleType.TABLE:
                onTableFound(rule, value)
                break
            default:
                throw new IllegalStateException("Unknown rule ${rule.type}")
        }
    }

    @Override
    void onStringFound(SequentialString str, int index) {
    }

    private void onValFound(SearchableRule rule, String value) {
        def name = rule.name
        collector.putValue(name, value)
    }

    private void onListFound(SearchableRule rule, String value) {
        def name = rule.name
        collector.addToList(name, value)
    }

    private void onMapFound(SearchableRule rule, String value) {
        def name = rule.name
        if (rule.flags.contains("key")) {
            collector.putMapKey(name, value)

        } else if (rule.flags.contains("val")) {
            collector.putMapVal(name, value)
        }
    }

    private void onTableFound(SearchableRule rule, String value) {
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
