package ru.rich.matshop.webapi.api.order;

import org.jooq.DSLContext;
import org.jooq.Record;
import org.jooq.RecordMapper;
import org.springframework.stereotype.Repository;
import ru.rich.matshop.webapi.api.common.paging.PageRequest;
import ru.rich.matshop.webapi.api.order.model.ShopOrder;
import ru.rich.matshop.webapi.api.order.model.ShopOrderGoods;
import ru.rich.matshop.webapi.api.order.model.ShopOrderGoodsInfo;
import ru.rich.matshop.webapi.api.order.model.ShopOrderInfo;
import ru.rich.matshop.webapi.api.user.model.PersonAddress;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;

import static org.apache.commons.lang3.ArrayUtils.addAll;
import static ru.rich.matshop.db.model.Tables.PERSON_ADDRESS;
import static ru.rich.matshop.db.model.Tables.PRODUCT;
import static ru.rich.matshop.db.model.Tables.SHOP_ORDER;
import static ru.rich.matshop.db.model.Tables.SHOP_ORDER_GOODS;
import static ru.rich.matshop.webapi.util.DaoUtil.asOrderField;

@Repository
public class ShopOrderDao {

    private final DSLContext create;

    ShopOrderDao(DSLContext create) {
        this.create = create;
    }


    public ShopOrder getById(Long id) {
        return create.selectFrom(SHOP_ORDER)
                .where(SHOP_ORDER.ID.eq(id))
                .fetchOneInto(ShopOrder.class);
    }

    public Long insert(ShopOrder o) {
        var now = new Date();
        return create.insertInto(SHOP_ORDER)
                .set(create.newRecord(SHOP_ORDER, o))
                .set(SHOP_ORDER.CREATE_DATE, now)
                .set(SHOP_ORDER.EDIT_DATE, now)
                .returning(SHOP_ORDER.ID)
                .fetchOne()
                .getId();
    }

    public List<ShopOrder> getByPersonId(Long personId, PageRequest pageReq) {
        int limit = pageReq.getCount() + 1;
        int offset = (pageReq.getPage() - 1) * pageReq.getCount();
        var so = SHOP_ORDER.as("so");
        var pa = PERSON_ADDRESS.as("pa");
        var sog = SHOP_ORDER_GOODS.as("sog");
        var prod = PRODUCT.as("prod");


        var resMap = new LinkedHashMap<Long, ShopOrderInfo>();
        create.select(
                addAll(
                        addAll(
                                so.fields(), pa.fields()
                        ),
                        addAll(
                                sog.fields(), prod.NAME.as("product_name")
                        )
                )
        )
                .from(
                        create.select(so.fields())
                                .from(so)
                                .where(so.CLIENT_PERSON_ID.eq(personId))
                                .offset(offset).limit(limit)
                                .asTable().as("so")
                )
                .leftJoin(pa).on(pa.ID.eq(so.PERSON_ADDRESS_ID))
                .leftJoin(sog).on(sog.SHOP_ORDER_ID.eq(so.ID))
                .leftJoin(prod).on(prod.ID.eq(sog.PRODUCT_ID))
                .orderBy(asOrderField(pageReq.getSorting(), so))
                .fetch(
                        (RecordMapper<Record, ShopOrder>) record -> {

                            Long orderId = record.get(so.ID);
                            ShopOrderInfo order = resMap.get(orderId);
                            if (order == null) {
                                order = record
                                        .into(so.fields())
                                        .into(ShopOrderInfo.class);
                                resMap.put(orderId, order);
                                order.setCartGoodsList(new ArrayList<>());

                                PersonAddress address = record
                                        .into(pa.fields())
                                        .into(PersonAddress.class);

                                if (address.getId() != null) {
                                    order.setPersonAddress(address.asString());
                                }
                            }
                            ShopOrderGoods orderGoods = record
                                    .into(addAll(
                                            sog.fields(), prod.NAME.as("product_name")
                                    ))
                                    .into(ShopOrderGoodsInfo.class);
                            if (orderGoods.getId() != null) {
                                order.getCartGoodsList().add(orderGoods);
                            }
                            return null;
                        });
        return new ArrayList<>(resMap.values());
    }
}