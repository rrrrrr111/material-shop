package ru.rich.matshop.webapi.api.user;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

@Repository
class PersonDao {

    private final DSLContext create;

    PersonDao(DSLContext create) {
        this.create = create;
    }
}
