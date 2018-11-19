package ru.rich.matshop.webapi.api.user;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;
import ru.rich.matshop.db.model.tables.PersonTable;
import ru.rich.matshop.db.model.tables.records.PersonRecord;
import ru.rich.matshop.webapi.api.user.model.Person;
import ru.rich.matshop.webapi.api.user.model.Role;

import java.util.Date;

import static ru.rich.matshop.db.model.Tables.PERSON;

@Repository
public
class PersonDao {

    private final DSLContext create;

    PersonDao(DSLContext create) {
        this.create = create;
    }

    public PersonRecord getById(Long id) {
        PersonTable p = PERSON.as("p");
        return create.selectFrom(p)
                .where(p.ID.eq(id))
                .fetchOne();
    }

    public Long getIdByEmail(String email) {
        return create.select(PERSON.ID)
                .from(PERSON)
                .where(PERSON.EMAIL.eq(email))
                .fetchOneInto(Long.class);
    }

    public Long getIdByPhone(String phone) {
        return create.select(PERSON.ID)
                .from(PERSON)
                .where(PERSON.PHONE.eq(phone))
                .fetchOneInto(Long.class);
    }

    public void update(Person p) {
        int res = create.update(PERSON)
                .set(create.newRecord(PERSON, p))
                .set(PERSON.EDIT_DATE, new Date())
                .where(
                        PERSON.ID.eq(p.getId())
                                .and(PERSON.EDIT_DATE.eq(p.getEditDate()))
                )
                .execute();
        Assert.isTrue(res == 1, "Result must be 1, but got " + res);
    }

    public Long insert(Person p) {
        return create.insertInto(PERSON)
                .set(create.newRecord(PERSON, p))
                .set(PERSON.EDIT_DATE, new Date())
                .set(PERSON.LOCKED, false)
                .set(PERSON.ROLE, Role.USER.toString())
                .returning(PERSON.ID)
                .fetchOne()
                .getId();
    }
}