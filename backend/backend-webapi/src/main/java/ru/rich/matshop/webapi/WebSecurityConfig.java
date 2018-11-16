package ru.rich.matshop.webapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.http.HttpMethod.POST;
import static ru.rich.matshop.webapi.api.user.auth.AuthController.URL_LOGIN;
import static ru.rich.matshop.webapi.api.user.auth.AuthController.URL_LOGIN_FAILURE;
import static ru.rich.matshop.webapi.api.user.auth.AuthController.URL_LOGIN_LOGOUT;
import static ru.rich.matshop.webapi.api.user.auth.AuthController.URL_LOGIN_PROCESSING;
import static ru.rich.matshop.webapi.api.user.auth.AuthController.URL_LOGIN_SUCCESS;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private static final String REQUEST_HEADER_X_XSRF_TOKEN = "X-CSRF-TOKEN";

    /**
     * Безопасность API бэкенда
     */
    @Configuration
    @Order(1)
    public static class WebApiSecurityConfig extends WebSecurityConfigurerAdapter {
        @Autowired
        private RequestCache requestCache;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .antMatcher("/api/be/**").authorizeRequests()
                    .antMatchers(POST, "/api/be/user/**", "/api/be/order/list").authenticated()
                    .antMatchers("/api/be/**").permitAll()
                    .anyRequest().authenticated()
                    .and().headers().xssProtection()
                    .and()
                    .and().formLogin().loginProcessingUrl(URL_LOGIN_PROCESSING).loginPage(URL_LOGIN).failureUrl(URL_LOGIN_FAILURE).defaultSuccessUrl(URL_LOGIN_SUCCESS, false).permitAll()
                    .and().logout().logoutUrl(URL_LOGIN_LOGOUT).permitAll()
                    .and().exceptionHandling().accessDeniedPage("/api/be/error/access-denied")
                    .and().requestCache().requestCache(requestCache)
                    .and().httpBasic()
                    .and().cors()
                    .and().csrf().disable()
            //.csrf().csrfTokenRepository(csrfTokenRepository()).and()
            //.formLogin().loginPage("/login").permitAll()
            //.and().logout().permitAll()
            ;
        }

        private CsrfTokenRepository csrfTokenRepository() {
            //var repository = CookieCsrfTokenRepository.withHttpOnlyFalse();
            var repository = new HttpSessionCsrfTokenRepository();
            repository.setHeaderName(REQUEST_HEADER_X_XSRF_TOKEN);
            return repository;
        }

        @Bean
        CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedOrigins(Arrays.asList("*"));
            configuration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS"));
            configuration.setAllowCredentials(true);
            configuration.setAllowedHeaders(Arrays.asList(
                    "Origin",
                    "Authorization",
                    "X-Requested-With",
                    "Accept",
                    "Content-Type",
                    REQUEST_HEADER_X_XSRF_TOKEN));
            configuration.setMaxAge(3600L);

            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/api/be/**", configuration);
            return source;
        }
    }

    /**
     * Безопасность Web старниц и остальных URL
     */
    @Configuration
    @Order(2)
    public static class WebPagesSecurityConfig extends WebSecurityConfigurerAdapter {
        @Autowired
        private RequestCache requestCache;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .authorizeRequests()
                    .antMatchers("/web/**").permitAll()
                    .anyRequest().authenticated()
                    .and().formLogin().loginProcessingUrl("/web/auth/login-check").loginPage("/web/auth/login").failureUrl("/web/auth/login?login_error=t")
                    .and().logout().logoutUrl("/web/auth/logout")
                    .and().requestCache().requestCache(requestCache)
                    .and().httpBasic();
        }
    }

    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser(
                        User.withDefaultPasswordEncoder().username("torgmister").password("s00pErs3creT").roles("USER").build()
                )
                .withUser(
                        User.withDefaultPasswordEncoder().username("curdes@gmail.com").password("1").roles("USER").build()
                );
    }

    @Bean
    RequestCache requestCache() {
        return new HttpSessionRequestCache();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/web/sitemap.xml*")
                .antMatchers("/error");
    }
}
