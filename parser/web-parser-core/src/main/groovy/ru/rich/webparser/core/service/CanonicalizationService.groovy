package ru.rich.webparser.core.service

import groovy.transform.CompileStatic
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.model.PageType

import java.nio.CharBuffer

import static ru.rich.webparser.core.service.CanonicalizationService.CharType.SPACE

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

        CharType prevCharType = null
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i)

            if (Character.isWhitespace(c)) {
                if (prevCharType != SPACE) {
                    buff.put(' ')
                }

                prevCharType = SPACE
            } else if (c == '<' as char) {
                if (prevCharType == SPACE) {
                    buff.position(buff.position() - 1)
                }
                buff.put('\r\n')
                        .put(c)

                prevCharType = null
            } else if (c == '>' as char) {
                if (prevCharType == SPACE) {
                    buff.position(buff.position() - 1)
                }
                buff.put(c)

                prevCharType = null
            } else {
                buff.put(c)

                prevCharType = null
            }
        }
        new String(buff.array()).trim()
    }

    private enum CharType {
        SPACE;
    }
}
