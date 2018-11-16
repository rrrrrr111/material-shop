package ru.rich.matshop.webapi.api.user.auth;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import ru.rich.matshop.webapi.api.user.model.UserInfo;

/**
 *
 */
public class SecurityContext {
    /**
     * @return Получение информации о текущем пользователе.
     */
    public static UserInfo getCurrentUser() {
        return (UserInfo) getAuthenticationToken().getPrincipal();
    }

    /**
     * @return Получение id текущего пользователя.
     */
    public static Long getCurrentUserId() {
        return getCurrentUser().getId();
    }

    public static Authentication getAuthenticationToken() {

        Authentication localAuthToken = SecurityContextHolder.getContext().getAuthentication();
        if (localAuthToken == null || localAuthToken instanceof AnonymousAuthenticationToken) {
            throw new IllegalStateException("Пользователь не авторизован!");
        }
        return localAuthToken;
    }

    /**
     * @return true - пользователь авторизован, иначе false
     */
    public static boolean isAuthenticated() {
        Authentication localAuthToken = SecurityContextHolder.getContext().getAuthentication();
        return localAuthToken != null && !(localAuthToken instanceof AnonymousAuthenticationToken);
    }
}
