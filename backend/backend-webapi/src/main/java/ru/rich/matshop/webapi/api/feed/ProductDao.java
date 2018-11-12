package ru.rich.matshop.webapi.api.feed;

import org.jooq.DSLContext;
import org.jooq.Record;
import org.jooq.RecordMapper;
import org.springframework.stereotype.Repository;
import ru.rich.matshop.webapi.api.feed.model.FeedProduct;

import java.util.List;

import static ru.rich.matshop.db.model.Tables.PRODUCT;

@Repository
class ProductDao {

    private final DSLContext create;

    ProductDao(DSLContext create) {
        this.create = create;
    }

    public List<FeedProduct> getFeedList() {

        return create.select()
                .from(PRODUCT.as("p"))
                .fetch(new RecordMapper<Record, FeedProduct>() {
                    @Override
                    public FeedProduct map(Record record) {


//                        p.setId(1L);
//                        p.setImage("000/000/product2.jpg");
//                        p.setLink("/p/spring_jacasdf_asdf_asdf_aket_p-1");
//                        p.setName("This is Java Product");
//                        p.setPrice(BigInteger.TEN);
                        return null;
                    }
                });
    }
}
