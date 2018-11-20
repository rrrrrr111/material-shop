package ru.rich.matshop.webapi.api.user.auth;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.util.UUID;

@Service
public class AuthenticationCache {

    private Cache<String, Authentication> tokenCache;
    @Value("${matshop.webapi.tokenCacheMaximumSize:1000}")
    private Integer tokenCacheMaximumSize;
    @Value("${matshop.webapi.tokenCacheTimeoutInMinutes:60}")
    private Integer tokenCacheTimeoutInMinutes;

    @PostConstruct
    public void init() {
        tokenCache = CacheBuilder.newBuilder().maximumSize(tokenCacheMaximumSize)
                .expireAfterAccess(Duration.ofMinutes(tokenCacheTimeoutInMinutes)).build();
    }

    public Authentication getToken(String tokenId) {
        return tokenCache.getIfPresent(tokenId);
    }

    public String putToken(Authentication token) {
        String tokenId = generateTokenId();
        tokenCache.put(tokenId, token);
        return tokenId;
    }

    private String generateTokenId() {
        return UUID.randomUUID().toString();
    }
}
