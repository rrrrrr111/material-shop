package ru.rich.matshop.webapi.api.common.paging;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;

/**
 * Данные запрашиваемой страницы (пэйджинг)
 */
public class PageRequest {

    @NotNull
    @Max(100)
    private Integer count;
    @NotNull
    private Integer page;
    private String sorting;

    public PageRequest() {
    }

    public PageRequest(PageRequest req) {
        this.page = req.getPage();
        this.count = req.getCount();
        this.sorting = req.getSorting();
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getSorting() {
        return sorting;
    }

    public void setSorting(String sorting) {
        this.sorting = sorting;
    }

    @Override
    public String toString() {
        return "PageRequest{" +
                "page=" + page +
                ", count=" + count +
                ", sorting='" + sorting + '\'' +
                '}';
    }
}