package ru.rich.webparser.core.extract.html

import groovy.transform.CompileStatic
import org.testng.Assert
import org.testng.annotations.DataProvider
import org.testng.annotations.Test
import ru.rich.webparser.core.configuration.model.Configuration
import ru.rich.webparser.core.configuration.model.ResourcePage
import ru.rich.webparser.core.util.FileUtil

@Test
@CompileStatic
class CanonicalizationServiceTest {

    private String folder = "ru/rich/webparser/core/extract/html"
    private CanonicalizationService subj = new CanonicalizationService(
            addToReadingBuffInPercents: 15
    )

    @DataProvider
    Object[][] filesProvider() {
        [
                ["test_file_01_src.html", "test_file_01_dst.html"]
        ] as Object[][]
    }

    @Test(dataProvider = "filesProvider")
    void test(String srcFileName, String dstFileName) {

        String srcHtml = FileUtil.readClasspathFile(folder + "/" + srcFileName)
        String dstHtml = FileUtil.readClasspathFile(folder + "/" + dstFileName)

        def page = [url: "http://my.com"] as ResourcePage
        def conf = [projectName: "test"] as Configuration

        String res = subj.normalise(conf, page, srcHtml.toCharArray())

        Assert.assertEquals(res, dstHtml)
    }
}