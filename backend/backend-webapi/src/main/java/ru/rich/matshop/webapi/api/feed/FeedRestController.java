package ru.rich.matshop.webapi.api.feed;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.rich.matshop.webapi.api.feed.model.FeedResponse;
import ru.rich.matshop.webapi.api.feed.model.Product;

import java.math.BigInteger;
import java.util.ArrayList;

@RestController
public class FeedRestController {

    @GetMapping("/api/be/feed")
    public FeedResponse greeting(
            @RequestParam(
                    name = "name",
                    required = false
            ) String name) {

        final var products = new ArrayList<Product>(10);
        for (int i = 0; i < 10; i++) {
            Product p = new Product();

            p.setId(1L);
            p.setImage("000/000/product2.jpg");
            p.setLink("/p/spring_jacasdf_asdf_asdf_aket_p-1");
            p.setName("This is Java Product");
            p.setPrice(BigInteger.TEN);
            products.add(p);
        }
        var response = new FeedResponse();
        response.setProducts(products);
        return response;
    }
}
