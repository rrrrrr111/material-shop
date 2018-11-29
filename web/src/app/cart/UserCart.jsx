import withStyles from "@material-ui/core/styles/withStyles";
import CartGoodsTab from "app/cart/CartGoodsTab";
import CartOrderTab from "app/cart/CartOrderTab";
import CartPaymentTab from "app/cart/CartPaymentTab";
import {mapCartToProps} from "app/cart/reducer";
import userCartStyle from "app/cart/userCartStyle";
import Clearfix from "app/common/misc/Clearfix";
import Wizard from "app/common/wizard/Wizard";
import UserDataLoader from "app/user/profile/UserDataLoader";
import {connect, update} from "app/utils/functionUtil";
import util from "app/utils/util";
import {checkEmail, checkPhone, isNotBlank} from "app/utils/validateUtil";
import classNames from "classnames";
import React from "react";


class UserCart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.goodsStepCheck = this.goodsStepCheck.bind(this);
        this.orderStepCheck = this.orderStepCheck.bind(this);
        this.paymentStepCheck = this.paymentStepCheck.bind(this);
        this.handlePaymentTypeChange = this.handlePaymentTypeChange.bind(this);
        this.state = {
            data: {
                person: {
                    ...props.userData,
                    agreementChecked: true,
                    address: {
                        ...props.userData.address,
                        region: "77",
                    },
                },
                deliveryAmount: null,
                deliveryType: "COURIER",
                paymentInfo: null,
                paymentType: "CASH",
            },
            ui: {
                person: {
                    firstNameValid: true,
                    phoneValid: true,
                    emailValid: true,
                    agreementCheckedValid: true,
                    address: {
                        regionValid: true,
                    },
                },
                formValid: true,
                message: "",
            },
            tabsState: [
                {
                    prevButton: {text: "Вернуться"},
                    nextButton: {text: "К оформлению заказа", canGo: this.goodsStepCheck},
                },
                {
                    prevButton: {text: "Назад"},
                    nextButton: {text: "Подтвердить заказ", canGo: this.orderStepCheck},
                    isFinalStep: true
                },
                {
                    prevButton: {text: "Назад"},
                    nextButton: {text: "Подтвердить заказ", canGo: this.paymentStepCheck},
                },
            ],
        };
        this.validator = util.validate.createValidator(this, {
                fieldsToCheckers: {
                    person: {
                        firstName: isNotBlank,
                        email: checkEmail,
                        phone: checkPhone,
                    },
                    address: {
                        region: isNotBlank,
                    },
                },
            }
        );
    }

    handlePaymentTypeChange(paymentType) {
        let nextButtonText;
        let isFinalStep;
        if ("CASH" === paymentType) {
            nextButtonText = "Подтвердить заказ";
            isFinalStep = true;
        } else {
            nextButtonText = "Перейти к оплате";
            isFinalStep = false;
        }
        this.setState(
            update(this.state, {
                tabsState: {
                    1: {
                        nextButton: {text: {$set: nextButtonText}},
                        isFinalStep: {$set: isFinalStep}
                    }
                }
            })
        );
    }

    goodsStepCheck = () => {
        let valid = true;
        this.setFormValid(0, valid);
        return valid;
    };

    orderStepCheck = () => {
        let valid = true;
        this.setFormValid(1, valid);
        return valid;
    };

    paymentStepCheck = () => {
        let valid = true;
        this.setFormValid(2, valid);
        return valid;
    };

    setFormValid(index, valid) {
        this.setState(
            update(this.state, {tabsState: {[index]: {nextButton: {disable: {$set: !valid}}}}})
        );
    }

    render() {
        const {classes} = this.props;
        const {
            tabsState,
        } = this.state;

        return (
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <Clearfix/>
                    <div className={classes.cartContainer}>
                        <Wizard tabsConfig={
                            [
                                {
                                    key: "goods",
                                    url: "/cart/goods",
                                    content: CartGoodsTab,
                                    containerClassName: classes.goodsContainer,
                                    ...tabsState[0]
                                },
                                {
                                    key: "order",
                                    url: "/cart/order",
                                    content: (
                                        <CartOrderTab
                                            handlePaymentTypeChange={this.handlePaymentTypeChange}
                                            cartStateComponent={this}
                                            userUi={this.props.userUi}
                                            data={this.state.data}
                                            ui={this.state.ui}
                                        />
                                    ),
                                    containerClassName: classes.orderContainer,
                                    ...tabsState[1]
                                },
                                {
                                    key: "payment",
                                    url: "/cart/payment",
                                    content: CartPaymentTab,
                                    containerClassName: classes.paymentContainer,
                                    ...tabsState[2]
                                },
                            ]
                        } finalUrl="/"/>
                    </div>
                    <Clearfix/>
                </div>
            </div>
        );
    }
}

const CartWithUserLoader = (props) => (
    <UserDataLoader>
        <UserCart {...props}/>
    </UserDataLoader>
);

export default connect(mapCartToProps)(withStyles(userCartStyle)(CartWithUserLoader));
