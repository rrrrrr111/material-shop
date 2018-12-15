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
    List<ValuesMultiMap> multiMaps = []
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

    ValuesMultiMap getValuesMultiMap(name) {
        multiMaps.find { it.name == name }
    }

    Collector getCollector(name) {
        collectors.find { it.name == name }
    }

    void putValue(String name, String value) {
        values << new Value(name: name, value: value)
    }

    void putToList(String name, String value) {
        def valuesList = getValuesList(name)
        if (!valuesList) {
            valuesList = new ValuesList(name: name)
            lists << valuesList
        }
        valuesList.list << value
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
                "multiMaps=" + multiMaps +
                ",\n" +
                "collectors=" + collectors +
                '\n}'
    }
}
