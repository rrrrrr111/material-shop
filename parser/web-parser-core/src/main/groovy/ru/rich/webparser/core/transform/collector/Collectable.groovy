package ru.rich.webparser.core.transform.collector

import groovy.transform.CompileStatic

/**
 *
 */
@CompileStatic
trait Collectable {

    String name
    int valIndex = -1

    void checkOnFinish() {}
}