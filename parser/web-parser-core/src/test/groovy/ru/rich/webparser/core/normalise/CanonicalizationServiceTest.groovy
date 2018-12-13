package ru.rich.webparser.core.normalise

import org.testng.Assert
import org.testng.annotations.DataProvider
import org.testng.annotations.Test
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.configuration.model.PageType
import ru.rich.webparser.core.normalise.CanonicalizationService
import ru.rich.webparser.core.util.FileUtil

@Test
class CanonicalizationServiceTest {

    private def folder = "ru/rich/webparser/core/normalise"
    private def subj = new CanonicalizationService(
            addToReadingBuffInPercents: 15
    )

    @DataProvider
    Object[][] filesProvider() {
        [
                ["test_file_01_src.html", "test_file_01_dst.html"]
        ]
    }

    @Test(dataProvider = "filesProvider")
    void test(String srcFileName, String dstFileName) {

        String srcHtml = FileUtil.readClasspathFile(folder + "/" + srcFileName)
        String dstHtml = FileUtil.readClasspathFile(folder + "/" + dstFileName)

        def page = [url: "http://my.com", type: PageType.XML] as Page
        def conf = [projectName: "test"] as Configuration

        String res = subj.normalise(conf, page, srcHtml.toCharArray())

        Assert.assertEquals(res, dstHtml)
    }
}