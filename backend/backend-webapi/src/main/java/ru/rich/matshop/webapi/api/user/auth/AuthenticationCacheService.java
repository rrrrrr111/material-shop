package ru.rich.matshop.webapi.api.user.auth;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.util.UUID;

@Service
public class AuthenticationCacheService {
    protected final Logger log = LoggerFactory.getLogger(AuthenticationCacheService.class);

    private Cache<String, Authentication> authCache;
    @Value("${matshop.webapi.authCacheMaximumSize:1000}")
    private Integer authCacheMaximumSize;
    @Value("#{'${matshop.webapi.authCacheTimeoutInMinutes:}' ?: 60 * 24 * 30}")
    private Integer authCacheTimeoutInMinutes;

    @PostConstruct
    public void init() {
        authCache = CacheBuilder.newBuilder().maximumSize(authCacheMaximumSize)
                .expireAfterAccess(Duration.ofMinutes(authCacheTimeoutInMinutes)).build();
    }

    public Authentication getAuth(String token) {
        return authCache.getIfPresent(token);
    }

    public String putAuth(Authentication auth) {
        String token = generateToken();
        authCache.put(token, auth);
        log.trace("User authentication token put: {}, cache size: {}", token, authCache.size());
        return token;
    }

    private String generateToken() {
        return UUID.randomUUID().toString();
    }

    public void removeAuth(String token) {
        if (StringUtils.isNotBlank(token) && !"null".equals(token)) {
            authCache.invalidate(token);
            log.trace("User authentication token removed: {}, cache size: {}", token, authCache.size());
        }
    }
}
