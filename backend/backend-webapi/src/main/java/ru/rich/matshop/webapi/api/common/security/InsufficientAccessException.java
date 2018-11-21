package ru.rich.matshop.webapi.api.common.security;

import org.springframework.security.core.AuthenticationException;

public class InsufficientAccessException extends AuthenticationException {

    public InsufficientAccessException(String msg) {
        super(msg);
    }
}
