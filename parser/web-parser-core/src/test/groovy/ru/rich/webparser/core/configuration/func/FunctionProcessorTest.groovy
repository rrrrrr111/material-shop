package ru.rich.webparser.core.configuration.func

import groovy.transform.CompileStatic
import org.testng.annotations.BeforeClass
import org.testng.annotations.DataProvider
import org.testng.annotations.Test
import ru.rich.webparser.core.transform.collector.Collector

import static ru.rich.webparser.core.configuration.func.FunctionProcessor.FunctionContext

@Test
@CompileStatic
class FunctionProcessorTest {

    private FunctionProcessor subj = new FunctionProcessor()
    private Collector collector = new Collector()

    @BeforeClass
    def init() {

        collector.putValue("valtral", "myval")
        collector.putValue("absUrl", "http://mynahost.pro/trali/vali?p=yopy&gijo=picas")

        collector.addToList("urls", "/u0")
        collector.addToList("urls", "/u1")
        collector.addToList("urls", "valtral")
        collector.addToList("urls", "/u3")

        collector.putMapKey("myMap", "keyMa")
        collector.putMapVal("myMap", "valva")
    }

    @DataProvider
    Object[][] provider() {
        [
                ["@@val(valtral)", "myval", new FunctionContext(collector)],
                ["@@list(urls, index)", "/u1", new FunctionContext(collector, 1)],
                ["@@val(@@list(urls, index))", "myval", new FunctionContext(collector, 2)],
                ["@@map(myMap, keyMa)", "valva", new FunctionContext(collector)],
                ["""
                    @@ADD_URL_PART( 
                                        @@val(absUrl), '/sub-part'
                                   )
                        """, "http://mynahost.pro/trali/vali/sub-part?p=yopy&gijo=picas", new FunctionContext(collector)],
        ] as Object[][]
    }

    @Test(dataProvider = "provider")
    void testProcess(String src, String expected, FunctionContext fc) {
        def result = subj.interpolate(src, fc)
        assert result == expected
    }
}