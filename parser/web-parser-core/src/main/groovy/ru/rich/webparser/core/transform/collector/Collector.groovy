package ru.rich.webparser.core.transform.collector

import com.google.common.collect.ImmutableList
import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j

/**
 *
 */
@CompileStatic
@Slf4j
class Collector implements Collectable {

    private final List<Value> values = []
    private final List<ValuesList> lists = []
    private final List<ValuesMap> maps = []
    private final List<ValuesTable> tables = []
    private final List<Collector> collectors = []

    Collector() {}

    Collector(String name) {
        this.name = name
    }

    Value getValue(String name) {
        def v = values.find { it.name == name }
        if (!v) {
            v = new Value(name: name)
            values << v
        }
        v
    }

    ValuesList getValuesList(String name) {
        def vl = lists.find { it.name == name }
        if (!vl) {
            vl = new ValuesList(name: name)
            lists << vl
        }
        vl
    }

    ValuesMap getValuesMap(String name) {
        def vm = maps.find { it.name == name }
        if (!vm) {
            vm = new ValuesMap(name: name)
            maps << vm
        }
        vm
    }

    ValuesTable getValuesTable(String name) {
        def vt = tables.find { it.name == name }
        if (!vt) {
            vt = new ValuesTable(name: name)
            tables << vt
        }
        vt
    }

    Collector getCollector(String name) {
        def c = collectors.find { it.name == name }
        if (!c) {
            c = new Collector(name: name)
            collectors << c
        }
        c
    }

    List<Collector> getCollectors() {
        ImmutableList.copyOf(collectors)
    }

    void putValue(String name, String value) {
        getValue(name).val = value
    }

    void addToList(String name, String value) {
        getValuesList(name).addVal(value)
    }

    void putMapKey(String name, String key) {
        getValuesMap(name).putKey(key)
    }

    void putMapVal(String name, String val) {
        getValuesMap(name).putVal(val)
    }

    void putTableKey(String name, String key) {
        getValuesTable(name).putKey(key)
    }

    void putTableCol(String name, String col) {
        getValuesTable(name).putCol(col)
    }

    void putTableVal(String name, String val) {
        getValuesTable(name).putVal(val)
    }

    void setTableIsSequential(String name) {
        getValuesTable(name).setSequential(true)
    }

    def putCollector(Collector c) {
        collectors << c
    }

    def putCollectors(List<Collector> collectors) {
        this.collectors.addAll(collectors)
    }

    void checkOnFinish() {
        values.each { it.checkOnFinish() }
        lists.each { it.checkOnFinish() }
        maps.each { it.checkOnFinish() }
        tables.each { it.checkOnFinish() }
        collectors.each { it.checkOnFinish() }
    }

    @Override
    String toString() {
        return "Collector{name=" + name + "\n" +
                "values=" + values +
                ",\n" +
                "lists=" + lists +
                ",\n" +
                "maps=" + maps +
                ",\n" +
                "tables=" + tables +
                ",\n" +
                "collectors=" + collectors +
                '\n}'
    }
}
