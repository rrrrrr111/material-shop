package ru.rich.matshop.webapi.api.common.paging;

/**
 * Данные запрошенной страницы (пэйджинг)
 */
public class PageResponse extends PageRequest {

    /**
     * Есть ли еще страницы
     */
    private Boolean hasMore;

    public PageResponse() {
    }

    public PageResponse(PageRequest pageReq, Boolean hasMore) {
        super(pageReq);
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
                "page=" + getPage() +
                ", count=" + getCount() +
                ", sorting='" + getSorting() + '\'' +
                ", hasMore=" + hasMore +
                '}';
    }
}
