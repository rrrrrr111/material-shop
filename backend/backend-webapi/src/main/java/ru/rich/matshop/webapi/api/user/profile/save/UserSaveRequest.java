package ru.rich.matshop.webapi.api.user.profile.save;

import ru.rich.matshop.webapi.api.common.rest.AbstractRestRequest;
import ru.rich.matshop.webapi.api.user.model.Person;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

public class UserSaveRequest extends AbstractRestRequest {

    @NotNull
    @Valid
    private Person person;

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    @Override
    public String toString() {
        return "EmptyRequest{" +
                "person=" + person +
                ", shopIdentity=" + getShopIdentity() +
                '}';
    }
}
