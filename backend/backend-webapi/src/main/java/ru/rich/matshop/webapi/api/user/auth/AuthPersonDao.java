package ru.rich.matshop.webapi.api.user.auth;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;
import ru.rich.matshop.db.model.tables.PersonTable;
import ru.rich.matshop.db.model.tables.records.PersonRecord;

import static ru.rich.matshop.db.model.Tables.PERSON;

@Repository
class AuthPersonDao {

    private final DSLContext create;

    AuthPersonDao(DSLContext create) {
        this.create = create;
    }

    PersonRecord getByEmail(String email) {
        PersonTable p = PERSON.as("p");
        return create.selectFrom(p)
                .where(p.EMAIL.eq(email))
                .fetchOne();
    }
}
