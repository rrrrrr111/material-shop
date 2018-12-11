package ru.rich.webparser.core.parser

import org.testng.Assert
import org.testng.annotations.DataProvider
import org.testng.annotations.Test
import ru.rich.webparser.core.configuration.model.PageType
import ru.rich.webparser.core.util.FileUtil

@Test
class CanonicalizationServiceTest {

    private def folder = "ru/rich/webparser/core/service"
    private def subj = new CanonicalizationService()

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

        String res = subj.normalise(srcHtml, PageType.XML)

        Assert.assertEquals(res, dstHtml)
    }
}