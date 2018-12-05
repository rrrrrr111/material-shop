package ru.rich.matshop.webapi.api.feed.list;

import ru.rich.matshop.webapi.api.common.rest.AbstractRestRequest;
import ru.rich.matshop.webapi.api.common.paging.PageRequest;
import ru.rich.matshop.webapi.api.feed.model.FeedProductFilter;

/**
 *
 */
public class FeedRequest extends AbstractRestRequest {

    private PageRequest pageRequest;
    private FeedProductFilter feedProductFilter;

    public PageRequest getPageRequest() {
        return pageRequest;
    }

    public void setPageRequest(PageRequest pageRequest) {
        this.pageRequest = pageRequest;
    }

    public FeedProductFilter getFeedProductFilter() {
        return feedProductFilter;
    }

    public void setFeedProductFilter(FeedProductFilter feedProductFilter) {
        this.feedProductFilter = feedProductFilter;
    }

    @Override
    public String toString() {
        return "FeedRequest{" +
                "pageRequest=" + pageRequest +
                ", feedProductFilter=" + feedProductFilter +
                ", shopIdentity=" + getShopIdentity() +
                '}';
    }
}
