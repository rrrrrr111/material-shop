package ru.rich.webparser.core.collector

class Collector {

    Map<String, String> values
    Map<String, List<String>> lists
    Map<String, Map<String, String>> maps

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
