import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";
import ErrorMessage from "app/common/message/ErrorMessage";
import NeedLoginMessage from "app/common/message/NeedLoginMessage";
import CircularLoading from "app/common/misc/CircularLoading";
import Price from "app/common/misc/Price";
import {iconButtonColor, PRIMARY_COLOR_KEY, TRANSPARENT_COLOR_KEY} from "app/common/style/styleConsts";
import Button from "app/common/theme/button/Button";
import Card from "app/common/theme/card/Card.jsx";
import CardBody from "app/common/theme/card/CardBody.jsx";
import CardFooter from "app/common/theme/card/CardFooter";
import Paging from "app/common/theme/paging/Paging";
import Table from "app/common/theme/table/CustomTable";
import userProfileStyle from "app/user/profile/userProfileStyle";
import {mapUserOrdersToProps, USER_ORDERS_DATA, USER_ORDERS_LOADING_ERROR, USER_ORDERS_START_LOADING} from "app/user/userOrdersReducer";
import {connect, jacksonStrToDateStr, updateUiField} from "app/utils/functionUtil";
import util from "app/utils/util";
import React from "react";
import {dispatch} from "store";

class OrdersTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.reloadUserOrdersData = this.reloadUserOrdersData.bind(this);
        this.state = {
            ui: {
                message: "",
            }
        }
    }

    componentDidMount() {
        this.checkStateAndReload(1);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.checkStateAndReload(1);
    }

    checkStateAndReload(page) {
        const {userUi} = this.props;
        const {loading, loaded} = this.props.ui;
        const message = this.state.ui.message;

        if (userUi.loaded
            && !loaded && !loading && !message) {
            this.reloadUserOrdersData(page);
        }
    }

    reloadUserOrdersData = (page) => {

        const compRef = this,
            userData = compRef.props.userData,
            paging = compRef.props.ui.paging,
            pageRequest = {...paging, page: page};

        updateUiField(compRef, compRef.state, "message", "");
        dispatch(USER_ORDERS_START_LOADING)
            .then(() => {
                return util.ajax.backendPost("order/list", {
                    personId: userData.id,
                    pageRequest,
                });
            })
            .then((response) => {
                updateUiField(compRef, compRef.state, "message", response.message);
                if (response.success) {
                    dispatch(USER_ORDERS_DATA, response);
                } else {
                    dispatch(USER_ORDERS_LOADING_ERROR);
                }
            });
    };

    rowActionButtons = [1].map((prop, key) => {
        return (
            <Button simple justIcon size="sm" color={iconButtonColor} key={key}>
                <AppIcon name="add_shopping_cart"/>
            </Button>
        );
    });

    asGoodsList = (item) => {
        return (<ul>{
            item.cartGoodsList.map((item, index) => {
                return item.quantity > 1
                    ? <li key={index}>{item.quantity} x {item.productName} ({item.price}p.)</li>
                    : <li key={index}>{item.productName} ({item.price}p.)</li>
            })}
            <li>Доставка {
                util.dictionary.deliveryTypeDict.getByName(item.deliveryType).description
            } ({item.deliveryAmount}p.)
            </li>
        </ul>);
    };

    asUserState(state) {
        switch (state) {
            case "NEW" :
                return "В обработке";
            case "ON_DELIVERY" :
                return "Передан в службу доставки";
            case "CLOSED" :
                return "Выполнен";
            default:
                return "";
        }
    }

    render() {
        const {classes, userUi} = this.props,
            {
                loaded: userLoaded, loading: userLoading
            } = userUi,
            {
                orders
            } = this.props.data,
            {
                loading: dataLoading, paging
            } = this.props.ui,
            {
                message
            } = this.state.ui,
            showLoading = userLoading || dataLoading,
            userNotAuth = !userLoaded && !userLoading,
            ordersNotFound = orders.length === 0,
            disabled = showLoading || userNotAuth;

        const content = (ordersNotFound && !showLoading && !message && !userNotAuth)
            ? <div className={classes.textCenter}>
                <h4>Заказы не найдены</h4>
            </div>
            : showLoading
                ? <CircularLoading show={showLoading}/>
                : <div>
                    <Table className={classes.ordersTable}
                           tableHeaderColor={TRANSPARENT_COLOR_KEY}
                           tableHead={[
                               "№", "Дата", "Адрес доставки", "Товары", "Сумма", "Статус", ""
                           ]}
                           tableData={orders.map((item) => {
                               return [
                                   item.id,
                                   jacksonStrToDateStr(item.createDate),
                                   item.personAddress,
                                   this.asGoodsList(item),
                                   <Price value={item.totalAmount}/>,
                                   this.asUserState(item.state),
                                   this.rowActionButtons];
                           })}
                           customCellClasses={[classes.textCenter, classes.textRight, classes.textCenter, classes.textCenter]}
                           customClassesForCells={[1, 4, 5, 6]}
                           customHeadCellClasses={[classes.textCenter, classes.textRight, classes.textCenter, classes.textCenter]}
                           customHeadClassesForCells={[1, 4, 5, 6]}
                    />
                </div>;
        return (
            <Card className={classes.ordersTab}>
                <CardBody className={classes.ordersCardBody}>
                    {content}
                </CardBody>
                <CardFooter className={classes.ordersCardFooter}>
                    <div className={classes.width100}>
                        <Paging color={PRIMARY_COLOR_KEY} disabled={disabled}
                                paging={paging} onPageClick={this.reloadUserOrdersData}
                        />
                        <ErrorMessage>{message}</ErrorMessage>
                        <NeedLoginMessage show={userNotAuth}/>
                    </div>
                </CardFooter>
            </Card>
        );
    }
}

export default connect(mapUserOrdersToProps)(withStyles(userProfileStyle)(OrdersTab));
