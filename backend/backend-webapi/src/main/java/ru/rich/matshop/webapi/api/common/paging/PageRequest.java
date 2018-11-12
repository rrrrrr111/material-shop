package ru.rich.matshop.webapi.api.common.paging;

/**
 * Данные запрашиваемой страницы (пэйджинг)
 */
public class PageRequest {

    private Long offset;
    private Long count;
    private String sortField;

    public PageRequest() {
    }

    public PageRequest(PageRequest req) {
        this.offset = req.getOffset();
        this.count = req.getCount();
        this.sortField = req.getSortField();
    }

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

    @Override
    public String toString() {
        return "PageRequest{" +
                "offset=" + offset +
                ", count=" + count +
                ", sortField='" + sortField + '\'' +
                '}';
    }
}