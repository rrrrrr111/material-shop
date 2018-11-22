package ru.rich.matshop.webapi.api.user.profile.settings;

import ru.rich.matshop.webapi.api.user.auth.validation.CurrentUserId;

import javax.validation.constraints.NotNull;
import java.util.Date;


public class SettingsChange {

    @CurrentUserId
    private Long personId;
    @NotNull
    private Boolean agreementChecked;
    @NotNull
    private Date personEditDate;

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public Boolean getAgreementChecked() {
        return agreementChecked;
    }

    public void setAgreementChecked(Boolean agreementChecked) {
        this.agreementChecked = agreementChecked;
    }

    public Date getPersonEditDate() {
        return personEditDate;
    }

    public void setPersonEditDate(Date personEditDate) {
        this.personEditDate = personEditDate;
    }

    @Override
    public String toString() {
        return "SettingsChange{" +
                "personId=" + personId +
                ", agreementChecked=" + agreementChecked +
                ", personEditDate=" + personEditDate +
                '}';
    }
}
