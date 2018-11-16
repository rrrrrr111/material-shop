package ru.rich.matshop.webapi.api.user;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.rich.matshop.webapi.api.common.rest.AbstractRestController;
import ru.rich.matshop.webapi.api.user.password.ChangePasswordRequest;
import ru.rich.matshop.webapi.api.user.password.ChangePasswordResponse;
import ru.rich.matshop.webapi.api.user.save.UserSaveRequest;
import ru.rich.matshop.webapi.api.user.save.UserSaveResponse;
import ru.rich.matshop.webapi.api.user.settings.UserSaveSettingsRequest;
import ru.rich.matshop.webapi.api.user.settings.UserSaveSettingsResponse;
import ru.rich.matshop.webapi.api.user.signout.SignoutRequest;
import ru.rich.matshop.webapi.api.user.signout.SignoutResponse;

import javax.validation.Valid;

@RestController
class UserController extends AbstractRestController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/be/user/save")
    public UserSaveResponse save(@Valid UserSaveRequest request) {

        var resp = prepareResponse(new UserSaveResponse());
        return resp;
    }

    @PostMapping("/api/be/user/signout")
    public SignoutResponse signout(@Valid SignoutRequest request) {

        var resp = prepareResponse(new SignoutResponse());
        return resp;
    }

    @PostMapping("/api/be/user/save-settings")
    public UserSaveSettingsResponse saveSettings(@Valid UserSaveSettingsRequest request) {

        var resp = prepareResponse(new UserSaveSettingsResponse());
        return resp;
    }

    @PostMapping("/api/be/user/change-password")
    public ChangePasswordResponse changePassword(@Valid ChangePasswordRequest request) {

        var resp = prepareResponse(new ChangePasswordResponse());
        return resp;
    }
}
