package ru.rich.matshop.webapi.api.feed.model;

import ru.rich.matshop.webapi.api.RestRequest;
import ru.rich.matshop.webapi.api.common.paging.PageRequest;

/**
 *
 */
public class FeedRequest extends RestRequest {

    private PageRequest pageRequest;

    public PageRequest getPageRequest() {
        return pageRequest;
    }

    public void setPageRequest(PageRequest pageRequest) {
        this.pageRequest = pageRequest;
    }
}
