package ru.rich.webparser.core.transform.collector

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j

/**
 *
 */
@CompileStatic
@Slf4j
class ValuesList implements Collectable {

    private final List<String> list = new ArrayList<>()

    void addVal(String val) {
        ++valIndex
        list << val
        log.info "List '$name' collected, value:'$val', valIndex:$valIndex"
    }

    @Override
    void checkOnFinish() {
        boolean norm = false
        if (valIndex == -1) {
            log.warn "List $name has no any value received"
            norm &= false
        }
        if (norm) {
            log.info "List $name finished normally"
        }
    }

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("name", name)
                .add("list", list)
                .toString()
    }
}
