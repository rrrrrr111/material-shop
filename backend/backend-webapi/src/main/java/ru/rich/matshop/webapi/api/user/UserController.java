package ru.rich.matshop.webapi.api.user;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.rich.matshop.webapi.api.common.rest.AbstractRestController;
import ru.rich.matshop.webapi.api.user.model.Person;
import ru.rich.matshop.webapi.api.user.password.ChangePasswordRequest;
import ru.rich.matshop.webapi.api.user.password.ChangePasswordResponse;
import ru.rich.matshop.webapi.api.user.save.UserSaveRequest;
import ru.rich.matshop.webapi.api.user.save.UserSaveResponse;
import ru.rich.matshop.webapi.api.user.settings.UserSaveSettingsRequest;
import ru.rich.matshop.webapi.api.user.settings.UserSaveSettingsResponse;

import javax.validation.Valid;

import static org.apache.commons.lang3.StringUtils.defaultIfEmpty;
import static ru.rich.matshop.webapi.WebSecurityConfig.WebApiSecurityConfig.API_URL_PREFIX;

@RestController
public
class UserController extends AbstractRestController {
    private static final String USER_URL_PREFIX = API_URL_PREFIX + "/user";

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(USER_URL_PREFIX + "/save")
    public UserSaveResponse save(@RequestBody
                                 @Valid
                                         UserSaveRequest req) {
        var resp = prepareResponse(new UserSaveResponse());
        return resp;
    }

    @PostMapping(USER_URL_PREFIX + "/save-settings")
    public UserSaveSettingsResponse saveSettings(@RequestBody
                                                 @Valid
                                                         UserSaveSettingsRequest req) {

        var resp = prepareResponse(new UserSaveSettingsResponse());
        return resp;
    }

    @PostMapping(USER_URL_PREFIX + "/change-password")
    public ChangePasswordResponse changePassword(@RequestBody
                                                 @Valid
                                                         ChangePasswordRequest req) {

        var resp = prepareResponse(new ChangePasswordResponse());
        return resp;
    }

    public static Person fromUi(Person person) {

        person.setPhone(defaultIfEmpty(person.getPhone(), null));
        person.setEmail(defaultIfEmpty(person.getEmail(), null));
        person.setFirstName(defaultIfEmpty(person.getFirstName(), null));
        person.setLastName(defaultIfEmpty(person.getLastName(), null));
        person.setPassword(defaultIfEmpty(person.getPassword(), null));
        return person;
    }
}
