package ru.rich.matshop.webapi.api.common.cors;

import org.springframework.stereotype.Component;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Поддержка HTTP заголовков для прохождения проверок CORS
 */
@Component
public class CorsFilter implements Filter {

    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        var allowedUrls = "*";

        var r = (HttpServletResponse) response;
        r.setHeader("Access-Control-Allow-Origin", allowedUrls);
        r.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        r.setHeader("Access-Control-Max-Age", "3600");
        r.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        chain.doFilter(request, r);
    }

    public void init(FilterConfig filterConfig) {
    }

    public void destroy() {
    }
}