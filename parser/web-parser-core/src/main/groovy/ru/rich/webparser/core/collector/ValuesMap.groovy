package ru.rich.webparser.core.collector

import com.google.common.base.MoreObjects
import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j

/**
 *
 */
@CompileStatic
@Slf4j
class ValuesMap implements Collectable {

    private final Map<String, String> map = new LinkedHashMap<>()
    private final List<String> keys = []

    void putKey(String key) {
        if (keys.contains(key)) {
            log.warn "Map $name allready contains key: $key at index: ${keys.indexOf(key)}, the key will be overridden"
        }
        keys.add(key)
        log.info "Map '$name' collected, key: '$key', keyIndex:${keys.size() - 1}"
    }

    void putVal(String val) {
        def keyNum = ++valIndex
        if (keys.size() >= keyNum) {
            map.put(keys[keyNum], val)
            log.info "Map '$name' collected, val:'$val', valIndex:$valIndex"
        } else {
            log.warn "Map $name has no key for value: $val, value with valIndex $valIndex ignored"
        }
    }

    @Override
    void checkOnFinish() {
        boolean norm = false
        if (keys.size() - 1 > valIndex) {
            log.warn "Map $name finished, but keys left: ${keys.subList(valIndex + 1, keys.size())}"
        }
        if (valIndex == -1) {
            log.warn "Map $name has no any value received"
            norm &= false
        }
        if (norm) {
            log.info "Map $name finished normally"
        }
    }

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("name", name)
                .add("map", map)
                .toString()
    }
}
