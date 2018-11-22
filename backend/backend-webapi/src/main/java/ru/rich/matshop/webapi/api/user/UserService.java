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
public class UserService {
    private static final String EMAIL_EXISTS_USER_MESSAGE = "Пользователь с указанным Email уже зарегистрирован";
    private static final String PHONE_EXISTS_USER_MESSAGE = "Пользователь с указанным телефоном уже зарегистрирован";
    private static final String INCORRECT_OLD_PASSWORD_MESSAGE = "Старый пароль указан не верно";

    private final PersonDao personDao;

    UserService(PersonDao personDao) {
        this.personDao = personDao;
    }

    public Person signup(Person person) {
        Assert.isNull(person.getId(), "Person id must be null");

        checkEmailNotExists(null, person.getEmail());
        checkPhoneNotExists(null, person.getPhone());

        Long personId = personDao.insert(person);
        return personDao.getById(personId);
    }

    public Person updateProfile(Person person) {
        Long personId = Preconditions.checkNotNull(person.getId(), "Person id must not be null");

        checkEmailNotExists(personId, person.getEmail());
        checkPhoneNotExists(personId, person.getPhone());

        return personDao.updateProfile(person);
    }

    public Date updatePassword(PasswordChange pc) {
        Long personId = Preconditions.checkNotNull(pc.getPersonId(), "Person id must not be null");

        Person record = personDao.getById(personId);
        if (!record.getPassword().equals(pc.getOldPassword())) {
            throw new UserException(INCORRECT_OLD_PASSWORD_MESSAGE,
                    String.format("Incorrect old password specified, user id=%s", personId));
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
            throw new UserException(EMAIL_EXISTS_USER_MESSAGE,
                    String.format("User with id=%s already exists, email=%s",
                            personId, email));
        }
    }

    private void checkPhoneNotExists(Long userId, String phone) {
        if (phone == null) {
            return;
        }
        final Long personId = personDao.getIdByPhone(phone);
        if (personId != null && !personId.equals(userId)) {
            throw new UserException(PHONE_EXISTS_USER_MESSAGE,
                    String.format("User with id=%s already exists, phone=%s",
                            personId, phone));
        }
    }
}
