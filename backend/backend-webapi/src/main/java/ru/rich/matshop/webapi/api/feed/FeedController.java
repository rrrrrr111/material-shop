package ru.rich.matshop.webapi.api.feed;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.rich.matshop.webapi.api.common.rest.AbstractRestController;
import ru.rich.matshop.webapi.api.feed.model.FeedRequest;
import ru.rich.matshop.webapi.api.feed.model.FeedResponse;

import javax.validation.Valid;

@RestController
class FeedController extends AbstractRestController {

    private final FeedService feedService;

    FeedController(FeedService feedService) {
        this.feedService = feedService;
    }

    @PostMapping("/api/be/feed/list")
    public FeedResponse getFeedList(@RequestBody @Valid FeedRequest request) {

        var resp = prepareResponse(new FeedResponse());
        resp.setProducts(feedService.getFeedList());
        return resp;
    }
}
