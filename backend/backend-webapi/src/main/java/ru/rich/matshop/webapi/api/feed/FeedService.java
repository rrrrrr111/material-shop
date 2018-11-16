package ru.rich.matshop.webapi.api.feed;

import org.springframework.stereotype.Service;
import ru.rich.matshop.webapi.api.feed.model.FeedProduct;

import java.util.List;

@Service
class FeedService {

    private final FeedProductDao feedProductDao;

    FeedService(FeedProductDao feedProductDao) {
        this.feedProductDao = feedProductDao;
    }

    public List<FeedProduct> getFeedList() {

        var products = feedProductDao.getFeedList();
        return products;
    }
}
