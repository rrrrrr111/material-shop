package ru.rich.webparser.core.parser

import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.configuration.model.PageType

import java.nio.CharBuffer

@Service
@CompileStatic
class CanonicalizationService {

    public static final List<String> REPLACE_FROM = [
            "&quot;", "&#34;", "&#039;", "&lt;", "&gt;", "&nbsp;", "&thinsp;", "&amp;",
    ]
    private static final List<String> REPLACE_TO = [
            '"', '"', "'", "<", ">", " ", " ", "&",
    ]

    @Value('${webParser.canonicalization.addToReadingBuffInPercents:15}')
    private Integer addToReadingBuffInPercents


    String normalise(char[] text, Page page) {

        switch (page.type) {
            case PageType.XML:
                return normaliseXml(text, page.url)
            default:
                return text
        }
    }

    private String normaliseXml(char[] text, String url) {
        CharBuffer buff = CharBuffer.allocate(
                text.length
                        + (int) (text.length / 100 * addToReadingBuffInPercents) // добавляем места на символы новой строки
        )

        Context ctx = new Context()

        buff.put("<url>").put(url).put("\r\n</url>")

        for (int i = 0; i < text.length; i++) {
            char c = text[i]

            if (Character.isWhitespace((char) c)) {
                ctx.newChar = ' ' as char
                ctx.needToSet = ctx.prevChar != ' ' as char

            } else if (c == '<' as char) {
                if (ctx.prevChar == ' ' as char) {
                    buff.position(buff.position() - 1)
                }
                ctx.newChar = c
                buff.put('\r\n')

            } else if (c == '>' as char) {
                if (ctx.prevChar == ' ' as char) {
                    buff.position(buff.position() - 1)
                }
                ctx.newChar = c

            } else if (c == '&' as char) {

                ctx.newChar = c
                ctx.candidateIndex = 0

            } else {
                if (ctx.candidateIndex != null && !ctx.candidate) {
                    def index = ++ctx.candidateIndex
                    def candidates = REPLACE_FROM.findAll { s -> s.charAt(index) == c }
                    if (candidates.isEmpty()) {
                        ctx.candidate = null
                    } else if (candidates.size() == 1) {
                        ctx.candidate = candidates[0]
                    }
                } else if (ctx.candidate) {
                    if (ctx.candidate.charAt(++ctx.candidateIndex) == c) {

                        if (ctx.candidate.length() - 1 == ctx.candidateIndex) {
                            buff.position(buff.position() + 1 - ctx.candidate.length())

                            c = REPLACE_TO[REPLACE_FROM.indexOf(ctx.candidate)] as char
                            ctx.candidate = null
                        }

                    } else {
                        ctx.candidate = null
                    }
                }
                ctx.newChar = c
            }

            if (ctx.needToSet) {
                buff.put(ctx.newChar)
            }
            ctx.prevChar = ctx.newChar
        }
        def res = new String(buff.array()).trim()
        res
    }

    private class Context {
        char newChar
        char prevChar
        boolean needToSet

        String candidate
        Integer candidateIndex

        Context() {
            clear()
        }

        void setNewChar(char newChar) {
            this.newChar = newChar
            clear()
        }

        void setCandidate(String candidate) {
            this.candidate = candidate
            this.candidateIndex = (candidate == null ? null : this.candidateIndex)
        }

        private void clear() {
            this.needToSet = true
        }
    }
}
