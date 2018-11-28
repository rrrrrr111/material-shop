import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";
import Price from "app/common/misc/Price";
import {iconButtonColor} from "app/common/style/styleConsts";
import Button from "app/common/theme/button/Button";
import Card from "app/common/theme/card/Card.jsx";
import CardBody from "app/common/theme/card/CardBody.jsx";
import Table from "app/common/theme/table/CustomTable";
import userProfileStyle from "app/user/profile/userProfileStyle";
import util from "app/utils/util";
import fill from 'lodash/fill';
import React from "react";

class OrdersTab extends React.PureComponent {
    orders = fill(Array(3), {
        date: "18.02.2018",
        address: "Адрес , город городддддд ыф фыавфы вфывфывфы4545",
        goods: [
            {name: "Колонка JBL Masters 1200 Kb", quantity: 2, price: 1500},
            {name: "dsf asd fasdf", quantity: 1, price: 1800},
            {
                name: "sdfasdf asdf asdf asdf sdf asdfa sdfasd asdf sdf dsf gsdfgsdfgsdfg sdf",
                quantity: 56,
                price: 322
            },
        ],
        amount: 19912,
        deliveryAmount: 300,
        state: "new",
        deliveryType: "COURIER"
    });

    rowActionButtons = [1].map((prop, key) => {
        return (
            <Button simple justIcon size="sm" color={iconButtonColor} key={key}>
                <AppIcon name="add_shopping_cart"/>
            </Button>
        );
    });

    asGoodsList = (item) => {
        return (<ul>{
            item.goods.map((item, index) => {
                return item.quantity > 1
                    ? <li key={index}>{item.quantity} x {item.name} ({item.price}p)</li>
                    : <li key={index}>{item.name} ({item.price}p)</li>
            })}
            <li>Доставка {util.dictionary.deliveryTypeDict[item.deliveryType].name} ({item.deliveryAmount}p)</li>
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
        const {classes} = this.props;
        return (
            <Card className={classes.ordersTab}>
                <CardBody>
                    <Table
                        tableHead={[
                            "Дата", "Адрес доставки", "Товары", "Сумма", "Статус", ""
                        ]}
                        tableData={this.orders.map((item) => {
                            return [
                                item.date,
                                item.address,
                                this.asGoodsList(item),
                                <Price value={item.amount}/>,
                                this.asUserState(item.state),
                                this.rowActionButtons];
                        })}
                        customCellClasses={[classes.textCenter, classes.textRight, classes.textCenter, classes.textCenter]}
                        customClassesForCells={[0, 3, 4, 5]}
                        customHeadCellClasses={[classes.textCenter, classes.textRight, classes.textCenter, classes.textCenter]}
                        customHeadClassesForCells={[0, 3, 4, 5]}
                    />
                </CardBody>
            </Card>
        );
    }
}

export default withStyles(userProfileStyle)(OrdersTab);
