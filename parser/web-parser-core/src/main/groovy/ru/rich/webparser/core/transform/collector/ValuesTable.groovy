package ru.rich.webparser.core.transform.collector

import com.google.common.base.MoreObjects
import com.google.common.collect.HashBasedTable
import com.google.common.collect.Table
import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j

/**
 *
 */
@CompileStatic
@Slf4j
class ValuesTable implements Collectable {

    private final Table<String, String, String> table = HashBasedTable.create()

    private final List<String> cols = []
    private final List<String> keys = []
    /**
     * Последовательная таблица, колонки добавляются вперемешку с ключами и значениями,
     * кол-во колонок != кол-во значений / кол-во ключей
     */
    private boolean sequential = false

    void putKey(String key) {
        keys.add(key)
        log.info "Table '$name' collected, key: '$key'"
    }

    void putCol(String col) {
        if (sequential) {
            cols.clear()
        }
        if (cols.contains(col)) {
            log.warn "Table $name allready contains col: '$col' at index: ${cols.indexOf(col)}, the col will be overridden"
        }
        cols << col
        log.info "Table '$name' collected, col: '$col'"
    }

    void putVal(String val) {
        def keyNum = ++valIndex
        def colNum = getColNumForValNum(valIndex)

        if (keys.size() > keyNum && cols.size() > colNum) {
            table.put(keys[keyNum], cols[colNum], val)
            log.info "Table $name collected, val: '$val'"
        } else if (cols.size() <= colNum) {
            log.warn "Table $name has no column for value: '$val', with valIndex $valIndex ignored"
        } else if (keys.size() <= keyNum) {
            log.warn "Table $name has no keys for value: '$val', with valIndex $valIndex ignored"
        }
    }

    void setSequential(boolean sequential) {
        this.sequential = sequential
    }

    private int getColNumForValNum(int valNum) {
        if (sequential) {
            return 0
        }
        if (!keys) {
            return 0
        }
        valNum.intdiv cols.size()
    }

    @Override
    void checkOnFinish() {
        boolean norm = true
        if (valIndex == -1) {
            log.warn "Table $name has no any value received"
            norm &= false
        } else {
            if (cols.size() - 1 > getColNumForValNum(valIndex)) {
                log.warn "Table $name finished, but cols left: ${cols.subList(getColNumForValNum(valIndex) + 1, cols.size())}"
                norm &= false
            }
            if (keys.size() - 1 > valIndex) {
                log.warn "Table $name finished, but keys left: ${keys.subList(valIndex + 1, keys.size())}"
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
