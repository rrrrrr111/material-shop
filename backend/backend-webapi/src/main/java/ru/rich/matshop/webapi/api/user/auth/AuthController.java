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
import ru.rich.matshop.webapi.api.user.auth.signin.LoginResponse;
import ru.rich.matshop.webapi.api.user.auth.signout.SignoutResponse;
import ru.rich.matshop.webapi.api.user.auth.signup.SignupRequest;
import ru.rich.matshop.webapi.api.user.auth.signup.SignupResponse;
import ru.rich.matshop.webapi.api.user.model.Person;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class AuthController extends AbstractRestController {

    public static final String AUTH_URL_PREFIX = "/api/be/auth";
    public static final String URL_LOGIN = AUTH_URL_PREFIX + "/login";
    public static final String URL_LOGIN_PROCESSING = AUTH_URL_PREFIX + "/login-processing";
    public static final String URL_LOGIN_SUCCESS = AUTH_URL_PREFIX + "/success";
    public static final String URL_LOGIN_FAILURE = AUTH_URL_PREFIX + "/failure";
    public static final String URL_SIGNOUT = AUTH_URL_PREFIX + "/signout";
    public static final String HEADER_X_AUTH_TOKEN = "X-AUTH-TOKEN";

    private final UserService userService;
    private final PersonTokenService personTokenService;

    public AuthController(UserService userService, PersonTokenService personTokenService) {
        this.userService = userService;
        this.personTokenService = personTokenService;
    }

    /**
     * Ответ на успешную проверку логин\пароль
     */
    @GetMapping(URL_LOGIN_PROCESSING)
    public @ResponseBody
    LoginResponse loginProcessing(
            HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) {
        var resp = prepareResponse(new LoginResponse());
        resp.setPerson((Person) authentication.getPrincipal());

        String tokenId = personTokenService.putToken(authentication);
        response.addHeader(HEADER_X_AUTH_TOKEN, tokenId);
        return resp;
    }

    @PostMapping(AUTH_URL_PREFIX + "/signup")
    @Transactional
    public SignupResponse signup(@RequestBody
                                         //@Valid
                                         SignupRequest req) {

        Person person = userService.signup(req.getPerson());
        var resp = prepareResponse(new SignupResponse());
        resp.setPerson(person);
        return resp;
    }

    @GetMapping(URL_SIGNOUT)
    public SignoutResponse signout(Authentication authentication) {


        log.info("User signout {}", authentication);
        return prepareResponse(new SignoutResponse());
    }
}
