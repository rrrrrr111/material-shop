package ru.rich.matshop.webapi.api.user.profile.settings;

import ru.rich.matshop.webapi.api.common.rest.AbstractRestRequest;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

public class UserSaveSettingsRequest extends AbstractRestRequest {

    @NotNull
    @Valid
    private SettingsChange settingsChange;

    public SettingsChange getSettingsChange() {
        return settingsChange;
    }

    public void setSettingsChange(SettingsChange settingsChange) {
        this.settingsChange = settingsChange;
    }

    @Override
    public String toString() {
        return "UserSaveSettingsRequest{" +
                "settingsChange=" + settingsChange +
                ", shopIdentity=" + getShopIdentity() +
                '}';
    }
}
