package ru.rich.webparser.core.configuration.template

import groovy.transform.CompileStatic
import org.testng.annotations.DataProvider
import org.testng.annotations.Test
import ru.rich.webparser.core.util.FileUtil

@Test
@CompileStatic
class TemplateParsingUrlPageTransformerServiceTest {

    private String folder = "ru/rich/webparser/core/configuration/template"
    private TemplateParserService subj = new TemplateParserService()

    @DataProvider
    Object[][] filesProvider() {
        int counter = 0
        [
                ["test__01_page.template", [
                        new SearchableRule(++counter, RuleType.VAL, "name", "<meta", "— купить"),
                        new SequentialString(++counter, "зорах"),
                        new SequentialString(++counter, "cla"),
                        new SearchableRule(++counter, RuleType.LIST, "pics", "\"url\"", "\"/>"),
                        new SearchableRule(++counter, RuleType.LIST, "rococo", "\"url\"", "\"bumbara\" pac=\""),
                        new SearchableRule(++counter, RuleType.LIST, "rococo", "\"bumbara\" pac=\"", "\"/>"),
                        new SequentialString(++counter, "n-gallery"),
                        new SearchableRule(++counter, RuleType.MAP, "feat", "<tratra/>\r\nlala>", "tratra", "key"),
                        new SearchableRule(++counter, RuleType.MAP, "feat", "lala", "tratra", "val"),
                        new SearchableRule(++counter, RuleType.TABLE, "feat", "lala", "tratra", "val"),
                        new SequentialString(++counter, "summary"),
                ]
                ]
        ] as Object[][]
    }

    @Test(dataProvider = "filesProvider")
    void testPrepareTemplate(String srcFileName, List<SearchableRegion> dstRegions) {

        String srcTemplate = FileUtil.readClasspathFile(folder + "/" + srcFileName)
        def tpl = subj.parseTemplate(srcFileName, srcTemplate)

        def regions = tpl.sequenceRegions
        assert regions == dstRegions
    }
}