package ru.rich.matshop.webapi.api.user.auth;

import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ru.rich.matshop.webapi.api.common.rest.AbstractRestController;
import ru.rich.matshop.webapi.api.user.UserService;
import ru.rich.matshop.webapi.api.user.model.Person;
import ru.rich.matshop.webapi.api.user.signup.SignupRequest;
import ru.rich.matshop.webapi.api.user.signup.SignupResponse;

@RestController
public class AuthController extends AbstractRestController {

    public static final String URL_LOGIN = "/api/be/auth/login";
    public static final String URL_LOGIN_PROCESSING = "/api/be/auth/login-processing";
    public static final String URL_LOGIN_SUCCESS = "/api/be/auth/success";
    public static final String URL_LOGIN_FAILURE = "/api/be/auth/failure";
    public static final String URL_LOGIN_LOGOUT = "/api/be/auth/logout";

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Ответ на успешную проверку логин\пароль
     */
    @GetMapping(URL_LOGIN_PROCESSING)
    public @ResponseBody
    LoginResponse loginProcessing(
            Authentication authentication) {
        log.info("User authenticated {}", authentication);

        var resp = prepareResponse(new LoginResponse());
        resp.setPerson((Person) authentication.getPrincipal());

        return resp;
    }

    @PostMapping("/api/be/auth/signup")
    @Transactional
    public SignupResponse signup(
            @RequestBody
            //@Valid
                    SignupRequest request) {

        Person person = userService.signup(request.getPerson());
        var resp = prepareResponse(new SignupResponse());
        resp.setPerson(person);
        return resp;
    }
}
