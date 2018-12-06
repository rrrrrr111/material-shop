package ru.rich.matshop.webapi.api;

import org.jooq.Table;

import static ru.rich.matshop.db.model.Tables.P_COSMETIC;

public enum Shop {

    TEST(0, "test", P_COSMETIC),
    COSMETIC(1, "cosmetic", P_COSMETIC),
    ;

    private final int id;
    private final String key;
    private final Table searchTable;

    Shop(int id, String key, Table searchTable) {
        this.id = id;
        this.key = key;
        this.searchTable = searchTable;
    }

    public int getId() {
        return id;
    }

    public String getKey() {
        return key;
    }

    public Table getSearchTable() {
        return searchTable;
    }
}