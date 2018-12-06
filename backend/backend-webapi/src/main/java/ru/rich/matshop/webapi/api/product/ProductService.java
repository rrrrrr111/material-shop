package ru.rich.matshop.webapi.api.product;

import org.springframework.stereotype.Service;
import ru.rich.matshop.webapi.api.common.paging.PageRequest;
import ru.rich.matshop.webapi.api.product.model.FeedProduct;

import java.util.List;

@Service
class ProductService {

    private final ProductDao productDao;

    ProductService(ProductDao productDao) {
        this.productDao = productDao;
    }

    public List<FeedProduct> getList(PageRequest pageReq) {

        var products = productDao.getList();
        return products;
    }
}
