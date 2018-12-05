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
import ru.rich.matshop.webapi.api.order.model.ShopOrder;
import ru.rich.matshop.webapi.api.user.PersonService;
import ru.rich.matshop.webapi.api.user.model.Person;
import ru.rich.matshop.webapi.api.user.model.PersonValidation.OnCreateOrder;

import javax.validation.Valid;
import javax.validation.groups.Default;

import static ru.rich.matshop.webapi.WebSecurityConfig.WebApiSecurityConfig.API_URL_PREFIX;
import static ru.rich.matshop.webapi.api.user.model.Role.Ability.AUTHENTICATE;
import static ru.rich.matshop.webapi.api.user.profile.UserController.fromUi;
import static ru.rich.matshop.webapi.api.user.profile.UserController.toUi;

@RestController
public class OrderController extends AbstractRestController {
    public static final String ORDER_URL_PREFIX = API_URL_PREFIX + "/order";

    private final ShopOrderService shopOrderService;
    private final PersonService personService;

    public OrderController(ShopOrderService shopOrderService, PersonService personService) {
        this.shopOrderService = shopOrderService;
        this.personService = personService;
    }

    @PostMapping(ORDER_URL_PREFIX + "/create")
    @Transactional
    public CreateOrderResponse create(@RequestBody
                                      @Validated({OnCreateOrder.class, Default.class})
                                              CreateOrderRequest req) {

        Person reqPerson = fromUi(req.getPerson());
        ShopOrder reqOrder = req.getOrder();

        Person person = toUi(personService.prepareOrderPerson(reqPerson));
        ShopOrder order = shopOrderService.createOrder(reqOrder);

        var resp = prepareResponse(new CreateOrderResponse());
        resp.setAuthPersonUpdated(isAuthPersonUpdated(reqPerson, person));
        resp.setPerson(person);
        resp.setOrder(order);
        return resp;
    }

    private boolean isAuthPersonUpdated(Person reqPerson, Person person) {
        return !person.getEditDate().equals(reqPerson.getEditDate())
                && person.ableTo(AUTHENTICATE);
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
