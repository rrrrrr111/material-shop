package ru.rich.matshop.webapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import ru.rich.matshop.webapi.api.common.rest.UserExceptionMessageService;
import ru.rich.matshop.webapi.api.common.security.JwtAuthenticationFilter;
import ru.rich.matshop.webapi.api.user.auth.PersonDetailsService;

import java.util.Arrays;

import static org.springframework.http.HttpMethod.POST;
import static ru.rich.matshop.webapi.api.common.security.JwtAuthenticationFilter.HEADER_JWT;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private PersonDetailsService personDetailsService;

    /**
     * Безопасность API бэкенда
     */
    @Configuration
    @Order(1)
    public static class WebApiSecurityConfig extends WebSecurityConfigurerAdapter {

        public static final String API_URL_PREFIX = "/api/be";
        public static final String AUTH_URL_PREFIX = API_URL_PREFIX + "/auth";
        public static final String URL_LOGIN = AUTH_URL_PREFIX + "/login";
        public static final String URL_LOGIN_PROCESSING = AUTH_URL_PREFIX + "/login-processing";
        public static final String URL_LOGIN_SUCCESS = AUTH_URL_PREFIX + "/success";
        public static final String URL_LOGIN_FAILURE = AUTH_URL_PREFIX + "/failure";
        public static final String URL_SIGNUP = AUTH_URL_PREFIX + "/signup";
        public static final String URL_SIGNOUT = AUTH_URL_PREFIX + "/signout";
        private static final String REQUEST_XSRF = "X-CSRF-TOKEN";

        @Autowired
        private RequestCache requestCache;
        @Autowired
        private UserExceptionMessageService userExceptionMessageService;
        @Autowired
        private JwtAuthenticationFilter jwtAuthenticationFilter;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .antMatcher(API_URL_PREFIX + "/**").authorizeRequests()
                    .antMatchers(POST, API_URL_PREFIX + "/user/**", API_URL_PREFIX + "/order/list").authenticated()
                    .antMatchers(API_URL_PREFIX + "/**").permitAll()
                    .anyRequest().authenticated()
                    .and().headers().xssProtection()
                    .and()
                    .and().formLogin().loginProcessingUrl(URL_LOGIN_PROCESSING).loginPage(URL_LOGIN).failureUrl(URL_LOGIN_FAILURE).defaultSuccessUrl(URL_LOGIN_SUCCESS, false).permitAll()
                    .and().logout().logoutUrl(URL_SIGNOUT).logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK)).permitAll()
                    .and().requestCache().requestCache(requestCache)
                    .and().addFilterBefore(jwtAuthenticationFilter, BasicAuthenticationFilter.class).httpBasic().authenticationEntryPoint(userExceptionMessageService)
                    .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and().cors()
                    .and().csrf().disable()
            //.and().csrf().csrfTokenRepository(csrfTokenRepository()).ignoringAntMatchers(AUTH_URL_PREFIX + "/**")
            ;
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
                    HEADER_JWT,
                    REQUEST_XSRF
            ));
            configuration.setExposedHeaders(Arrays.asList(
                    HEADER_JWT
            ));
            configuration.setMaxAge(3600L);

            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration(API_URL_PREFIX + "/**", configuration);
            return source;
        }

        private CsrfTokenRepository csrfTokenRepository() {
            var repository = CookieCsrfTokenRepository.withHttpOnlyFalse();
            //var repository = new HttpSessionCsrfTokenRepository();
            repository.setHeaderName(REQUEST_XSRF);
            return repository;
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

    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/web/sitemap.xml*")
                .antMatchers("/error");
    }
}
