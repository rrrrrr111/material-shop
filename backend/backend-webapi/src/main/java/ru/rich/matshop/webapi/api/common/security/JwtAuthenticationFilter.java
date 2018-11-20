package ru.rich.matshop.webapi.api.common.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import ru.rich.matshop.webapi.api.user.auth.AuthenticationCache;

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

    public static final String HEADER_X_AUTH_TOKEN = "X-AUTH-TOKEN";
    @Autowired
    private AuthenticationCache authenticationCache;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {


        final var tokenId = request.getHeader(HEADER_X_AUTH_TOKEN);
        if (tokenId != null) {

            final var authentication = authenticationCache.getToken(tokenId);
            if (authentication != null) {

                AuthContext.setAuthentication(authentication);
            }
        }
        chain.doFilter(request, response);
    }
}
