CREATE TABLE TASK (
  ID             SERIAL PRIMARY KEY,
  NAME           VARCHAR(1000) NOT NULL,
  TYPE           VARCHAR(100)  NOT NULL,
  STATE          VARCHAR(100)  NOT NULL,
  LAST_DATA_DATE TIMESTAMP(3),
  LAST_DATA_ID   INT,
  EDIT_DATE      TIMESTAMP(3)  NOT NULL
);

CREATE INDEX IDX_TSK_TS
  ON TASK (TYPE, STATE);

CREATE TABLE TECH_LOG (
  ID         SERIAL PRIMARY KEY,
  TYPE       VARCHAR(100) NOT NULL,
  OBJECT_ID  INT,
  DATA       TEXT,
  EVENT_DATE TIMESTAMP(3) NOT NULL
);

CREATE INDEX IDX_TLG_TS
  ON TECH_LOG (EVENT_DATE);
CREATE INDEX IDX_TLG_OBJECT_ID
  ON TECH_LOG (OBJECT_ID);