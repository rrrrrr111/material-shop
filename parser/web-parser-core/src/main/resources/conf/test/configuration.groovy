import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.configuration.model.PageType

configuration {
    pages = [
            new Page(
                    url: "",
                    type: PageType.XML,
                    template: "page1.template"
            )
    ]
}