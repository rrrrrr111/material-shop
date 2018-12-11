package ru.rich.webparser.core.collector

class Collector {

    List<String> values
    List<List<String>> lists
    List<Map<String, String>> maps

    @Override
    String toString() {
        return "Collector{\n" +
                "values=" + values +
                ",\n" +
                "lists=" + lists +
                ",\n" +
                "maps=" + maps +
                '\n}'
    }
}
