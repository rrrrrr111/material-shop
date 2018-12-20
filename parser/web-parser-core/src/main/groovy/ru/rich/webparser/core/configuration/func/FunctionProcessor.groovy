package ru.rich.webparser.core.configuration.func

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.apache.commons.lang3.StringUtils
import org.springframework.stereotype.Service
import ru.rich.webparser.core.transform.collector.Collector

/**
 * Обработка функций в файлах конфигурации
 */
@Service
@Slf4j
@CompileStatic
class FunctionProcessor {

    String process(String funcStr, FunctionContext fc) {
        if (!funcStr.contains("@@")) {
            return funcStr
        }
        check(funcStr, fc)

        int oc = funcStr.indexOf('(')
        int cc = funcStr.lastIndexOf(')')
        String name = funcStr.substring(2, oc)
        List<String> params = (
                splitFuncParams(funcStr.substring(oc + 1, cc))
        ).collect { process(it, fc).trim() }

        processFunc(name, params, fc)
    }

    List<String> splitFuncParams(String params) {
        def res = []
        int lastSepIndex = 0
        int skipCounter = 0
        params.toCharArray().eachWithIndex { char c, int index ->
            if (c == '(' as char) {
                ++skipCounter
            } else if (c == ')' as char) {
                --skipCounter
            } else if (c == ',' as char && skipCounter == 0) {

                res << params.substring(lastSepIndex, index)
                lastSepIndex = index + 1
            }
        }
        res << params.substring(lastSepIndex, params.length())
        res
    }

    String processFunc(String name, List<String> params, FunctionContext fc) {
        switch (name) {
            case "val":
                return processValFunc(params, fc)
                break
            case "list":
                return processListFunc(params, fc)
                break
            case "map":
                return processMapFunc(params, fc)
                break
            default:
                assert false: "Unknown function $name"
        }
    }

    String processValFunc(List<String> params, FunctionContext fc) {
        assert params.size() == 1

        fc.collector.getValue(params[0]).valRequired
    }

    String processListFunc(List<String> params, FunctionContext fc) {
        assert params.size() == 2
        assert fc.index

        fc.collector.getValuesList(params[0]).values[fc.index]
    }

    String processMapFunc(List<String> params, FunctionContext fc) {
        assert params.size() == 2

        def map = fc.collector.getValuesMap(params[0]).values
        assert map.containsKey(params[1])
        map[params[1]]
    }

    void check(String funcStr, FunctionContext fc) {

        assert fc

        int oc = StringUtils.countMatches(funcStr, '(' as char)
        int cc = StringUtils.countMatches(funcStr, ')' as char)
        int dd = StringUtils.countMatches(funcStr, "@@")

        assert oc == cc
        assert oc == dd
    }

    static class FunctionContext {
        final Collector collector
        final Integer index

        FunctionContext(Collector collector, Integer index) {
            this.collector = collector
            this.index = index
        }

        FunctionContext(Collector collector) {
            this.collector = collector
            this.index = null
        }
    }
}
