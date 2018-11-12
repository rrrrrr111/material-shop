package ru.rich.matshop.webapi.api;

import org.jooq.Table;

import static ru.rich.matshop.db.model.Tables.PRODUCT_COSMETIC;

public enum Shop {

    COSMETIC(
            1,
            PRODUCT_COSMETIC
    ),
    ;

    private final int id;
    private final Table searchTable;

    Shop(int id, Table searchTable) {
        this.id = id;
        this.searchTable = searchTable;
    }

    public int getId() {
        return id;
    }

    public Table getSearchTable() {
        return searchTable;
    }
}
