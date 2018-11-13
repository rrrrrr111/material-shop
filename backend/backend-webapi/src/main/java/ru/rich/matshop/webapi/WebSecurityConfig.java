package ru.rich.matshop.webapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.http.HttpMethod.POST;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private static final String REQUEST_HEADER_X_XSRF_TOKEN = "X-CSRF-TOKEN";

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers(POST,
                        "/api/be/**", // backend
                        "/web/**")// web
                .permitAll()
                .anyRequest().authenticated().and()
                .cors().and()
                .csrf().disable()
        //.csrf().csrfTokenRepository(csrfTokenRepository()).and()
        //.formLogin().loginPage("/login").permitAll()
        //.and().logout().permitAll()
        ;
    }

    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("torgmister").password("s00pErs3creT").roles("USER");
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST"));
        configuration.setAllowedHeaders(Arrays.asList("Origin", "X-Requested-With", "Accept", "Content-Type", REQUEST_HEADER_X_XSRF_TOKEN));
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/be/**", configuration);
        return source;
    }

    private CsrfTokenRepository csrfTokenRepository() {
        //var repository = CookieCsrfTokenRepository.withHttpOnlyFalse();
        var repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName(REQUEST_HEADER_X_XSRF_TOKEN);
        return repository;
    }
}
