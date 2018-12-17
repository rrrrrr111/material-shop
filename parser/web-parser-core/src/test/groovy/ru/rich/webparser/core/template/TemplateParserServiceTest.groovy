package ru.rich.webparser.core.template


import org.testng.annotations.DataProvider
import org.testng.annotations.Test
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.util.FileUtil

@Test
class TemplateParserServiceTest {

    private def folder = "ru/rich/webparser/core/template"
    private def subj = new TemplateParserService()

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
                        new SearchableRule(++counter, RuleType.MULTIMAP, "feat", "lala", "tratra", "val"),
                        new SequentialString(++counter, "summary"),
                ]
                ]
        ]
    }

    @Test(dataProvider = "filesProvider")
    void testPrepareTemplate(String srcFileName, List<SearchableRegion> dstRegions) {

        String srcTemplate = FileUtil.readClasspathFile(folder + "/" + srcFileName)
        def p = new Page(templateFileName: srcFileName)
        subj.prepareTemplate(p, srcTemplate)

        def regions = p.pageTemplate.sequenceRegions
        assert regions == dstRegions
    }
}