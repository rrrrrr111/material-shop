package ru.rich.matshop.webapi.api.common.paging;

/**
 * Данные запрошенной страницы (пэйджинг)
 */
public class PageResponse {

    /**
     * Есть ли еще страницы
     */
    private Boolean hasMore;

    public PageResponse() {
    }

    public PageResponse(Boolean hasMore) {
        this.hasMore = hasMore;
    }

    public Boolean getHasMore() {
        return hasMore;
    }

    public void setHasMore(Boolean hasMore) {
        this.hasMore = hasMore;
    }

    @Override
    public String toString() {
        return "PageResponse{" +
                "hasMore=" + hasMore +
                "} " + super.toString();
    }
}
