package ru.rich.matshop.webapi.api.user.profile.settings;

import ru.rich.matshop.webapi.api.common.rest.AbstractRestResponse;

import java.util.Date;

public class UserSaveSettingsResponse extends AbstractRestResponse {

    private Date personEditDate;

    public Date getPersonEditDate() {
        return personEditDate;
    }

    public void setPersonEditDate(Date personEditDate) {
        this.personEditDate = personEditDate;
    }

    @Override
    public String toString() {
        return "UserSaveSettingsResponse{" +
                "personEditDate=" + personEditDate +
                ", serverId=" + getServerId() +
                ", message='" + getMessage() + '\'' +
                '}';
    }
}
