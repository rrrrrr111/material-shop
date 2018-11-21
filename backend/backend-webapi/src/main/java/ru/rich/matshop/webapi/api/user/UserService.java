package ru.rich.matshop.webapi.api.user;

import com.google.common.base.Preconditions;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import ru.rich.matshop.db.model.tables.records.PersonRecord;
import ru.rich.matshop.webapi.api.common.rest.UserException;
import ru.rich.matshop.webapi.api.user.model.Person;
import ru.rich.matshop.webapi.api.user.model.Sex;

import java.util.Set;

import static java.util.Collections.emptySet;

@Service
public class UserService {
    private static final String EMAIL_EXISTS_USER_MESSAGE = "Пользователь с указанным Email уже зарегистрирован";
    private static final String PHONE_EXISTS_USER_MESSAGE = "Пользователь с указанным телефоном уже зарегистрирован";

    private final PersonDao personDao;

    UserService(PersonDao personDao) {
        this.personDao = personDao;
    }

    public Person signup(Person person) {
        Assert.isNull(person.getId(), "Person id must be null");

        checkEmailNotExists(person.getEmail(), emptySet());
        checkPhoneNotExists(person.getPhone(), emptySet());

        Long personId = personDao.insert(person);
        PersonRecord record = personDao.getById(personId);

        return fillPerson(record, new Person());
    }

    public Person updateProfile(Person person) {
        Preconditions.checkNotNull(person.getId(), "Person id must not be null");

        checkEmailNotExists(person.getEmail(), Set.of(person.getId()));
        checkPhoneNotExists(person.getPhone(), Set.of(person.getId()));

        return personDao.updateProfile(person);
    }

    public Person fillPerson(PersonRecord rec, Person p) {
        p.setId(rec.getId());
        p.setEmail(rec.getEmail());
        p.setPassword(rec.getPassword());
        p.setPhone(rec.getPhone());
        p.setFirstName(rec.getFirstName());
        p.setLastName(rec.getLastName());
        p.setDateOfBirth(rec.getDateOfBirth());
        p.setSex(rec.getSex() == null ? null : Sex.valueOf(rec.getSex()));
        p.setAgreementChecked(rec.getAgreementChecked());
        p.setEditDate(rec.getEditDate());
        return p;
    }

    private void checkEmailNotExists(String email, Set<Long> exceptIds) {
        if (email == null) {
            return;
        }
        Long personId = personDao.getIdByEmail(email, exceptIds);
        if (personId != null) {
            throw new UserException(EMAIL_EXISTS_USER_MESSAGE,
                    String.format("User with id=%s already exists, email=%s",
                            personId, email));
        }
    }

    private void checkPhoneNotExists(String phone, Set<Long> exceptIds) {
        if (phone == null) {
            return;
        }
        Long personId = personDao.getIdByPhone(phone, exceptIds);
        if (personId != null) {
            throw new UserException(PHONE_EXISTS_USER_MESSAGE,
                    String.format("User with id=%s already exists, phone=%s",
                            personId, phone));
        }
    }
}
