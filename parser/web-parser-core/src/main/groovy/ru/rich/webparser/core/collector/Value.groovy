package ru.rich.webparser.core.collector

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

    void setVal(String value) {
        ++valCounter
        this.value = value
    }

    @Override
    void checkOnFinish() {
        boolean norm = false
        if (valCounter == -1) {
            log.warn "Value $name has no any value received"
            norm &= false
        }
        if (valCounter > 1) {
            log.warn "Value $name received more then one value"
            norm &= false
        }
        if (norm) {
            log.info "Value $name finished normally"
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
