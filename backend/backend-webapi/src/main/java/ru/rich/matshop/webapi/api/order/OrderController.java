package ru.rich.matshop.webapi.api.order;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.rich.matshop.webapi.api.common.rest.AbstractRestController;
import ru.rich.matshop.webapi.api.order.create.CreateOrderRequest;
import ru.rich.matshop.webapi.api.order.create.CreateOrderResponse;
import ru.rich.matshop.webapi.api.order.list.OrderListRequest;
import ru.rich.matshop.webapi.api.order.list.OrderListResponse;
import ru.rich.matshop.webapi.api.user.model.PersonValidation.OnCreateOrder;

import javax.validation.Valid;
import javax.validation.groups.Default;

import static ru.rich.matshop.webapi.WebSecurityConfig.WebApiSecurityConfig.API_URL_PREFIX;

@RestController
public class OrderController extends AbstractRestController {
    public static final String ORDER_URL_PREFIX = API_URL_PREFIX + "/order";

    private final ShopOrderService shopOrderService;

    public OrderController(ShopOrderService shopOrderService) {
        this.shopOrderService = shopOrderService;
    }

    @PostMapping(ORDER_URL_PREFIX + "/create")
    @Transactional
    public CreateOrderResponse create(@RequestBody
                                      @Validated({OnCreateOrder.class, Default.class})
                                              CreateOrderRequest req) {

        var resp = prepareResponse(new CreateOrderResponse());
        //resp.setPersonEditDate(editDate);
        return resp;
    }

    @PostMapping(ORDER_URL_PREFIX + "/list")
    @Transactional
    public OrderListResponse list(@RequestBody
                                  @Valid
                                          OrderListRequest req) {
        var resp = prepareResponse(new OrderListResponse());
        //resp.setPersonEditDate(editDate);
        return resp;
    }
}
