package ru.rich.webparser.core.parser

import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.model.PageType

import java.nio.CharBuffer

@Service
@CompileStatic
class CanonicalizationService {

    @Value('${webParser.canonicalization.addToReadingBuffInPercents:15}')
    private Integer addToReadingBuffInPercents

    String normalise(char[] text, PageType pageType) {

        switch (pageType) {
            case PageType.XML:
                return normaliseXml(text)
            default:
                return text
        }
    }

    private String normaliseXml(char[] text) {
        CharBuffer buff = CharBuffer.allocate(
                text.length
                        + (int) (text.length / 100 * addToReadingBuffInPercents) // добавляем места на символы новой строки
        )

        char prevChar = 0, newChar = 0

        for (int i = 0; i < text.length; i++) {
            char c = text[i]

            if (Character.isWhitespace(c)) {
                if (prevChar != ' ' as char) {
                    newChar = ' '
                    buff.put(newChar)
                }

            } else if (c == '<' as char) {
                if (prevChar == ' ' as char) {
                    buff.position(buff.position() - 1)
                }
                newChar = c
                buff.put('\r\n')
                        .put(newChar)

            } else if (c == '>' as char) {
                if (prevChar == ' ' as char) {
                    buff.position(buff.position() - 1)
                }
                newChar = c
                buff.put(newChar)

            } else {

                newChar = c
                buff.put(newChar)
            }

            prevChar = newChar
        }
        new String(buff.array()).trim()
    }
}
