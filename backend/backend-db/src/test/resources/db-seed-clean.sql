DELETE
FROM P_COSMETIC
WHERE PRODUCT_ID IN (SELECT ID FROM PRODUCT WHERE EDIT_DATE = {TS '2000-01-01 11:11:11'});

DELETE
FROM PRODUCT
WHERE EDIT_DATE = {TS '2000-01-01 11:11:11'};