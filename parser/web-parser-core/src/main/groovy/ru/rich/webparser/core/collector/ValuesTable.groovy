package ru.rich.webparser.core.collector

import com.google.common.base.MoreObjects
import com.google.common.collect.Table
import com.google.common.collect.TreeBasedTable
import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j

/**
 *
 */
@CompileStatic
@Slf4j
class ValuesTable implements Collectable {

    private Table<String, String, String> table = TreeBasedTable.create()

    private List<String> cols = []
    private List<String> keys = []
    private int valCounter = -1

    void putKey(String key) {
        keys.add(key)
    }

    void putCol(String col) {
        if (cols.contains(col)) {
            log.warn "Table $name allready contains col: $col at index: ${cols.indexOf(col)}, the col will be overridden"
        }
        cols.add(col)
    }

    void putVal(String val) {
        def keyNum = ++valCounter
        def colNum = getColNumForValNum(valCounter)

        if (keys.size() > keyNum && cols.size() > colNum) {
            table.put(keys[keyNum], cols[colNum], val)
        } else if (cols.size() <= colNum) {
            log.warn "Table $name has no column for value: $val, with index $valCounter"
        } else if (keys.size() <= keyNum) {
            log.warn "Table $name has no keys for value: $val, with index $valCounter"
        }
    }

    private int getColNumForValNum(int valNum) {
        if (!keys) {
            return 0
        }
        valNum.intdiv keys.size()
    }

    @Override
    void checkOnFinish() {
        boolean norm = true
        if (valCounter == -1) {
            log.warn "Table $name has no any value received"
            norm &= false
        } else {
            if (cols.size() - 1 > getColNumForValNum(valCounter)) {
                log.warn "Table $name finished, but cols left: ${cols.subList(getColNumForValNum(valCounter) + 1, cols.size())}"
                norm &= false
            }
            if (keys.size() - 1 > valCounter) {
                log.warn "Table $name finished, but keys left: ${keys.subList(valCounter + 1, keys.size())}"
                norm &= false
            }
        }
        if (norm) {
            log.info "Table $name finished normally"
        }
    }

    @Override
    String toString() {
        return MoreObjects.toStringHelper(this)
                .add("name", name)
                .add("table", table)
                .toString()
    }
}
