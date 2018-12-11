package ru.rich.webparser.core.service

import groovy.transform.CompileStatic
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.model.PageType

import java.nio.CharBuffer

@Service
@CompileStatic
class CanonicalizationService {

    String normalise(String text, PageType pageType) {

        switch (pageType) {
            case PageType.XML:
                return normaliseXml(text)
            default:
                return text
        }
    }

    private String normaliseXml(String text) {
        CharBuffer buff = CharBuffer.allocate(text.length())

        boolean space = false
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i)

            if (Character.isWhitespace(c)) {
                if (!space) {
                    buff.put(' ')
                    space = true
                }
                continue
            } else if (c == '<' as char) {
                buff.put('\r\n')
                        .put(c)
            } else {
                buff.put(c)
            }

            space = false
        }
        new String(buff.array()).trim()
    }
}
