import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.configuration.model.PageType

configuration {
    pages = [
            new Page(
                    url: "https://market.yandex.ru/product--progulochnaia-koliaska-mr-sandman-traveler/13890612",
                    type: PageType.XML,
                    template: "page1.template",
                    printToLog: true
            )
    ]
}