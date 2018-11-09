package ru.rich.matshop.webapi.api.feed;

import org.springframework.stereotype.Service;
import ru.rich.matshop.webapi.api.feed.model.FeedProduct;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Service
class FeedService {

    List<FeedProduct> getFeedList() {

        var products = new ArrayList<FeedProduct>();
        for (int i = 0; i < 10; i++) {
            var p = new FeedProduct();

            p.setId(1L);
            p.setImage("000/000/product2.jpg");
            p.setLink("/p/spring_jacasdf_asdf_asdf_aket_p-1");
            p.setName("This is Java Product");
            p.setPrice(BigInteger.TEN);

            products.add(p);
        }
        return products;
    }
}
