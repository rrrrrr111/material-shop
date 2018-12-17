package ru.rich.webparser.core.collector

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j

/**
 *
 */
@CompileStatic
@Slf4j
class ValuesList implements Collectable {

    private List<String> list = new ArrayList<>()

    void addVal(String val) {
        ++valCounter
        list << val
    }

    @Override
    void checkOnFinish() {
        boolean norm = false
        if (valCounter == -1) {
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
