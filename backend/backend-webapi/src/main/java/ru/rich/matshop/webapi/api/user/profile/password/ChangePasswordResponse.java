package ru.rich.matshop.webapi.api.user.profile.password;

import ru.rich.matshop.webapi.api.common.rest.AbstractRestResponse;

import java.util.Date;

public class ChangePasswordResponse extends AbstractRestResponse {

    private Date personEditDate;

    public Date getPersonEditDate() {
        return personEditDate;
    }

    public void setPersonEditDate(Date personEditDate) {
        this.personEditDate = personEditDate;
    }

    @Override
    public String toString() {
        return "ChangePasswordResponse{" +
                "personEditDate=" + personEditDate +
                '}';
    }
}
