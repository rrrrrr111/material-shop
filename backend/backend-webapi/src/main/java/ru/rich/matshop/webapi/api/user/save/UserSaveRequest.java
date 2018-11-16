package ru.rich.matshop.webapi.api.user.save;

import ru.rich.matshop.webapi.api.common.rest.AbstractRestRequest;
import ru.rich.matshop.webapi.api.user.model.Person;

public class UserSaveRequest extends AbstractRestRequest {

    private Person person;

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    @Override
    public String toString() {
        return "UserSaveRequest{" +
                "person=" + person +
                '}';
    }
}
