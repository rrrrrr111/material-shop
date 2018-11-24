INSERT INTO PRODUCT (SHOP_ID, EDIT_DATE, STATE, DATA, PRICING, BASE_PRICE, FORMAT_VERSION)
VALUES (1, {TS '2000-01-01 11:11:11'}, 'ACTIVE', '{}', 'PLUS(30%)', 1000, 'JSON_1.0'),
       (1, {TS '2000-01-01 11:11:11'}, 'ACTIVE', '{}', 'PLUS(30%)', 1000, 'JSON_1.0'),
       (1, {TS '2000-01-01 11:11:11'}, 'ACTIVE', '{}', 'PLUS(30%)', 1000, 'JSON_1.0'),
       (1, {TS '2000-01-01 11:11:11'}, 'ACTIVE', '{}', 'PLUS(30%)', 1000, 'JSON_1.0'),
       (1, {TS '2000-01-01 11:11:11'}, 'ACTIVE', '{}', 'PLUS(30%)', 1000, 'JSON_1.0'),
       (1, {TS '2000-01-01 11:11:11'}, 'ACTIVE', '{}', 'PLUS(30%)', 1000, 'JSON_1.0');

INSERT INTO PRODUCT_COSMETIC (product_id, name, price, category, popularity)
    (SELECT ID, '', BASE_PRICE, 1, 0
     FROM PRODUCT
     WHERE EDIT_DATE = {TS '2000-01-01 11:11:11'});