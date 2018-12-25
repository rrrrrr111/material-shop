package ru.rich.webparser.core.extract.html

import groovy.transform.CompileStatic
import org.apache.http.impl.cookie.DefaultCookieSpecProvider
import org.apache.http.protocol.HttpContext

/**
 * Провайдер спецификации cookie
 */
@CompileStatic
class CustomCookieSpecProvider extends DefaultCookieSpecProvider {

    private final CustomCookieSpec cookieSpec

    CustomCookieSpecProvider() {
        // последний параметр true для "http.protocol.single-cookie-header"
        super(CompatibilityLevel.DEFAULT, null, null, true)
        this.cookieSpec = new CustomCookieSpec()
    }

    @Override
    CustomCookieSpec create(HttpContext context) {
        return cookieSpec
    }
}