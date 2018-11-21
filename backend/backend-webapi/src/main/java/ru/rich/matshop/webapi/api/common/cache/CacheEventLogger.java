package ru.rich.matshop.webapi.api.common.cache;

import org.ehcache.event.CacheEvent;
import org.ehcache.event.CacheEventListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class CacheEventLogger implements CacheEventListener {
    private static final Logger log = LoggerFactory.getLogger(CacheEventLogger.class);

    @Override
    public void onEvent(CacheEvent cacheEvent) {
        log.trace("Event: {} key: {}", cacheEvent.getType(), cacheEvent.getKey());
    }
}