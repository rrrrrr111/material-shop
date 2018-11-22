package ru.rich.matshop.webapi.api.user.profile.password;

import ru.rich.matshop.webapi.api.user.auth.validation.CurrentUserId;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;


public class PasswordChange {

    @CurrentUserId
    private Long personId;
    @NotBlank
    private String oldPassword;
    @NotBlank
    private String newPassword;
    @NotNull
    private Date personEditDate;

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public Date getPersonEditDate() {
        return personEditDate;
    }

    public void setPersonEditDate(Date personEditDate) {
        this.personEditDate = personEditDate;
    }

    @Override
    public String toString() {
        return "PasswordChange{" +
                "personId=" + personId +
                ", oldPassword=[HIDDEN]" +
                ", newPassword=[HIDDEN]" +
                ", personEditDate=" + personEditDate +
                '}';
    }
}