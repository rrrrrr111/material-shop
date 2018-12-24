import ru.rich.webparser.core.configuration.model.ListPage
import ru.rich.webparser.core.configuration.model.ListResourcePage
import ru.rich.webparser.core.configuration.model.LoaderConf
import ru.rich.webparser.core.configuration.model.ResourcePage
import ru.rich.webparser.core.load.excel.ProductRegistryCreator

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
            new ListPage(
                    urls: [
                            "https://market.yandex.ru/catalog--detskie-koliaski/55070/list?hid=90796&track=pieces&page=2&onstock=1&local-offers-first=0",
                            "https://market.yandex.ru/catalog--detskie-koliaski/55070/list?hid=90796&track=pieces&page=2&onstock=1&local-offers-first=1",
                            "https://market.yandex.ru/catalog--detskie-koliaski/55070/list?hid=90796&track=pieces&page=2&onstock=1&local-offers-first=2",
                            "https://market.yandex.ru/catalog--detskie-koliaski/55070/list?hid=90796&track=pieces&page=2&onstock=1&local-offers-first=3",
                            "https://market.yandex.ru/catalog--detskie-koliaski/55070/list?hid=90796&track=pieces&page=2&onstock=1&local-offers-first=4",
                            "https://market.yandex.ru/catalog--detskie-koliaski/55070/list?hid=90796&track=pieces&page=2&onstock=1&local-offers-first=5",
                            "https://market.yandex.ru/catalog--detskie-koliaski/55070/list?hid=90796&track=pieces&page=2&onstock=1&local-offers-first=6",
                            "https://market.yandex.ru/catalog--detskie-koliaski/55070/list?hid=90796&track=pieces&page=2&onstock=1&local-offers-first=7",
                            "https://market.yandex.ru/catalog--detskie-koliaski/55070/list?hid=90796&track=pieces&page=2&onstock=1&local-offers-first=8",
                            "https://market.yandex.ru/catalog--detskie-koliaski/55070/list?hid=90796&track=pieces&page=2&onstock=1&local-offers-first=9",
                            "https://market.yandex.ru/catalog--detskie-koliaski/55070/list?hid=90796&track=pieces&page=2&onstock=1&local-offers-first=10",
                    ],
                    urlListName: "searchUrls",
                    subPages: [
                            new ListResourcePage(
                                    url: "@@list(searchUrls, index)",
                                    templateFileName: "page0.template",
                                    dropRowToDisk: false,
                                    dropNormalisedToDisk: true,
                                    urlListName: "urls",
                                    limit: 2,
                                    subPages: [
                                            new ResourcePage(
                                                    url: "@@TO_ABSOLUTE_URL(@@list(urls, index), @@val(url))",
                                                    templateFileName: "page1.template",
                                                    dropNormalisedToDisk: true
                                            ),
                                            new ResourcePage(
                                                    url: """
                                        @@ADD_URL_PART(
                                                @@TO_ABSOLUTE_URL(
                                                    @@list(urls, index), @@val(url)
                                                 ), '/spec'
                                            )
                                            """,
                                                    templateFileName: "page2.template",
                                                    dropNormalisedToDisk: true
                                            )
                                    ]
                            )
                    ]
            )
    ]
    loaderConf = new LoaderConf(
            excelTemplateName: "product_registry_tpl.xlsx",
            creatorId: ProductRegistryCreator.ID,
            reportPrefix: "product_registry_"
    )
}