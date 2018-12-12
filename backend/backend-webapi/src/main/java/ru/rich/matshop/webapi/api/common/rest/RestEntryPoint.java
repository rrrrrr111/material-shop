package ru.rich.matshop.webapi.api.common.rest;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import ru.rich.matshop.util.ExceptionUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

import static org.apache.commons.lang3.tuple.Pair.of;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static ru.rich.matshop.util.ExceptionUtil.findExceptionOfType;

@ControllerAdvice
public class RestEntryPoint extends AbstractRestController implements AuthenticationEntryPoint {

    private static final Pair<String, Integer> DEFAULT_RESPONSE_STATUS = of(
            UNAUTHORIZED.getReasonPhrase(),
            UNAUTHORIZED.value()
    );
    private static final Map<Class<? extends AuthenticationException>, Pair<String, Integer>> EXCEPTION_TO_RESPONSE_STATUS_MAP =
            Map.of(
                    BadCredentialsException.class, of(
                            "Логин или пароль пользователя введен не верно",
                            UNAUTHORIZED.value()
                    ),
                    UsernameNotFoundException.class, of(
                            "Пользователь с указанным Email не найден, Вам необходимо зарегистрироваться",
                            UNAUTHORIZED.value()
                    ),
                    LockedException.class, of(
                            "Учетная запись пользователя заблокирована",
                            UNAUTHORIZED.value()
                    ),
                    InsufficientAuthenticationException.class, of( // попытка доступа к закрытому ресурсу без авторизации
                            FORBIDDEN.getReasonPhrase(),
                            FORBIDDEN.value()
                    ),
                    InternalAuthenticationServiceException.class, of( // любая др ошибка, например не доступна БД
                            "Unknown error",
                            UNAUTHORIZED.value()
                    )
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
                         AuthenticationException ex) throws IOException {
        log.warn("Authentication exception {}", ExceptionUtil.getAllErrorMessage(ex));

        Pair<String, Integer> status = resolveResponseStatus(ex);
        response.sendError(status.getRight(), status.getLeft());
    }

    /**
     * Подготовка сообщения об ошибке на UI при авторизации ({@link AuthenticationException}),
     * используется при выбросе ошибки из контролеров
     */
    @ExceptionHandler(AuthenticationException.class)
    @ResponseBody
    public UserExceptionResponse handle(HttpServletResponse response,
                                        AuthenticationException ex) {
        log.warn("Exception on authentication", ex);

        Pair<String, Integer> status = resolveResponseStatus(ex);
        response.setStatus(status.getRight());
        return prepareResponse(new UserExceptionResponse(status.getLeft()));
    }

    private Pair<String, Integer> resolveResponseStatus(AuthenticationException e) {
        for (var entry : EXCEPTION_TO_RESPONSE_STATUS_MAP.entrySet()) {
            if (findExceptionOfType(e, entry.getKey()) != null) {
                return entry.getValue();
            }
        }
        return DEFAULT_RESPONSE_STATUS;
    }
}
