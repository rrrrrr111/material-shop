package ru.rich.matshop.webapi.api.common.paging;

/**
 * Данные запрашиваемой страницы (пэйджинг)
 */
public class PageRequest {

    private Long offset;
    private Long count;
    private String sortField;

    public long getOffset() {
        return offset;
    }

    public void setOffset(Long offset) {
        this.offset = offset;
    }

    public long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public String getSortField() {
        return sortField;
    }

    public void setSortField(String sortField) {
        this.sortField = sortField;
    }
}
