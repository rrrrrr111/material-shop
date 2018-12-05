package ru.rich.matshop.webapi.api.user;

import com.google.common.base.Preconditions;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import ru.rich.matshop.webapi.api.common.rest.UserException;
import ru.rich.matshop.webapi.api.user.model.Person;
import ru.rich.matshop.webapi.api.user.model.PersonAddress;
import ru.rich.matshop.webapi.api.user.model.Role;
import ru.rich.matshop.webapi.api.user.model.UserInfo;
import ru.rich.matshop.webapi.api.user.profile.password.PasswordChange;
import ru.rich.matshop.webapi.api.user.profile.settings.SettingsChange;

import java.util.Date;
import java.util.Objects;

import static ru.rich.matshop.webapi.api.user.model.Role.Ability.AUTHENTICATE;

@Service
public class PersonService {

    private final PersonDao personDao;
    private final PersonAddressService personAddressService;

    PersonService(PersonDao personDao, PersonAddressService personAddressService) {
        this.personDao = personDao;
        this.personAddressService = personAddressService;
    }

    public Person getById(Long id) {
        UserInfo person = personDao.getById(id);
        return enrichWithAddress(person);
    }

    public Person getByEmail(String email) {
        UserInfo person = personDao.getByEmail(email);
        return enrichWithAddress(person);
    }

    public Person signup(Person newPerson) {
        Assert.isNull(newPerson.getId(), "Person id must be null");

        checkEmailNotReserved(null, newPerson.getEmail());

        newPerson.setRole(Role.USER);
        Person person = personDao.getByEmail(newPerson.getEmail());

        if (person == null) {
            return insert(newPerson);
        }

        person.setRole(newPerson.getRole());
        person.setFirstName(newPerson.getFirstName());
        person.setEmail(newPerson.getEmail());
        person.setPhone(newPerson.getPhone());
        person.setAgreementChecked(newPerson.getAgreementChecked());

        return update(person);
    }

    public Person updateProfile(Person newPerson) {
        Long personId = Preconditions.checkNotNull(
                newPerson.getId(), "Person id must not be null");

        checkEmailNotReserved(personId, newPerson.getEmail());

        Person person = personDao.getById(personId);

        person.setFirstName(newPerson.getFirstName());
        person.setLastName(newPerson.getLastName());
        person.setEmail(newPerson.getEmail());
        person.setPhone(newPerson.getPhone());
        person.setEditDate(newPerson.getEditDate());

        return update(person);
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

        return personDao.update(person);
    }

    public Date updateSettings(SettingsChange sc) {
        Preconditions.checkNotNull(sc.getPersonId(), "Person id must not be null");

        Person person = personDao.getById(sc.getPersonId());

        person.setAgreementChecked(sc.getAgreementChecked());
        person.setEditDate(sc.getPersonEditDate());

        return personDao.update(person);
    }

    public Person prepareOrderPerson(Person orderPerson) {
        String email = Preconditions.checkNotNull(orderPerson.getEmail(), "Person email must not be null");

        orderPerson.setRole(Role.ANONYMOUS);
        Person person = getByEmail(email);

        if (person == null) {
            return insert(orderPerson);
        }

        if (isPersonChanges(orderPerson, person)) {

            person.setFirstName(orderPerson.getFirstName());
            person.setEmail(orderPerson.getEmail());
            person.setPhone(orderPerson.getPhone());
            person.setAgreementChecked(orderPerson.getAgreementChecked());

            PersonAddress address = orderPerson.getAddress();
            address.setPersonId(person.getId());
            personAddressService.upsert(address);

            return update(person);
        }
        return person;
    }

    private boolean isPersonChanges(Person orderPerson, Person person) {
        return !Objects.equals(person.getFirstName(), orderPerson.getFirstName())
                || !Objects.equals(person.getEmail(), orderPerson.getEmail())
                || !Objects.equals(person.getPhone(), orderPerson.getPhone())
                || !Objects.equals(person.getAgreementChecked(), orderPerson.getAgreementChecked())
                || !Objects.equals(person.getAddress(), orderPerson.getAddress());
    }

    private void checkEmailNotReserved(Long userId, String email) {
        if (email == null) {
            return;
        }
        final Person person = personDao.getByEmail(email);
        if (person != null && !person.getId().equals(userId)) {

            if (person.ableTo(AUTHENTICATE)) {
                throw new UserException("Пользователь с указанным Email уже зарегистрирован",
                        String.format("User with email=%s already exists, id=%s", email, person.getId()));
            }
        }
    }

    private Person enrichWithAddress(UserInfo person) {
        if (person == null) {
            return null;
        }
        person.setAddress(personAddressService.getByPersonId(person.getId()));
        return person;
    }

    private Person insert(Person person) {
        Long personId = personDao.insert(person);
        return personDao.getById(personId);
    }

    private Person update(Person person) {
        personDao.update(person);
        return getById(person.getId());
    }
}
