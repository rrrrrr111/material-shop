package ru.rich.matshop.webapi.api.common.context;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Closeable;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;


/**
 * Кэш в контексте потока выполнения. Используется для кэширования различных часто используемых
 * данных для избежания необходимости прокидывания их виде параметров.
 */
public class ThreadContext implements Serializable, Closeable {
    private static final long serialVersionUID = 1L;
    private static final Logger log = LoggerFactory.getLogger(ThreadContext.class);

    private static final ThreadLocal<Map<String, Object>> holder = new ThreadLocal<>();

    private static final ThreadContext INSTANCE = new ThreadContext();

    private ThreadContext() {
    }

    public static ThreadContext getInstance() {
        return INSTANCE;
    }

    /**
     * Возвращает инстанс из кэша по имени класса.
     */
    public static <T> T get(Class<T> clazz) {
        return getInstance().getData(clazz);
    }

    /**
     * Возвращает все элементы контекста
     */
    public static Map<String, Object> getAll() {
        return new HashMap<>(getContextMap());
    }

    /**
     * Кладет инстанс в кэш.
     */
    public static <T> ThreadContext put(Class<T> clazz, T obj) {
        return getInstance().putData(clazz, obj);
    }

    /**
     * Кладет все элементы в кэш.
     */
    public ThreadContext putAll(Map<String, Object> map) {
        getContextMap().putAll(map);
        return this;
    }

    /**
     * Возвращает инстанс из кэша по имени класса.
     */
    public <T> T getData(Class<T> clazz) {
        T obj = (T) getContextMap().get(clazz.getName());
        if (log.isTraceEnabled()) {
            log.trace("Retrieved from context cache {}", obj);
        }
        return obj;
    }

    /**
     * Кладет инстанс в кэш.
     */
    public <T> ThreadContext putData(Class<T> clazz, T obj) {
        getContextMap().put(clazz.getName(), obj);
        if (log.isTraceEnabled()) {
            log.trace("Context cached object {}", obj);
        }
        return this;
    }

    /**
     * Очистка кэша.
     */
    @Override
    public void close() {
        holder.remove();
    }

    /**
     * Установить/получить текущий контекст
     */
    private static Map<String, Object> getContextMap() {
        Map<String, Object> ctx = holder.get();
        if (ctx == null) {
            ctx = new HashMap<>(5);
            holder.set(ctx);
        }
        return ctx;
    }
}