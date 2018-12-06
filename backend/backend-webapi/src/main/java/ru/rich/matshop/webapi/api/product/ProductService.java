package ru.rich.matshop.webapi.api.product;

import org.springframework.stereotype.Service;
import ru.rich.matshop.webapi.api.product.model.FeedProduct;

import java.util.List;

@Service
class ProductService {

    private final FeedProductDao feedProductDao;

    ProductService(FeedProductDao feedProductDao) {
        this.feedProductDao = feedProductDao;
    }

    public List<FeedProduct> getFeedList() {

        var products = feedProductDao.getFeedList();
        return products;
    }
}
