package ru.rich.matshop.webapi.api.user;

import org.springframework.stereotype.Service;
import ru.rich.matshop.webapi.api.user.model.Person;

@Service
public
class UserService {

    private final PersonDao personDao;

    UserService(PersonDao personDao) {
        this.personDao = personDao;
    }

    public Person signup(Person person) {

        return person;
    }
}
