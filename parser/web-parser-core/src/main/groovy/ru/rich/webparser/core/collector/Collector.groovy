package ru.rich.webparser.core.collector

import groovy.transform.CompileStatic


@CompileStatic
class Collector implements Collectable {

    List<Value> values
    List<ValuesList> lists
    List<ValuesMap> maps
    List<Collector> collectors

    Value getValue(name) {
        values.find { c -> c.name == name }
    }

    ValuesList getList(name) {
        lists.find { c -> c.name == name }
    }

    ValuesMap getMap(name) {
        maps.find { c -> c.name == name }
    }

    Collector getCollector(name) {
        collectors.find { c -> c.name == name }
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
                "collectors=" + collectors +
                '\n}'
    }
}
