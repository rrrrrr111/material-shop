package ru.rich.matshop.webapi.api.user.auth;

import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ru.rich.matshop.webapi.WebSecurityConfig;
import ru.rich.matshop.webapi.api.common.rest.AbstractRestController;
import ru.rich.matshop.webapi.api.user.UserService;
import ru.rich.matshop.webapi.api.user.auth.signin.LoginResponse;
import ru.rich.matshop.webapi.api.user.auth.signout.SignoutResponse;
import ru.rich.matshop.webapi.api.user.auth.signup.SignupRequest;
import ru.rich.matshop.webapi.api.user.auth.signup.SignupResponse;
import ru.rich.matshop.webapi.api.user.model.Person;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static ru.rich.matshop.webapi.WebSecurityConfig.WebApiSecurityConfig.AUTH_URL_PREFIX;
import static ru.rich.matshop.webapi.WebSecurityConfig.WebApiSecurityConfig.URL_LOGIN_PROCESSING;
import static ru.rich.matshop.webapi.api.common.security.JwtAuthenticationFilter.HEADER_X_AUTH_TOKEN;

@RestController
public class AuthController extends AbstractRestController {

    private final UserService userService;
    private final AuthenticationCache authenticationCache;

    public AuthController(UserService userService, AuthenticationCache authenticationCache) {
        this.userService = userService;
        this.authenticationCache = authenticationCache;
    }

    /**
     * Ответ на успешную проверку логин\пароль
     */
    @GetMapping(URL_LOGIN_PROCESSING)
    public @ResponseBody
    LoginResponse afterLoginSuccess(
            HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) {

        String tokenId = authenticationCache.putToken(authentication);
        response.addHeader(HEADER_X_AUTH_TOKEN, tokenId);

        var resp = prepareResponse(new LoginResponse());
        resp.setPerson((Person) authentication.getPrincipal());
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

    @GetMapping(WebSecurityConfig.WebApiSecurityConfig.URL_SIGNOUT)
    public SignoutResponse signout(Authentication authentication) {


        log.info("User signout {}", authentication);
        return prepareResponse(new SignoutResponse());
    }
}
