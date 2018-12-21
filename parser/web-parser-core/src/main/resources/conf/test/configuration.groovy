import ru.rich.webparser.core.configuration.model.ListingPage
import ru.rich.webparser.core.configuration.model.Page

import static ru.rich.webparser.core.configuration.model.PageType.HTML

/**
 Конфигурация парсера

 Установка значений в коллектор
 -  $$val(variableName)
 -  $$list(listName)
 -  $$map(mapName).key
 -  $$map(mapName).val
 -  $$table(mapName).col
 -  $$table(mapName).key
 -  $$table(mapName).val

 Чтение значений из коллектора
 -  @@val(variableName)
 -  @@list(listName, index)
 -  @@map(mapName, key)

 */


configuration {
    pages = [
            new ListingPage(
                    url: "https://market.yandex.ru/catalog--detskie-koliaski/55070/list?hid=90796&track=pieces&page=2&onstock=1&local-offers-first=0",
                    type: HTML,
                    templateFileName: "page0.template",
                    dropRowToDisk: false,
                    dropNormalisedToDisk: true,
                    urlListName: "urls",
                    limit: 2,
                    subPages: [
                            new Page(
                                    url: "@@TO_ABSOLUTE_URL(@@list(urls, index), @@val(url))",
                                    type: HTML,
                                    templateFileName: "page1.template",
                                    dropNormalisedToDisk: true
                            ),
                            new Page(
                                    url: """
                                        @@ADD_URL_PART(
                                                @@TO_ABSOLUTE_URL(
                                                    @@list(urls, index), @@val(url)
                                                 ), '/spec'
                                            )
                                            """,
                                    type: HTML,
                                    templateFileName: "page2.template",
                                    dropNormalisedToDisk: true
                            )
                    ]
            )
    ]
}