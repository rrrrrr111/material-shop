package ru.rich.matshop.webapi.api.feed;

import org.jooq.DSLContext;
import org.jooq.Record;
import org.jooq.RecordMapper;
import org.springframework.stereotype.Repository;
import ru.rich.matshop.db.model.tables.records.ProductRecord;
import ru.rich.matshop.webapi.api.feed.model.FeedProduct;

import java.math.BigInteger;
import java.util.List;

import static ru.rich.matshop.db.model.Tables.PRODUCT;
import static ru.rich.matshop.db.model.Tables.PRODUCT_COSMETIC;

@Repository
class FeedProductDao {

    private final DSLContext create;

    FeedProductDao(DSLContext create) {
        this.create = create;
    }

    List<FeedProduct> getFeedList() {

        var p = PRODUCT.as("p");
        var pc = PRODUCT_COSMETIC.as("pc");

        return create.select()
                .from(p.join(pc)
                        .on(p.ID.eq(pc.PRODUCT_ID)))
                .fetch(new RecordMapper<Record, FeedProduct>() {
                    @Override
                    public FeedProduct map(Record record) {

                        var r = (ProductRecord) record;
                        var p = new FeedProduct();

                        p.setId(r.getId());
                        p.setImage("000/000/000[3]");
                        p.setLink("spring_jacasdf_asdf_asdf_aket_p-1");
                        p.setName("This is Java Product");
                        p.setPrice(BigInteger.TEN);
                        return p;
                    }
                });
    }
}
