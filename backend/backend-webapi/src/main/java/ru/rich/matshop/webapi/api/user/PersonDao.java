package ru.rich.matshop.webapi.api.user;

import org.jooq.DSLContext;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Repository;
import ru.rich.matshop.db.model.tables.PersonTable;
import ru.rich.matshop.webapi.api.user.model.Person;
import ru.rich.matshop.webapi.api.user.model.UserInfo;

import java.util.Date;

import static ru.rich.matshop.db.model.Tables.PERSON;
import static ru.rich.matshop.webapi.util.DaoUtil.isOne;

@Repository
public class PersonDao {

    private final DSLContext create;

    PersonDao(DSLContext create) {
        this.create = create;
    }

    @Cacheable(value = "personById", key = "#id")
    public UserInfo getById(Long id) {
        PersonTable p = PERSON.as("p");
        return create.selectFrom(p)
                .where(p.ID.eq(id))
                .fetchOneInto(UserInfo.class);
    }

    @Cacheable(value = "personIdByEmail", key = "#email")
    public Long getIdByEmail(String email) {
        return create.select(PERSON.ID)
                .from(PERSON)
                .where(PERSON.EMAIL.eq(email))
                .fetchOneInto(Long.class);
    }

    @Caching(evict = {
            @CacheEvict(value = {"personIdByEmail"}, key = "#p.email", condition = "#p.email != null")
    })
    public Long insert(Person p) {
        final var now = new Date();
        return create.insertInto(PERSON)
                .set(create.newRecord(PERSON, p))
                .set(PERSON.EDIT_DATE, now)
                .set(PERSON.LAST_VISIT, now)
                .set(PERSON.LOCKED, false)
                .returning(PERSON.ID)
                .fetchOne()
                .getId();
    }

    @Caching(evict = {
            @CacheEvict(value = {"personById"}, key = "#p.id"),
            @CacheEvict(value = {"personIdByEmail"}, key = "#p.email", condition = "#p.email != null")
    })
    public Person updateProfile(Person p) {
        Date now = new Date();
        int res = create.update(PERSON)
                .set(PERSON.FIRST_NAME, p.getFirstName())
                .set(PERSON.LAST_NAME, p.getLastName())
                .set(PERSON.EMAIL, p.getEmail())
                .set(PERSON.PHONE, p.getPhone())
                .set(PERSON.AGREEMENT_CHECKED, p.getAgreementChecked())
                .set(PERSON.PASSWORD, p.getPassword())
                .set(PERSON.ROLE, p.getRole().toString())
                .set(PERSON.EDIT_DATE, now)
                .where(
                        PERSON.ID.eq(p.getId())
                                .and(PERSON.EDIT_DATE.eq(p.getEditDate()))
                )
                .execute();
        isOne(res);

        p.setEditDate(now);
        return p;
    }
}