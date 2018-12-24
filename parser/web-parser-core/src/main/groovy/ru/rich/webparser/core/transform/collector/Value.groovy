package ru.rich.webparser.core.transform.collector

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j

/**
 *
 */
@CompileStatic
@Slf4j
class Value implements Collectable {

    private String value

    String getVal() {
        return value
    }

    String getValRequired() {
        assert value
        return value
    }

    void setVal(String value) {
        if (valIndex > -1) {
            log.warn "Duplicate value $name: $value put to collector, value overriden"
        }
        ++valIndex
        this.value = value
        log.trace "Value $name ='$value' collected, valIndex:$valIndex"
    }

    @Override
    void checkOnFinish() {
        boolean norm = false
        if (valIndex == -1) {
            log.warn "Value $name has no any value received"
            norm &= false
        }
        if (valIndex > 1) {
            log.warn "Value $name received more then one value"
            norm &= false
        }
        if (norm) {
            log.trace "Value $name finished normally"
        }
    }

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("name", name)
                .add("value", "'$value'")
                .toString()
    }
}
