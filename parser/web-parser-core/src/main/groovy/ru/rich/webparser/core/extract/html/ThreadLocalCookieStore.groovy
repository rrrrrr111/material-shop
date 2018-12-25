package ru.rich.webparser.core.extract.html

import groovy.transform.CompileStatic
import groovy.transform.PackageScope
import groovy.util.logging.Slf4j
import org.apache.http.client.CookieStore
import org.apache.http.cookie.Cookie

/**
 * Хранилище cookie. Используется ThreadLocal.
 */
@CompileStatic
@PackageScope
@Slf4j
class ThreadLocalCookieStore implements Closeable, CookieStore, Serializable {
    private static final long serialVersionUID = 1L

    private static final ThreadLocal<List<Cookie>> cookieStore = new ThreadLocal<>()
    private static final ThreadLocalCookieStore INSTANCE = new ThreadLocalCookieStore()

    private ThreadLocalCookieStore() {
    }

    static ThreadLocalCookieStore getInstance() {
        return INSTANCE
    }

    @Override
    List<Cookie> getCookies() {
        def list = cookieStore.get()
        if (list == null) {
            return Collections.emptyList()
        }
        return list
    }

    @Override
    void addCookie(Cookie cookie) {
        def list = cookieStore.get()
        if (list == null) {
            list = []
            cookieStore.set(list)
        }
        log.trace("Add cookie: {}", cookie)
        list.add(cookie)
    }

    @Override
    void close() throws IOException {
        clear()
    }

    @Override
    boolean clearExpired(Date date) {
        def list = cookieStore.get()
        for (int i = list.size() - 1; i > -1; i--) {
            if (list[i].isExpired(date)) {
                def c = list.remove(i)
                log.trace("Removing expired cookie: {}", c)
            }
        }
        return false
    }

    @Override
    void clear() {
        cookieStore.remove()
    }
}
