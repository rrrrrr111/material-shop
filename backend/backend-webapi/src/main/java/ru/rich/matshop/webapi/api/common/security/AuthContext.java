package ru.rich.matshop.webapi.api.common.security;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import ru.rich.matshop.webapi.api.user.model.UserInfo;

/**
 *
 */
public class AuthContext {
    /**
     * @return Получение информации о текущем пользователе.
     */
    public static UserInfo getCurrentUser() {
        Authentication auth = getAuthentication();
        if (!isAuthenticated(auth)) {
            throw new InsufficientAuthenticationException("User not authenticated");
        }
        return (UserInfo) auth.getPrincipal();
    }

    /**
     * @return Получение id текущего пользователя.
     */
    public static Long getCurrentUserId() {
        return getCurrentUser().getId();
    }

    public static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public static void setAuthentication(Authentication authentication) {
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    /**
     * @return true - пользователь авторизован, иначе false
     */
    public static boolean isAuthenticated() {
        return isAuthenticated(getAuthentication());
    }

    private static boolean isAuthenticated(Authentication auth) {
        if (auth == null || auth instanceof AnonymousAuthenticationToken) {
            return false;
        }
        return auth.isAuthenticated();
    }
}
