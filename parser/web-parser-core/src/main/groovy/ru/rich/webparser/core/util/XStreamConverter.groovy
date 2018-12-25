package ru.rich.webparser.core.util

import com.thoughtworks.xstream.XStream
import groovy.transform.CompileStatic
import org.springframework.stereotype.Component

/**
 * Конвертация к строке и обратно c помощью XStream
 */
@Component("xStreamConverter")
@CompileStatic
class XStreamConverter {

    private XStream xStream = new XStream()

    /**
     * Конвертирует строковое представление в pojo
     */
    def <T> T toPojo(String string) {
        (T) xStream.fromXML(string)
    }

    /**
     * Конвертирует pojo в строковое представление
     */
    def <T> String fromPojo(T pojo) {
        xStream.toXML(pojo)
    }
}
