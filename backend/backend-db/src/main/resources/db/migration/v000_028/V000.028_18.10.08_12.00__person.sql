CREATE TABLE PERSON (
  ID                SERIAL PRIMARY KEY,
  EMAIL             VARCHAR(200),
  PASSWORD          VARCHAR(1000),
  PHONE             VARCHAR(100) NOT NULL,
  FIRST_NAME        VARCHAR(100),
  LAST_NAME         VARCHAR(100),
  DATE_OF_BIRTH     DATE,
  SEX               CHAR,
  AGREEMENT_CHECKED BOOLEAN      NOT NULL,
  EDIT_DATE         TIMESTAMP(3) NOT NULL
);

CREATE INDEX IDX_PER_EMAIL
  ON PERSON (EMAIL);
CREATE INDEX IDX_PER_PHONE
  ON PERSON (PHONE);

CREATE TABLE ADDRESS (
  ID              SERIAL PRIMARY KEY,
  PERSON_ID       INT          NOT NULL REFERENCES PERSON (ID),
  REGION          VARCHAR(200) NOT NULL,
  TOWN            VARCHAR(200),
  STREET          VARCHAR(200) NOT NULL,
  HOUSE           VARCHAR(10)  NOT NULL,
  HOUSING         VARCHAR(10),
  CONSTRUCTION    VARCHAR(10),
  APARTMENT       VARCHAR(10),
  ENTRANCE        VARCHAR(10),
  INTERCOM        VARCHAR(10),
  ADDRESS_COMMENT VARCHAR(1000),
  EDIT_DATE       TIMESTAMP(3) NOT NULL
);

CREATE INDEX IDX_ADR_PERSON_ID
  ON ADDRESS (PERSON_ID);