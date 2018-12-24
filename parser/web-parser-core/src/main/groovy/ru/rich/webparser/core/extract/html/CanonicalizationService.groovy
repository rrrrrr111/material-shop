package ru.rich.webparser.core.extract.html

import groovy.transform.CompileStatic
import groovy.transform.PackageScope
import groovy.util.logging.Slf4j
import org.apache.commons.io.FileUtils
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.ResourcePage

import java.nio.CharBuffer

/**
 * Форматирование HTML старницы
 */
@Service
@CompileStatic
@Slf4j
@PackageScope
class CanonicalizationService {

    public static final List<String> REPLACE_FROM = [
            "&quot;", "&#34;", "&#039;", "&lt;", "&gt;", "&nbsp;", "&thinsp;", "&amp;",
    ]
    private static final List<String> REPLACE_TO = [
            '"', '"', "'", "<", ">", " ", " ", "&",
    ]

    @Value('${webParser.canonicalization.addToReadingBuffInPercents:15}')
    private Integer addToReadingBuffInPercents
    @Value('${webParser.workDir:parser/web-parser-core/build}')
    private String workDir

    char[] normalise(Configuration conf, ResourcePage p, char[] text) {

        char[] normalisedHtml = normaliseXml(text, p.url)

        if (p.printNormalisedToLog) {
            log.info("Page loaded: \n{}", new String(normalisedHtml))
        }

        if (p.dropNormalisedToDisk) {
            FileUtils.writeStringToFile(
                    new File("$workDir/pages/${conf.projectName}/${p.name}_normalised.html"),
                    new String(normalisedHtml), ResourcePageExtractor.PAGE_CHARSET)
        }
        normalisedHtml
    }

    private char[] normaliseXml(char[] text, String url) {
        CharBuffer buff = CharBuffer.allocate(
                text.length
                        + (int) (text.length / 100 * addToReadingBuffInPercents) // добавляем места на символы новой строки
        )

        Context ctx = new Context()

        buff.put("<url>").put(url).put("\r\n</url>")

        char c
        for (int i = 0; i < text.length; i++) {
            c = text[i]

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
        res.chars
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
