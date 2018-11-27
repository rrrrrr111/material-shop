package ru.rich.matshop.webapi.api.user;

import com.google.common.base.Preconditions;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import ru.rich.matshop.webapi.api.common.rest.UserException;
import ru.rich.matshop.webapi.api.user.model.Person;
import ru.rich.matshop.webapi.api.user.profile.password.PasswordChange;
import ru.rich.matshop.webapi.api.user.profile.settings.SettingsChange;

import java.util.Date;

@Service
public class PersonService {

    private final PersonDao personDao;

    PersonService(PersonDao personDao) {
        this.personDao = personDao;
    }

    public Person signup(Person person) {
        Assert.isNull(person.getId(), "Person id must be null");

        checkEmailNotExists(null, person.getEmail());

        Long personId = personDao.insert(person);
        return personDao.getById(personId);
    }

    public Person get(Long personId) {
        return personDao.getById(personId);
    }

    public Person update(Person person) {
        Long personId = Preconditions.checkNotNull(
                person.getId(), "Person id must not be null");

        checkEmailNotExists(personId, person.getEmail());

        return personDao.updateProfile(person);
    }

    public Date updatePassword(PasswordChange pc) {
        Long personId = Preconditions.checkNotNull(
                pc.getPersonId(), "Person id must not be null");

        Person record = personDao.getById(personId);
        if (!record.getPassword().equals(pc.getOldPassword())) {
            throw new UserException("Старый пароль указан не верно",
                    String.format("Incorrect old password specified, user id=%s", personId));
        }
        if (pc.getNewPassword().equals(pc.getOldPassword())) {
            throw new UserException("Новый пароль не может совпадать со старым",
                    String.format("New password equal to old, user id=%s", personId));
        }
        return personDao.updatePassword(pc);
    }

    public Date updateSettings(SettingsChange sc) {
        Preconditions.checkNotNull(sc.getPersonId(), "Person id must not be null");
        return personDao.updateSettings(sc);
    }

    private void checkEmailNotExists(Long userId, String email) {
        if (email == null) {
            return;
        }
        final Long personId = personDao.getIdByEmail(email);
        if (personId != null && !personId.equals(userId)) {
            throw new UserException("Пользователь с указанным Email уже зарегистрирован",
                    String.format("User with id=%s already exists, email=%s",
                            personId, email));
        }
    }
}
