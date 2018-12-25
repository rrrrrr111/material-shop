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
        List<Cookie> cookieList = cookieStore.get()
        if (cookieList == null) {
            return Collections.emptyList()
        }
        return cookieList
    }

    @Override
    void addCookie(Cookie cookie) {
        List<Cookie> cookieList = cookieStore.get()
        if (cookieList == null) {
            cookieList = new ArrayList<>()
            cookieStore.set(cookieList)
        }
        log.trace("Add cookie: {}", cookie)
        cookieList.add(cookie)
    }

    @Override
    void close() throws IOException {
        cookieStore.remove()
    }

    @Override
    boolean clearExpired(Date date) {
        return false
    }

    @Override
    void clear() {
    }
}
