import ru.rich.webparser.core.configuration.model.Page
import ru.rich.webparser.core.configuration.model.PageType

/**
 Конфигурация парсера

 Установка значений в коллектор
 -  $$val(variableName)
 -  $$list(listName)
 -  $$map(mapName).key
 -  $$map(mapName).val
 -  $$multiMap(mapName).col
 -  $$multiMap(mapName).key
 -  $$multiMap(mapName).val

 Чтение значений из коллектора
 -  @@val(variableName)
 -  @@list(listName, index)
 -  @@map(mapName, key)

 */


configuration {
    pages = [
            new Page(
                    url: "https://market.yandex.ru/product--progulochnaia-koliaska-mr-sandman-traveler/13890612",
                    type: PageType.XML,
                    template: "page1.template",
                    dropNormalisedToDisk: true
            ),
            new Page(
//                    url: "@@val(url)/spec",
                    url: "https://market.yandex.ru/product--progulochnaia-koliaska-mr-sandman-traveler/13890612/spec",
                    type: PageType.XML,
                    template: "page2.template",
                    dropRowToDisk: false,
                    dropNormalisedToDisk: true
            )
    ]
}