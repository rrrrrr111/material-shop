package ru.rich.webparser.core.configuration.func

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.model.ResourcePage

/**
 * Обработка функций в параметрах страниц
 */
@Service
@Slf4j
@CompileStatic
class InterpolationHelper {

    @Autowired
    FunctionProcessor functionProcessor

    void interpolateFunctions(ResourcePage page, FunctionContext fc) {
        page.url = functionProcessor.interpolate(page.url, fc)
    }
}
