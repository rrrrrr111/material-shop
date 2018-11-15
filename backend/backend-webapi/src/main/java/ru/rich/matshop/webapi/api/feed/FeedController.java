package ru.rich.matshop.webapi.api.feed;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.rich.matshop.webapi.api.feed.model.FeedRequest;
import ru.rich.matshop.webapi.api.feed.model.FeedResponse;

@RestController
class FeedController {

    private final FeedService feedService;

    FeedController(FeedService feedService) {
        this.feedService = feedService;
    }

    @PostMapping("/api/be/feed/list")
    public FeedResponse getFeedList(FeedRequest request) {

        var response = new FeedResponse();
        response.setProducts(feedService.getFeedList());
        return response;
    }
}
