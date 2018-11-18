package ru.rich.matshop.webapi.api.user;

import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import ru.rich.matshop.db.model.tables.records.PersonRecord;
import ru.rich.matshop.webapi.api.common.rest.UserException;
import ru.rich.matshop.webapi.api.user.model.Person;
import ru.rich.matshop.webapi.api.user.model.Sex;

@Service
public class UserService {
    private static final String USER_MESSAGE = "Пользователь с указанным Email уже зарегистрирован, " +
            "Вам необходимо войти либо восстановить пароль";

    private final PersonDao personDao;

    UserService(PersonDao personDao) {
        this.personDao = personDao;
    }

    public Person signup(Person person) {

        Long personId = personDao.getIdByEmail(person.getEmail());
        if (personId != null) {
            throw new UserException(USER_MESSAGE,
                    String.format("User with id=%s already exists, email=%s",
                            personId, person.getEmail()));
        }
        Assert.isTrue(person.getId() == null, "Person id must be null");
        personId = personDao.insert(person);
        PersonRecord record = personDao.getById(personId);

        return fillPerson(record, new Person());
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
}
