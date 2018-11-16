package ru.rich.matshop.webapi.api.user.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    private static Logger log = LoggerFactory.getLogger(AuthController.class);

    public static final String URL_LOGIN = "/api/be/auth/login";
    public static final String URL_LOGIN_PROCESSING = "/api/be/auth/login-processing";
    public static final String URL_LOGIN_SUCCESS = "/api/be/auth/success";
    public static final String URL_LOGIN_FAILURE = "/api/be/auth/failure";
    public static final String URL_LOGIN_LOGOUT = "/api/be/auth/logout";

    /**
     * Ответ на успешную проверку логин\пароль
     */
    @GetMapping(URL_LOGIN_PROCESSING)
    public @ResponseBody
    LoginResponse loginProcessing(Authentication authentication) {

        log.info("User authenticated {}", authentication);
        return new LoginResponse("ok");
    }
}
