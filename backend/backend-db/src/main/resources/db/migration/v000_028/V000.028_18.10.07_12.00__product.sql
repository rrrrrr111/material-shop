CREATE TABLE PRODUCT (
  ID             BIGSERIAL PRIMARY KEY,
  SHOP_ID        INT          NOT NULL,
  EDIT_DATE      TIMESTAMP(3) NOT NULL,
  STATE          VARCHAR(100) NOT NULL,
  DATA           TEXT         NOT NULL,
  PRICING        VARCHAR(1000),
  BASE_PRICE     BIGINT,
  FORMAT_VERSION VARCHAR(100) NOT NULL
);

CREATE INDEX IDX_PRO_EDIT_DATE
  ON PRODUCT (EDIT_DATE);

CREATE TABLE PRODUCT_COSMETIC (
  PRODUCT_ID BIGINT PRIMARY KEY REFERENCES PRODUCT (ID),
  NAME       VARCHAR(4000) NOT NULL,
  PRICE      BIGINT        NOT NULL,
  CATEGORY   BIGINT        NOT NULL,
  POPULARITY BIGINT        NOT NULL DEFAULT 0
);

CREATE INDEX IDX_PCS_NAME
  ON PRODUCT_COSMETIC (NAME);
CREATE INDEX IDX_PCS_PRICE
  ON PRODUCT_COSMETIC (PRICE);
CREATE INDEX IDX_PCS_CATEGORY
  ON PRODUCT_COSMETIC (CATEGORY);
CREATE INDEX IDX_PCS_POPULARITY
  ON PRODUCT_COSMETIC (POPULARITY);