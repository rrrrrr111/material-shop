package ru.rich.webparser.core.collector

import groovy.transform.CompileStatic

/**
 *
 */
@CompileStatic
class Collector implements Collectable {

    List<Value> values = []
    List<ValuesList> lists = []
    List<ValuesMap> maps = []
    List<ValuesTable> tables = []
    List<Collector> collectors = []

    Value getValue(name) {
        values.find { it.name == name }
    }

    ValuesList getValuesList(name) {
        lists.find { it.name == name }
    }

    ValuesMap getValuesMap(name) {
        maps.find { it.name == name }
    }

    ValuesTable getValuesTable(name) {
        tables.find { it.name == name }
    }

    Collector getCollector(name) {
        collectors.find { it.name == name }
    }

    void putValue(String name, String value) {
        values << new Value(name: name, value: value)
    }

    void putToList(String name, String value) {
        def vl = getValuesList(name)
        if (!vl) {
            vl = new ValuesList(name: name)
            lists << vl
        }
        vl.list << value
    }

    void putToMap(String name, String key, String value) {
        def vm = getValuesMap(name)
        if (!vm) {
            vm = new ValuesMap(name: name)
            maps << vm
        }
        vm.map[key] = value
    }

    void putToTable(String name, String key, String col, String value) {
        def vt = getValuesTable(name)
        if (!vt) {
            vt = new ValuesTable(name: name)
            tables << vt
        }
        vt.table.put(key, col, value)
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
