package ru.rich.matshop.webapi.api.user.model;

import org.springframework.security.core.GrantedAuthority;

import java.util.function.Predicate;

/**
 * Возможность пользователя на основе его роли.
 */
public interface UserAbility extends Predicate<Role>, GrantedAuthority {
}

