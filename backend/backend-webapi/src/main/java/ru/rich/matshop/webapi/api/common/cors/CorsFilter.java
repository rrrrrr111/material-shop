package ru.rich.matshop.webapi.api.common.cors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Поддержка HTTP заголовков для прохождения проверок CORS
 */
//@Component
public class CorsFilter implements Filter {
    private static Logger log = LoggerFactory.getLogger(CorsFilter.class);

    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        log.info("req: {} resp: {}", request, response);

        var resp = (HttpServletResponse) response;
        var req = (HttpServletRequest) request;

        var allowedUrls = "*";

        resp.setHeader("Access-Control-Allow-Origin", allowedUrls);
        resp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, HEAD, PUT, DELETE");
        resp.setHeader("Access-Control-Max-Age", "3600");
        resp.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Accept, Content-Type");

        if (req.getMethod().equals("OPTIONS")) {
            resp.setStatus(HttpServletResponse.SC_ACCEPTED);
            return;
        }

        chain.doFilter(request, resp);
    }

    public void init(FilterConfig filterConfig) {
    }

    public void destroy() {
    }
}