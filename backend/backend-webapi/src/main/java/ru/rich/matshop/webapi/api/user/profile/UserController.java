package ru.rich.matshop.webapi.api.user.profile;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.rich.matshop.webapi.api.common.rest.AbstractRestController;
import ru.rich.matshop.webapi.api.user.UserService;
import ru.rich.matshop.webapi.api.user.model.Person;
import ru.rich.matshop.webapi.api.user.model.PersonValidation.OnSave;
import ru.rich.matshop.webapi.api.user.profile.password.ChangePasswordRequest;
import ru.rich.matshop.webapi.api.user.profile.password.ChangePasswordResponse;
import ru.rich.matshop.webapi.api.user.profile.save.UserSaveRequest;
import ru.rich.matshop.webapi.api.user.profile.save.UserSaveResponse;
import ru.rich.matshop.webapi.api.user.profile.settings.SettingsChange;
import ru.rich.matshop.webapi.api.user.profile.settings.UserSaveSettingsRequest;
import ru.rich.matshop.webapi.api.user.profile.settings.UserSaveSettingsResponse;

import javax.validation.Valid;
import java.util.Date;

import static org.apache.commons.lang3.StringUtils.defaultIfEmpty;
import static ru.rich.matshop.webapi.WebSecurityConfig.WebApiSecurityConfig.API_URL_PREFIX;

@RestController
public class UserController extends AbstractRestController {
    private static final String USER_URL_PREFIX = API_URL_PREFIX + "/user";

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(USER_URL_PREFIX + "/save")
    @Transactional
    public UserSaveResponse save(@RequestBody
                                 @Validated({OnSave.class})
                                         UserSaveRequest req) {
        Person reqPerson = fromUi(req.getPerson());
        Person respPerson = toUi(userService.updateProfile(reqPerson));

        var resp = prepareResponse(new UserSaveResponse());
        resp.setPerson(respPerson);
        return resp;
    }

    @PostMapping(USER_URL_PREFIX + "/save-settings")
    @Transactional
    public UserSaveSettingsResponse saveSettings(@RequestBody
                                                 @Valid
                                                         UserSaveSettingsRequest req) {
        SettingsChange sc = req.getSettingsChange();
        // todo

        var resp = prepareResponse(new UserSaveSettingsResponse());
        return resp;
    }

    @PostMapping(USER_URL_PREFIX + "/change-password")
    @Transactional
    public ChangePasswordResponse changePassword(@RequestBody
                                                 @Valid
                                                         ChangePasswordRequest req) {
        var pc = req.getPasswordChange();
        Date editDate = userService.changePassword(pc);

        var resp = prepareResponse(new ChangePasswordResponse());
        resp.setPersonEditDate(editDate);
        return resp;
    }

    public static Person fromUi(Person p) {
        p.setPhone(defaultIfEmpty(p.getPhone(), null));
        p.setEmail(defaultIfEmpty(p.getEmail(), null));
        p.setFirstName(defaultIfEmpty(p.getFirstName(), null));
        p.setLastName(defaultIfEmpty(p.getLastName(), null));
        p.setPassword(defaultIfEmpty(p.getPassword(), null));
        return p;
    }

    public static Person toUi(Person p) {
        p.setPhone(defaultIfEmpty(p.getPhone(), ""));
        p.setEmail(defaultIfEmpty(p.getEmail(), ""));
        p.setFirstName(defaultIfEmpty(p.getFirstName(), ""));
        p.setLastName(defaultIfEmpty(p.getLastName(), ""));
        p.setPassword(defaultIfEmpty(p.getPassword(), ""));
        return p;
    }
}
