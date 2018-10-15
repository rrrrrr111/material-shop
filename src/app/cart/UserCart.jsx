import withStyles from "@material-ui/core/styles/withStyles";
import CartGoodsTab from "app/cart/CartGoodsTab";
import CartOrderTab from "app/cart/CartOrderTab";
import CartPaymentTab from "app/cart/CartPaymentTab";
import userCartStyle from "app/cart/userCartStyle";
import Wizard from "app/common/wizard/Wizard";
import classNames from "classnames";
import Clearfix from "lib/components/Clearfix/Clearfix";
import React from "react";


class UserCart extends React.PureComponent {

    tabsConfig = [
        {
            key: "goods", url: "/cart/goods", content: <CartGoodsTab/>,
            nextButtonText: "К оформлению заказа"
        },
        {
            key: "order", url: "/cart/order", content: <CartOrderTab/>,
            prevButtonText: "Назад",
            nextButtonText: "К оплате"
        },
        {
            key: "payment", url: "/cart/payment", content: <CartPaymentTab/>,
            prevButtonText: "Назад",
            nextButtonText: "Закрыть"
        },
    ];

    render() {
        const {classes} = this.props;

        return <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
                <Clearfix/>
                <div className={classes.profileTabs}>
                    <Wizard tabsConfig={this.tabsConfig.map((tab) => {
                        return {...tab}
                    })}
                            finalUrl={"/"}
                    />
                </div>
                <Clearfix/>
            </div>
        </div>;
    }
}

export default withStyles(userCartStyle)(UserCart);
