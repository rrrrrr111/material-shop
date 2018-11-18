package ru.rich.matshop.webapi.api.common.security;

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

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth instanceof AnonymousAuthenticationToken) {
            throw new IllegalStateException("Пользователь не авторизован!");
        }
        return auth;
    }

    /**
     * @return true - пользователь авторизован, иначе false
     */
    public static boolean isAuthenticated() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null && !(auth instanceof AnonymousAuthenticationToken);
    }
}
