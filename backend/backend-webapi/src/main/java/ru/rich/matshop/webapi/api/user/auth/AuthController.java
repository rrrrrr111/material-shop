package ru.rich.matshop.webapi.api.user.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ru.rich.matshop.webapi.api.common.rest.AbstractRestController;
import ru.rich.matshop.webapi.api.common.rest.EmptyResponse;
import ru.rich.matshop.webapi.api.common.security.AuthContext;
import ru.rich.matshop.webapi.api.user.PersonService;
import ru.rich.matshop.webapi.api.user.auth.signin.LoginResponse;
import ru.rich.matshop.webapi.api.user.auth.signup.SignupRequest;
import ru.rich.matshop.webapi.api.user.auth.signup.SignupResponse;
import ru.rich.matshop.webapi.api.user.model.Person;
import ru.rich.matshop.webapi.api.user.model.PersonValidation.OnSignup;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.groups.Default;

import static ru.rich.matshop.webapi.WebSecurityConfig.WebApiSecurityConfig.URL_LOGIN_PROCESSING;
import static ru.rich.matshop.webapi.WebSecurityConfig.WebApiSecurityConfig.URL_SIGNOUT;
import static ru.rich.matshop.webapi.WebSecurityConfig.WebApiSecurityConfig.URL_SIGNUP;
import static ru.rich.matshop.webapi.api.common.security.JwtAuthenticationFilter.HEADER_JWT;
import static ru.rich.matshop.webapi.api.user.profile.UserController.fromUi;
import static ru.rich.matshop.webapi.api.user.profile.UserController.toUi;

@RestController
public class AuthController extends AbstractRestController {

    private final PersonService personService;
    private final AuthenticationManager authenticationManager;
    private final AuthenticationCacheService authenticationCacheService;

    public AuthController(PersonService personService,
                          AuthenticationManager authenticationManager,
                          AuthenticationCacheService authenticationCacheService) {
        this.personService = personService;
        this.authenticationManager = authenticationManager;
        this.authenticationCacheService = authenticationCacheService;
    }

    /**
     * Ответ на успешную проверку логин\пароль
     */
    @GetMapping(URL_LOGIN_PROCESSING)
    public @ResponseBody
    LoginResponse afterLoginSuccess(
            @RequestHeader(HEADER_JWT) String oldToken,
            HttpServletResponse response, Authentication auth) {

        String newToken = authenticationCacheService.putAuth(auth);
        clearUserAuth(oldToken);

        response.addHeader(HEADER_JWT, newToken);

        var resp = prepareResponse(new LoginResponse());
        resp.setPerson(toUi((Person) auth.getPrincipal()));
        return resp;
    }

    @PostMapping(URL_SIGNUP)
    @Transactional
    public SignupResponse signup(
            @RequestHeader(HEADER_JWT) String oldToken,
            HttpServletRequest request, HttpServletResponse response,
            @RequestBody
            @Validated({OnSignup.class, Default.class})
                    SignupRequest req) {

        Person person = personService.signup(fromUi(req.getPerson()));
        Authentication auth = userSignin(request, person.getEmail(), person.getPassword());

        String newToken = authenticationCacheService.putAuth(auth);
        clearUserAuth(oldToken);

        response.addHeader(HEADER_JWT, newToken);

        var resp = prepareResponse(new SignupResponse());
        resp.setPerson(toUi(person));
        return resp;
    }

    @GetMapping(URL_SIGNOUT)
    public EmptyResponse signout(
            @RequestHeader(HEADER_JWT) String token) {

        clearUserAuth(token);

        return prepareResponse(new EmptyResponse());
    }

    private Authentication userSignin(HttpServletRequest request, String username, String password) {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username, password);
        auth.setDetails(new WebAuthenticationDetails(request));
        Authentication authentication = authenticationManager.authenticate(auth);
        AuthContext.setAuthentication(authentication);
        return auth;
    }

    private void clearUserAuth(String token) {
        authenticationCacheService.removeAuth(token);
    }
}
