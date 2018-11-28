CREATE TABLE SHOP_ORDER (
  ID                 BIGSERIAL PRIMARY KEY,
  SHOP_ID            INT          NOT NULL,
  CLIENT_PERSON_ID   BIGINT       NOT NULL REFERENCES PERSON (ID),
  ADDRESS_ID         BIGINT REFERENCES ADDRESS (ID),
  AMOUNT             BIGINT,
  DELIVERY_AMOUNT    BIGINT,
  DELIVERY_TYPE      VARCHAR(100),
  STATE              VARCHAR(100) NOT NULL,
  ASSIGNED_PERSON_ID BIGINT REFERENCES PERSON (ID),
  SERVICE_COMMENT    VARCHAR(10000),
  PAYMENT_INFO       VARCHAR(10000),
  PAYMENT_TYPE       VARCHAR(100),
  CREATE_DATE        TIMESTAMP(3) NOT NULL,
  EDIT_DATE          TIMESTAMP(3) NOT NULL
);

CREATE INDEX IDX_SOR_STATE
  ON SHOP_ORDER (STATE, EDIT_DATE);
CREATE INDEX IDX_SOR_C_PERSON_ID
  ON SHOP_ORDER (CLIENT_PERSON_ID);
CREATE INDEX IDX_SOR_A_PERSON_ID
  ON SHOP_ORDER (ASSIGNED_PERSON_ID);
CREATE INDEX IDX_SOR_ADDRESS_ID
  ON SHOP_ORDER (ADDRESS_ID);

CREATE TABLE SHOP_ORDER_GOODS (
  ID            BIGSERIAL PRIMARY KEY,
  SHOP_ORDER_ID BIGINT NOT NULL REFERENCES SHOP_ORDER (ID),
  PRODUCT_ID    BIGINT NOT NULL REFERENCES PRODUCT (ID),
  QUANTITY      INT,
  PRICE         BIGINT
);

CREATE INDEX IDX_SOG_SHOP_ORDER_ID
  ON SHOP_ORDER_GOODS (SHOP_ORDER_ID);
CREATE INDEX IDX_SOG_PRODUCT_ID
  ON SHOP_ORDER_GOODS (PRODUCT_ID);

CREATE TABLE SHOP_ORDER_HISTORY (
  ID                     BIGSERIAL PRIMARY KEY,
  SHOP_ORDER_ID          BIGINT       NOT NULL REFERENCES SHOP_ORDER (ID),
  OLD_STATE              VARCHAR(100),
  OLD_SERVICE_COMMENT    VARCHAR(10000),
  OLD_ASSIGNED_PERSON_ID BIGINT REFERENCES PERSON (ID),
  NEW_STATE              VARCHAR(100) NOT NULL,
  NEW_SERVICE_COMMENT    VARCHAR(10000),
  NEW_ASSIGNED_PERSON_ID BIGINT REFERENCES PERSON (ID),
  EVENT_DATE             TIMESTAMP(3) NOT NULL
);

CREATE INDEX IDX_SOH_SHOP_ORDER_ID
  ON SHOP_ORDER_HISTORY (SHOP_ORDER_ID);
CREATE INDEX IDX_SOH_OLD_A_PERSON_ID
  ON SHOP_ORDER_HISTORY (OLD_ASSIGNED_PERSON_ID);
CREATE INDEX IDX_SOH_NEW_A_PERSON_ID
  ON SHOP_ORDER_HISTORY (NEW_ASSIGNED_PERSON_ID);
