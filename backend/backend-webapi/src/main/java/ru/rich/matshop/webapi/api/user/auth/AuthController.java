package ru.rich.matshop.webapi.api.user.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ru.rich.matshop.webapi.api.common.rest.AbstractRestController;
import ru.rich.matshop.webapi.api.common.security.AuthContext;
import ru.rich.matshop.webapi.api.user.UserService;
import ru.rich.matshop.webapi.api.user.auth.signin.LoginResponse;
import ru.rich.matshop.webapi.api.user.auth.signout.SignoutResponse;
import ru.rich.matshop.webapi.api.user.auth.signup.SignupRequest;
import ru.rich.matshop.webapi.api.user.auth.signup.SignupResponse;
import ru.rich.matshop.webapi.api.user.model.Person;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static ru.rich.matshop.webapi.WebSecurityConfig.WebApiSecurityConfig.URL_LOGIN_PROCESSING;
import static ru.rich.matshop.webapi.WebSecurityConfig.WebApiSecurityConfig.URL_SIGNOUT;
import static ru.rich.matshop.webapi.WebSecurityConfig.WebApiSecurityConfig.URL_SIGNUP;
import static ru.rich.matshop.webapi.api.common.security.JwtAuthenticationFilter.HEADER_JWT;
import static ru.rich.matshop.webapi.api.user.profile.UserController.fromUi;
import static ru.rich.matshop.webapi.api.user.profile.UserController.toUi;

@RestController
public class AuthController extends AbstractRestController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final AuthenticationCacheService authenticationCacheService;

    public AuthController(UserService userService,
                          AuthenticationManager authenticationManager,
                          AuthenticationCacheService authenticationCacheService) {
        this.userService = userService;
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
            HttpServletRequest request, HttpServletResponse response,
            Authentication auth) {

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
                    //@Validated({WithPassword.class, WithAgreementChecked.class})
                    SignupRequest req) {

        Person person = userService.signup(fromUi(req.getPerson()));
        Authentication auth = userSignin(request, person.getEmail(), person.getPassword());

        String newToken = authenticationCacheService.putAuth(auth);
        clearUserAuth(oldToken);

        response.addHeader(HEADER_JWT, newToken);

        var resp = prepareResponse(new SignupResponse());
        resp.setPerson(toUi(person));
        return resp;
    }

    @GetMapping(URL_SIGNOUT)
    public SignoutResponse signout(
            @RequestHeader(HEADER_JWT) String token) {

        clearUserAuth(token);

        return prepareResponse(new SignoutResponse());
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
