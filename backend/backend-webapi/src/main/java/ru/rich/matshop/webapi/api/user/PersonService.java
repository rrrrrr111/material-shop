package ru.rich.matshop.webapi.api.user;

import com.google.common.base.Preconditions;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import ru.rich.matshop.webapi.api.common.rest.UserException;
import ru.rich.matshop.webapi.api.user.model.Person;
import ru.rich.matshop.webapi.api.user.model.Role;
import ru.rich.matshop.webapi.api.user.profile.password.PasswordChange;
import ru.rich.matshop.webapi.api.user.profile.settings.SettingsChange;

import java.util.Date;

import static ru.rich.matshop.webapi.api.user.model.Role.Ability.AUTHENTICATE;

@Service
public class PersonService {

    private final PersonDao personDao;

    PersonService(PersonDao personDao) {
        this.personDao = personDao;
    }

    public Person get(Long personId) {
        return personDao.getById(personId);
    }

    public Person signup(Person newPerson) {
        Assert.isNull(newPerson.getId(), "Person id must be null");

        checkEmailNotReserved(null, newPerson.getEmail());

        newPerson.setRole(Role.USER);
        Long personId = personDao.getIdByEmail(newPerson.getEmail());

        if (personId == null) {
            personId = personDao.insert(newPerson);
            return personDao.getById(personId);
        }

        Person person = personDao.getById(personId);

        person.setRole(newPerson.getRole());
        person.setFirstName(newPerson.getFirstName());
        person.setEmail(newPerson.getEmail());
        person.setPhone(newPerson.getPhone());
        person.setAgreementChecked(newPerson.getAgreementChecked());

        return personDao.updateProfile(person);
    }

    public Person update(Person newPerson) {
        Long personId = Preconditions.checkNotNull(
                newPerson.getId(), "Person id must not be null");

        checkEmailNotReserved(personId, newPerson.getEmail());

        Person person = personDao.getById(personId);
        person.setFirstName(newPerson.getFirstName());
        person.setLastName(newPerson.getLastName());
        person.setEmail(newPerson.getEmail());
        person.setPhone(newPerson.getPhone());
        person.setEditDate(newPerson.getEditDate());

        return personDao.updateProfile(person);
    }

    public Date updatePassword(PasswordChange pc) {
        Long personId = Preconditions.checkNotNull(
                pc.getPersonId(), "Person id must not be null");

        Person person = personDao.getById(personId);
        if (!person.getPassword().equals(pc.getOldPassword())) {
            throw new UserException("Старый пароль указан не верно",
                    String.format("Incorrect old password specified, user id=%s", personId));
        }
        if (pc.getNewPassword().equals(pc.getOldPassword())) {
            throw new UserException("Новый пароль не может совпадать со старым",
                    String.format("New password equal to old, user id=%s", personId));
        }
        person.setPassword(pc.getNewPassword());
        person.setEditDate(pc.getPersonEditDate());

        return personDao.updateProfile(person).getEditDate();
    }

    public Date updateSettings(SettingsChange sc) {
        Preconditions.checkNotNull(sc.getPersonId(), "Person id must not be null");

        Person person = personDao.getById(sc.getPersonId());
        person.setAgreementChecked(sc.getAgreementChecked());
        person.setEditDate(sc.getPersonEditDate());

        return personDao.updateProfile(person).getEditDate();
    }

    public Person prepareOrderPerson(Person orderPerson) {
        String email = Preconditions.checkNotNull(orderPerson.getEmail(), "Person email must not be null");

        orderPerson.setRole(Role.ANONYMOUS);
        Long personId = personDao.getIdByEmail(email);

        if (personId == null) {
            personId = personDao.insert(orderPerson);
            return personDao.getById(personId);
        }

        Person person = personDao.getById(personId);

        if (person.getFirstName().equals(orderPerson.getFirstName())
                || person.getEmail().equals(orderPerson.getEmail())
                || person.getPhone().equals(orderPerson.getPhone())
                || person.getAgreementChecked().equals(orderPerson.getAgreementChecked())
        ) {
            person.setFirstName(orderPerson.getFirstName());
            person.setEmail(orderPerson.getEmail());
            person.setPhone(orderPerson.getPhone());
            person.setAgreementChecked(orderPerson.getAgreementChecked());

            return personDao.updateProfile(person);
        } else {
            return person;
        }
    }

    private void checkEmailNotReserved(Long userId, String email) {
        if (email == null) {
            return;
        }
        final Long personId = personDao.getIdByEmail(email);
        if (personId != null && !personId.equals(userId)) {

            Person person = personDao.getById(personId);
            if (person.ableTo(AUTHENTICATE)) {
                throw new UserException("Пользователь с указанным Email уже зарегистрирован",
                        String.format("User with id=%s already exists, email=%s", personId, email));
            }
        }
    }
}
