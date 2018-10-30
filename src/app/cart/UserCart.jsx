import withStyles from "@material-ui/core/styles/withStyles";
import CartGoodsTab from "app/cart/CartGoodsTab";
import CartOrderTab from "app/cart/CartOrderTab";
import userCartStyle from "app/cart/userCartStyle";
import Clearfix from "app/common/misc/Clearfix";
import Wizard from "app/common/wizard/Wizard";
import classNames from "classnames";
import React from "react";


class UserCart extends React.PureComponent {

    constructor(props) {
        super(props);
        const classes = props.classes;

        this.state = {
            tabsConfig: [
                {
                    key: "goods", url: "/cart/goods", content: <CartGoodsTab/>,
                    containerClassName: classes.goodsContainer,
                    prevButtonText: "Вернуться",
                    nextButtonText: "К оформлению заказа",
                },
                {
                    key: "order", url: "/cart/order", content: <CartOrderTab/>,
                    containerClassName: classes.orderContainer,
                    prevButtonText: "Назад",
                    nextButtonText: "Подтвердить заказ",
                },
                // {
                //     key: "payment", url: "/cart/payment", content: <CartPaymentTab/>,
                //     containerClassName: classes.paymentContainer,
                //     prevButtonText: "Назад",
                //     nextButtonText: "Закрыть",
                // },
            ],
            finalUrl: "/",
        };
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <Clearfix/>
                    <div className={classes.cartContainer}>
                        <Wizard tabsConfig={this.state.tabsConfig.map((tab) => {
                            return {...tab}
                        })}
                                finalUrl={this.state.finalUrl}
                        />
                    </div>
                    <Clearfix/>
                </div>
            </div>
        );
    }
}

export default withStyles(userCartStyle)(UserCart);
