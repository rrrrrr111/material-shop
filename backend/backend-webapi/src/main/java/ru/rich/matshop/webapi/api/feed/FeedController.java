package ru.rich.matshop.webapi.api.feed;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.rich.matshop.webapi.api.feed.model.FeedResponse;

@RestController
class FeedController {

    private final FeedService feedService;

    FeedController(FeedService feedService) {
        this.feedService = feedService;
    }

    @GetMapping("/api/be/feed")
    public FeedResponse getFeedList(
            @RequestParam(
                    name = "name",
                    required = false
            ) String name) {

        var response = new FeedResponse();
        response.setProducts(feedService.getFeedList());
        return response;
    }
}
