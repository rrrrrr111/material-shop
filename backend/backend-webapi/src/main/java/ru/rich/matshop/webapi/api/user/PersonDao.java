package ru.rich.matshop.webapi.api.user;

import org.jooq.DSLContext;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Repository;
import ru.rich.matshop.db.model.tables.PersonTable;
import ru.rich.matshop.webapi.api.user.model.Person;
import ru.rich.matshop.webapi.api.user.model.Role;
import ru.rich.matshop.webapi.api.user.model.UserInfo;
import ru.rich.matshop.webapi.api.user.profile.password.PasswordChange;
import ru.rich.matshop.webapi.api.user.profile.settings.SettingsChange;

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

    @Cacheable(value = "personIdByPhone", key = "#phone")
    public Long getIdByPhone(String phone) {
        return create.select(PERSON.ID)
                .from(PERSON)
                .where(PERSON.PHONE.eq(phone))
                .fetchOneInto(Long.class);
    }

    @Caching(evict = {
            @CacheEvict(value = {"personIdByEmail"}, key = "#p.email", condition = "#p.email != null"),
            @CacheEvict(value = {"personIdByPhone"}, key = "#p.phone", condition = "#p.phone != null")
    })
    public Long insert(Person p) {
        final var now = new Date();
        return create.insertInto(PERSON)
                .set(create.newRecord(PERSON, p))
                .set(PERSON.EDIT_DATE, now)
                .set(PERSON.LAST_VISIT, now)
                .set(PERSON.LOCKED, false)
                .set(PERSON.ROLE, Role.USER.toString())
                .returning(PERSON.ID)
                .fetchOne()
                .getId();
    }

    @Caching(evict = {
            @CacheEvict(value = {"personById"}, key = "#p.id"),
            @CacheEvict(value = {"personIdByEmail"}, key = "#p.email", condition = "#p.email != null"),
            @CacheEvict(value = {"personIdByPhone"}, key = "#p.phone", condition = "#p.phone != null")
    })
    public Person updateProfile(Person p) {
        Date now = new Date();
        int res = create.update(PERSON)
                .set(PERSON.FIRST_NAME, p.getFirstName())
                .set(PERSON.LAST_NAME, p.getLastName())
                .set(PERSON.EMAIL, p.getEmail())
                .set(PERSON.PHONE, p.getPhone())
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

    @Caching(evict = {
            @CacheEvict(value = {"personById"}, key = "#pc.personId")
    })
    public Date updatePassword(PasswordChange pc) {
        Date now = new Date();
        int res = create.update(PERSON)
                .set(PERSON.PASSWORD, pc.getNewPassword())
                .set(PERSON.EDIT_DATE, now)
                .where(
                        PERSON.ID.eq(pc.getPersonId())
                                .and(PERSON.EDIT_DATE.eq(pc.getPersonEditDate()))
                                .and(PERSON.PASSWORD.eq(pc.getOldPassword()))
                ).execute();
        isOne(res);
        return now;
    }

    @Caching(evict = {
            @CacheEvict(value = {"personById"}, key = "#sc.personId")
    })
    public Date updateSettings(SettingsChange sc) {
        Date now = new Date();
        int res = create.update(PERSON)
                .set(PERSON.AGREEMENT_CHECKED, sc.getAgreementChecked())
                .set(PERSON.EDIT_DATE, now)
                .where(
                        PERSON.ID.eq(sc.getPersonId())
                                .and(PERSON.EDIT_DATE.eq(sc.getPersonEditDate()))
                ).execute();
        isOne(res);
        return now;
    }
}