package ru.rich.matshop.webapi.api.user;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public UserSaveResponse save(@RequestBody @Valid UserSaveRequest req) {

        var resp = prepareResponse(new UserSaveResponse());
        return resp;
    }

    @PostMapping("/api/be/user/signout")
    public SignoutResponse signout(@RequestBody @Valid SignoutRequest req) {

        var resp = prepareResponse(new SignoutResponse());
        return resp;
    }

    @PostMapping("/api/be/user/save-settings")
    public UserSaveSettingsResponse saveSettings(@RequestBody @Valid UserSaveSettingsRequest req) {

        var resp = prepareResponse(new UserSaveSettingsResponse());
        return resp;
    }

    @PostMapping("/api/be/user/change-password")
    public ChangePasswordResponse changePassword(@RequestBody @Valid ChangePasswordRequest req) {

        var resp = prepareResponse(new ChangePasswordResponse());
        return resp;
    }
}
