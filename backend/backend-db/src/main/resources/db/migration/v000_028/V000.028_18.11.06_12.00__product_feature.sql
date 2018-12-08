CREATE TABLE PRODUCT_FEATURE (
  ID      BIGSERIAL PRIMARY KEY,
  SHOP_ID INT,
  KEY     VARCHAR(1000) NOT NULL,
  NAME    VARCHAR(1000),
  TYPE    VARCHAR(100)  NOT NULL
);

CREATE INDEX IDX_CAT_KEY
  ON PRODUCT_FEATURE (KEY, SHOP_ID);

CREATE INDEX IDX_CAT_NAME
  ON PRODUCT_FEATURE (NAME, SHOP_ID);


insert into PRODUCT_FEATURE (SHOP_ID, KEY, NAME, TYPE)
values (NULL, 'id', 'Идентификатор', 'SERVICE'),
       (NULL, 'name', 'Название', 'SERVICE'),
       (NULL, 'description', 'Описание', 'SERVICE'),
       (NULL, 'brand', 'Брэнд', 'SERVICE'),
       (NULL, 'image', 'Ссылка на изображения', 'SERVICE'),
       (NULL, 'link', 'Ссылка карточки продукта', 'SERVICE'),
       (NULL, 'googleProductCategory', 'Категория товара в Google', 'SERVICE'),
       (NULL, 'price', 'Цена', 'SERVICE');


