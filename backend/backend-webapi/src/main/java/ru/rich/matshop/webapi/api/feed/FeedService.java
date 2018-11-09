package ru.rich.matshop.webapi.api.feed;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.rich.matshop.webapi.api.feed.model.FeedProduct;

import java.util.List;

@Service
class FeedService {

    private final ProductDao productDao;

    FeedService(ProductDao productDao) {
        this.productDao = productDao;
    }

    @Transactional
    public List<FeedProduct> getFeedList() {

        var products = productDao.getFeedList();
        return products;
    }
}
