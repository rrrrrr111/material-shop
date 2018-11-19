package ru.rich.matshop.webapi.api.user.auth.signin;

import ru.rich.matshop.webapi.api.common.rest.AbstractRestResponse;
import ru.rich.matshop.webapi.api.user.model.Person;

public class LoginResponse extends AbstractRestResponse {

    private Person person;

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "person=" + person +
                '}';
    }
}
