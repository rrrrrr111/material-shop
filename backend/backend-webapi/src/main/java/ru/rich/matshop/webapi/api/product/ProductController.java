package ru.rich.matshop.webapi.api.product;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.rich.matshop.webapi.api.common.paging.PageRequest;
import ru.rich.matshop.webapi.api.common.rest.AbstractRestController;
import ru.rich.matshop.webapi.api.product.list.ProductListRequest;
import ru.rich.matshop.webapi.api.product.list.ProductListResponse;

import javax.validation.Valid;

import static ru.rich.matshop.webapi.WebSecurityConfig.WebApiSecurityConfig.API_URL_PREFIX;

@RestController
class ProductController extends AbstractRestController {

    private final ProductService productService;

    ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping(API_URL_PREFIX + "/product/list")
    public ProductListResponse getFeedList(@RequestBody @Valid ProductListRequest request) {

        PageRequest pageReq = request.getPageRequest();
        var resp = prepareResponse(new ProductListResponse());
        resp.setProducts(productService.getList(pageReq));
        return resp;
    }
}
