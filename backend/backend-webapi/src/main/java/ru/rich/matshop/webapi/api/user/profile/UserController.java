package ru.rich.matshop.webapi.api.user.profile;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.rich.matshop.webapi.api.common.rest.AbstractRestController;
import ru.rich.matshop.webapi.api.common.security.AuthContext;
import ru.rich.matshop.webapi.api.user.PersonService;
import ru.rich.matshop.webapi.api.user.model.Person;
import ru.rich.matshop.webapi.api.user.model.PersonValidation.OnSave;
import ru.rich.matshop.webapi.api.user.profile.load.UserLoadResponse;
import ru.rich.matshop.webapi.api.user.profile.password.ChangePasswordRequest;
import ru.rich.matshop.webapi.api.user.profile.password.ChangePasswordResponse;
import ru.rich.matshop.webapi.api.user.profile.save.UserSaveRequest;
import ru.rich.matshop.webapi.api.user.profile.save.UserSaveResponse;
import ru.rich.matshop.webapi.api.user.profile.settings.SettingsChange;
import ru.rich.matshop.webapi.api.user.profile.settings.UserSaveSettingsRequest;
import ru.rich.matshop.webapi.api.user.profile.settings.UserSaveSettingsResponse;

import javax.validation.Valid;
import javax.validation.groups.Default;
import java.util.Date;

import static org.apache.commons.lang3.StringUtils.defaultIfEmpty;
import static org.apache.commons.lang3.StringUtils.trimToNull;
import static ru.rich.matshop.webapi.WebSecurityConfig.WebApiSecurityConfig.API_URL_PREFIX;

@RestController
public class UserController extends AbstractRestController {
    public static final String USER_URL_PREFIX = API_URL_PREFIX + "/user";

    private final PersonService personService;

    public UserController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping(USER_URL_PREFIX + "/load")
    public UserLoadResponse load() {
        Person respPerson = toUi(personService.get(AuthContext.getCurrentUserId()));

        var resp = prepareResponse(new UserLoadResponse());
        resp.setPerson(respPerson);
        return resp;
    }

    @PostMapping(USER_URL_PREFIX + "/save")
    @Transactional
    public UserSaveResponse save(@RequestBody
                                 @Validated({OnSave.class, Default.class})
                                         UserSaveRequest req) {
        Person reqPerson = fromUi(req.getPerson());
        Person respPerson = toUi(personService.update(reqPerson));

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
        Date editDate = personService.updateSettings(sc);

        var resp = prepareResponse(new UserSaveSettingsResponse());
        resp.setPersonEditDate(editDate);
        return resp;
    }

    @PostMapping(USER_URL_PREFIX + "/change-password")
    @Transactional
    public ChangePasswordResponse changePassword(@RequestBody
                                                 @Valid
                                                         ChangePasswordRequest req) {
        var pc = req.getPasswordChange();
        Date editDate = personService.updatePassword(pc);

        var resp = prepareResponse(new ChangePasswordResponse());
        resp.setPersonEditDate(editDate);
        return resp;
    }

    public static Person fromUi(Person p) {
        p.setPhone(defaultIfEmpty(p.getPhone(), null));
        p.setEmail(defaultIfEmpty(p.getEmail(), null));
        p.setFirstName(trimToNull(p.getFirstName()));
        p.setLastName(trimToNull(p.getLastName()));
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
