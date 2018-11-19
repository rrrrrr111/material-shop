package ru.rich.matshop.webapi.api.user.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import ru.rich.matshop.webapi.api.common.security.PersonSecurityContext;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static ru.rich.matshop.webapi.api.user.auth.AuthController.HEADER_X_AUTH_TOKEN;

@Component
public class PersonAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private PersonTokenService personTokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {


        final var tokenId = request.getHeader(HEADER_X_AUTH_TOKEN);
        if (tokenId != null) {

            final var authentication = personTokenService.getToken(tokenId);
            if (authentication != null) {

                PersonSecurityContext.setAuthentication(authentication);
            }
        }
        chain.doFilter(request, response);
    }
}
