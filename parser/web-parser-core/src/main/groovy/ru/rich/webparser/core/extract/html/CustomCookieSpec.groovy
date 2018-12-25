package ru.rich.webparser.core.extract.html

import groovy.transform.CompileStatic
import groovy.transform.PackageScope
import org.apache.http.cookie.Cookie
import org.apache.http.cookie.CookieOrigin
import org.apache.http.cookie.MalformedCookieException
import org.apache.http.impl.cookie.DefaultCookieSpec

/**
 * Спецификация cookie
 */
@PackageScope
@CompileStatic
class CustomCookieSpec extends DefaultCookieSpec {

    static final String COOKIE_SPEC_KEY = "custom_cookie_spec"

    @Override
    void validate(final Cookie cookie, final CookieOrigin origin) {
        try {
            super.validate(cookie, origin)
        } catch (MalformedCookieException e) {
            /* all cookie good */
        }
    }

    @Override
    String toString() {
        return COOKIE_SPEC_KEY
    }
}
