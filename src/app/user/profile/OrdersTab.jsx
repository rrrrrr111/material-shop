import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";
import {iconButtonColor} from "app/common/styles";
import userProfileStyle from "app/user/profile/userProfileStyle";
import Card from "lib/components/Card/Card.jsx";
import CardBody from "lib/components/Card/CardBody.jsx";
import Button from "app/common/button/Button";
import Table from "lib/components/Table/Table";
import React from "react";

class OrdersTab extends React.PureComponent {
    orders = [
        {
            date: "18.02.2018", address: "Адрес , город городддддд ыф фыавфы вфывфывфы4545",
            goods: <ul>
                <li>2 x Колонка JBL Masters 1200 Kb (1500p)</li>
                <li>1 x dsf asd fasdf (1800p)</li>
                <li>56 x sdfasdf asdf asdf asdf sdf asdfa sdfasd asdf sdf dsf gsdfgsdfgsdfg sdf</li>
            </ul>,
            amount: "19912p"
        },
        {
            date: "18.02.2003", address: "выа фывафыва фывафы вафывафы фыва фыва фываф2",
            goods: <ul>
                <li>56 x sdfasdf asdf asdf asdf sdf</li>
            </ul>,
            amount: "1189p"
        },
        {
            date: "18.02.2000", address: " фыва фыв афывафывAlex Mikфывe",
            goods: <ul>
                <li>1 x dsf asd fasdf (180p)</li>
                <li>1 x dsf asd fasdf (1800p)</li>
            </ul>,
            amount: "92p"
        },
    ];

    rowActionButtons = [1].map((prop, key) => {
        return (
            <Button simple justIcon size="sm" color={iconButtonColor} key={key}>
                <AppIcon name="add_shopping_cart"/>
            </Button>
        );
    });

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.ordersTab}>
                <CardBody>
                    <Table
                        tableHead={[
                            "Дата", "Адрес доставки", "Товары", "Сумма", ""
                        ]}
                        tableData={this.orders.map((item) => {
                            return [item.date, item.address, item.goods, item.amount, this.rowActionButtons];
                        })}
                        customCellClasses={[classes.textCenter, classes.textRight, classes.textCenter]}
                        customClassesForCells={[0, 3, 4]}
                        customHeadCellClasses={[classes.textCenter, classes.textRight, classes.textCenter]}
                        customHeadClassesForCells={[0, 3, 4]}
                    />
                </CardBody>
            </Card>
        );
    }
}

export default withStyles(userProfileStyle)(OrdersTab);
