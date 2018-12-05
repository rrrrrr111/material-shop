package ru.rich.matshop.webapi.api.user.profile.password;

import ru.rich.matshop.webapi.api.common.rest.AbstractRestRequest;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

public class ChangePasswordRequest extends AbstractRestRequest {

    @NotNull
    @Valid
    private PasswordChange passwordChange;

    public PasswordChange getPasswordChange() {
        return passwordChange;
    }

    public void setPasswordChange(PasswordChange passwordChange) {
        this.passwordChange = passwordChange;
    }

    @Override
    public String toString() {
        return "ChangePasswordRequest{" +
                "passwordChange=" + passwordChange +
                ", shopIdentity=" + getShopIdentity() +
                '}';
    }
}
