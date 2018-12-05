package ru.rich.matshop.webapi.api.user;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;
import ru.rich.matshop.webapi.api.user.model.PersonAddress;

import java.util.Date;
import java.util.List;

import static ru.rich.matshop.db.model.Tables.PERSON_ADDRESS;
import static ru.rich.matshop.webapi.util.DaoUtil.isOne;

@Repository
public class PersonAddressDao {

    private final DSLContext create;

    PersonAddressDao(DSLContext create) {
        this.create = create;
    }

    public List<PersonAddress> getByPersonId(Long personId) {
        return create.selectFrom(PERSON_ADDRESS)
                .where(PERSON_ADDRESS.PERSON_ID.eq(personId))
                .fetchInto(PersonAddress.class);
    }

    public Long insert(PersonAddress a) {
        var now = new Date();
        return create.insertInto(PERSON_ADDRESS)
                .set(create.newRecord(PERSON_ADDRESS, a))
                .set(PERSON_ADDRESS.EDIT_DATE, now)
                .returning(PERSON_ADDRESS.ID)
                .fetchOne()
                .getId();
    }

    public void update(PersonAddress a) {
        Date now = new Date();
        int res = create.update(PERSON_ADDRESS)
                .set(create.newRecord(PERSON_ADDRESS, a))
                .set(PERSON_ADDRESS.EDIT_DATE, now)
                .where(
                        PERSON_ADDRESS.ID.eq(a.getId()) // оптимист блокировка по PERSON.EDIT_DATE
                )
                .execute();
        isOne(res);
    }
}