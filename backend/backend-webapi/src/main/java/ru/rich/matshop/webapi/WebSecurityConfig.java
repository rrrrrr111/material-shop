package ru.rich.matshop.webapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import ru.rich.matshop.webapi.api.common.rest.UserExceptionMessageService;
import ru.rich.matshop.webapi.api.user.auth.PersonAuthenticationFilter;
import ru.rich.matshop.webapi.api.user.auth.PersonDetailsService;

import java.util.Arrays;

import static org.springframework.http.HttpMethod.POST;
import static ru.rich.matshop.webapi.api.user.auth.AuthController.URL_LOGIN;
import static ru.rich.matshop.webapi.api.user.auth.AuthController.URL_LOGIN_FAILURE;
import static ru.rich.matshop.webapi.api.user.auth.AuthController.URL_LOGIN_PROCESSING;
import static ru.rich.matshop.webapi.api.user.auth.AuthController.URL_LOGIN_SUCCESS;
import static ru.rich.matshop.webapi.api.user.auth.AuthController.URL_SIGNOUT;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private static final String REQUEST_HEADER_X_XSRF_TOKEN = "X-CSRF-TOKEN";

    @Autowired
    private PersonDetailsService personDetailsService;

    /**
     * Безопасность API бэкенда
     */
    @Configuration
    @Order(1)
    public static class WebApiSecurityConfig extends WebSecurityConfigurerAdapter {
        @Autowired
        private RequestCache requestCache;
        @Autowired
        private UserExceptionMessageService userExceptionMessageService;
        @Autowired
        private PersonAuthenticationFilter personAuthenticationFilter;

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
                    .and().logout().logoutUrl(URL_SIGNOUT).clearAuthentication(true).permitAll()
                    .and().requestCache().requestCache(requestCache)
                    .and().addFilterBefore(personAuthenticationFilter, BasicAuthenticationFilter.class).httpBasic().authenticationEntryPoint(userExceptionMessageService)
                    .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and().cors()
                    .and().csrf().disable()
            //.and().csrf().csrfTokenRepository(csrfTokenRepository()).ignoringAntMatchers(AUTH_URL_PREFIX + "/**")
            //.formLogin().loginPage("/login").permitAll()
            //.and().logout().permitAll()
            ;
        }

        private CsrfTokenRepository csrfTokenRepository() {
            var repository = CookieCsrfTokenRepository.withHttpOnlyFalse();
            //var repository = new HttpSessionCsrfTokenRepository();
            repository.setHeaderName(REQUEST_HEADER_X_XSRF_TOKEN);
            return repository;
        }

        @Bean
        CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedOrigins(Arrays.asList("*"));
            configuration.setAllowedMethods(Arrays.asList(
                    HttpMethod.POST.name(), HttpMethod.GET.name(), HttpMethod.OPTIONS.name()
            ));
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
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(personDetailsService);
        provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
        provider.setHideUserNotFoundExceptions(false);
        //provider.setUserDetailsPasswordService(passwordManager); // todo смена пароля
        provider.afterPropertiesSet();

        auth.authenticationProvider(provider);
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
