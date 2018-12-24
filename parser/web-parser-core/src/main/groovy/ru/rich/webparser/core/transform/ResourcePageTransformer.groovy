package ru.rich.webparser.core.transform

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.configuration.model.ResourcePage
import ru.rich.webparser.core.configuration.template.SearchableRule
import ru.rich.webparser.core.configuration.template.SequentialString
import ru.rich.webparser.core.transform.collector.Collector
import ru.rich.webparser.core.transform.parser.SearchService

/**
 * Трансформация страниц типа {@link ResourcePage}
 */
@Service
@CompileStatic
@Slf4j
class ResourcePageTransformer implements PageTransformer<ResourcePage> {

    @Autowired
    SearchService searchService

    void transform(Configuration conf, ResourcePage p, Collector c, char[] text) {
        log.info "Transforming page: ${p.name}, collector: ${c.name} used"

        def foundRegions = searchService.searchSequenceRegions(text, p.pageTemplate.sequenceRegions)
        foundRegions.putAll(searchService.searchPlurals(text, foundRegions))
        foundRegions.putAll(searchService.searchIndependentRegions(text, p.pageTemplate.independentRegions))

        final List<ParserListener> listeners = []
        listeners << new CollectingListener(c, text)

        for (def entry in foundRegions.entries()) {

            if (entry.key.type.isRule) {
                SearchableRule rule = (SearchableRule) entry.key
                listeners.each { it.onRuleFound(rule, entry.value.extractedValue, entry.value.foundIndex) }

            } else {
                SequentialString str = (SequentialString) entry.key
                listeners.each { it.onStringFound(str, entry.value.foundIndex) }
            }
        }

        listeners.each { it.onFinish() }
    }

    @Override
    boolean isApplicable(Page p) {
        return p.class.isAssignableFrom(ResourcePage.class)
    }

    static interface ParserListener {
        void onRuleFound(SearchableRule rule, String value, int index)

        void onStringFound(SequentialString str, int index)

        void onFinish()
    }
}
