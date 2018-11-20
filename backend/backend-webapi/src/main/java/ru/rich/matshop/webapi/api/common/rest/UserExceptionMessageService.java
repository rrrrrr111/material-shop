package ru.rich.matshop.webapi.api.common.rest;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static ru.rich.matshop.webapi.util.ExceptionUtil.findExceptionOfType;

@ControllerAdvice
public class UserExceptionMessageService extends AbstractRestController implements AuthenticationEntryPoint {

    private static final Map<Class<? extends AuthenticationException>, String> EXCEPTION_TO_MESSAGE_MAP =
            Map.of(
                    BadCredentialsException.class, "Логин или пароль пользователя введен не верно",
                    UsernameNotFoundException.class, "Пользователь с указанным Email не найден, Вам необходимо зарегистрироваться",
                    LockedException.class, "Учетная запись пользователя заблокирована"
            );

    /**
     * Подготовка сообщения об ошибке на UI при {@link UserException}
     */
    @ExceptionHandler(UserException.class)
    @ResponseStatus(BAD_REQUEST)
    @ResponseBody
    public UserExceptionResponse handle(UserException ex) {
        log.warn("Exception on request processing: {} user exception: '{}'", ex.getMessage(), ex.getUserMessage());

        return prepareResponse(new UserExceptionResponse(ex.getUserMessage()));
    }

    /**
     * Подготовка сообщения об ошибке на UI при авторизации ({@link AuthenticationException}),
     * используется из под Spring Security
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException ex) throws IOException, ServletException {

        response.sendError(UNAUTHORIZED.value(), findMessage(ex));
    }

    /**
     * Подготовка сообщения об ошибке на UI при авторизации ({@link AuthenticationException}),
     * используется при выбросе ошибки из контролеров
     */
    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(UNAUTHORIZED)
    @ResponseBody
    public UserExceptionResponse handle(AuthenticationException ex) {
        log.warn("Exception on authentication", ex.getMessage());

        return prepareResponse(new UserExceptionResponse(findMessage(ex)));
    }

    private String findMessage(AuthenticationException e) {
        for (var entry : EXCEPTION_TO_MESSAGE_MAP.entrySet()) {
            if (findExceptionOfType(e, entry.getKey()) != null) {
                return entry.getValue();
            }
        }
        return UNAUTHORIZED.getReasonPhrase();
    }
}
