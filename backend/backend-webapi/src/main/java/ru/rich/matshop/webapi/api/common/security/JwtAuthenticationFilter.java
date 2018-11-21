package ru.rich.matshop.webapi.api.common.security;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import ru.rich.matshop.webapi.api.user.auth.AuthenticationCacheService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Фильтр для аутэнтификации через JSON Web Token (JWT)
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    public static final String HEADER_JWT = "x-auth-token";
    @Autowired
    private AuthenticationCacheService authenticationCacheService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {


        final var token = request.getHeader(HEADER_JWT);
        if (StringUtils.isNotBlank(token) && !"null".equals(token)) {

            final var auth = authenticationCacheService.getAuth(token);
            if (auth != null) {

                log.trace("User authenticated by JWT: {}, token: {}", auth, token);
                AuthContext.setAuthentication(auth);
            } else {

                log.trace("User not authenticated by JWT, authentication not found in cache by token: {}", token);
            }
        } else {

            log.trace("JWT not found");
        }
        chain.doFilter(request, response);
    }
}
