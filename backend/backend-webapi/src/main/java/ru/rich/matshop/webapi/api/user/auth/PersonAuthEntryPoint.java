package ru.rich.matshop.webapi.api.user.auth;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import ru.rich.matshop.webapi.util.ExceptionUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @see org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint
 */
@Component
public class PersonAuthEntryPoint implements AuthenticationEntryPoint {

    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {

        final String message;
        if (ExceptionUtil.findExceptionOfType(authException, BadCredentialsException.class) != null) {
            message = "Логин или пароль пользователя введен не верно";

        } else if (ExceptionUtil.findExceptionOfType(authException, UsernameNotFoundException.class) != null) {
            message = "Пользователь с указанным Email не найден, Вам необходимо зарегистрироваться";

        } else if (ExceptionUtil.findExceptionOfType(authException, LockedException.class) != null) {
            message = "Учетная запись пользователя заблокирована";

        } else {
            message = HttpStatus.UNAUTHORIZED.getReasonPhrase();
        }
        response.sendError(HttpStatus.UNAUTHORIZED.value(), message);
    }
}
