package ru.rich.matshop.webapi.api.user;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.rich.matshop.webapi.api.user.password.ChangePasswordRequest;
import ru.rich.matshop.webapi.api.user.password.ChangePasswordResponse;
import ru.rich.matshop.webapi.api.user.save.UserSaveRequest;
import ru.rich.matshop.webapi.api.user.save.UserSaveResponse;
import ru.rich.matshop.webapi.api.user.settings.UserSaveSettingsRequest;
import ru.rich.matshop.webapi.api.user.settings.UserSaveSettingsResponse;
import ru.rich.matshop.webapi.api.user.signin.SigninRequest;
import ru.rich.matshop.webapi.api.user.signin.SigninResponse;
import ru.rich.matshop.webapi.api.user.signout.SignoutRequest;
import ru.rich.matshop.webapi.api.user.signout.SignoutResponse;
import ru.rich.matshop.webapi.api.user.signup.SignupRequest;
import ru.rich.matshop.webapi.api.user.signup.SignupResponse;

import javax.validation.Valid;

@RestController
class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/be/user/signin")
    public SigninResponse getFeedList(SigninRequest request) {

        var response = new SigninResponse();
        return response;
    }

    @PostMapping("/api/be/user/signup")
    public SignupResponse getFeedList(@Valid SignupRequest request) {

        var response = new SignupResponse();
        return response;
    }

    @PostMapping("/api/be/user/signout")
    public SignoutResponse getFeedList(SignoutRequest request) {

        var response = new SignoutResponse();
        return response;
    }

    @PostMapping("/api/be/user/save")
    public UserSaveResponse getFeedList(UserSaveRequest request) {

        var response = new UserSaveResponse();
        return response;
    }

    @PostMapping("/api/be/user/save-settings")
    public UserSaveSettingsResponse getFeedList(UserSaveSettingsRequest request) {

        var response = new UserSaveSettingsResponse();
        return response;
    }

    @PostMapping("/api/be/user/change-password")
    public ChangePasswordResponse getFeedList(ChangePasswordRequest request) {

        var response = new ChangePasswordResponse();
        return response;
    }
}
