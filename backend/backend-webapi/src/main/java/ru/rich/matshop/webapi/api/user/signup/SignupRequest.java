package ru.rich.matshop.webapi.api.user.signup;

import ru.rich.matshop.webapi.api.common.rest.AbstractRestRequest;
import ru.rich.matshop.webapi.api.user.model.Person;

public class SignupRequest extends AbstractRestRequest {

    private Person person;

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    @Override
    public String toString() {
        return "SignupRequest{" +
                "person=" + person +
                '}';
    }
}
