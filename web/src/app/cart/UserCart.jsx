import withStyles from "@material-ui/core/styles/withStyles";
import FillOrderTab from "app/cart/FillOrderTab";
import GoodsTab from "app/cart/GoodsTab";
import PaymentTab from "app/cart/PaymentTab";
import {mapCartToProps} from "app/cart/reducer";
import userCartStyle from "app/cart/userCartStyle";
import Clearfix from "app/common/misc/Clearfix";
import Wizard from "app/common/wizard/Wizard";
import UserDataLoader from "app/user/profile/UserDataLoader";
import {connect, update} from "app/utils/functionUtil";
import util from "app/utils/util";
import {checkEmail, checkPhone, isBoolean, isNotBlank} from "app/utils/validateUtil";
import classNames from "classnames";
import React from "react";


class UserCart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.goodsStepCheck = this.goodsStepCheck.bind(this);
        this.orderStepCheck = this.orderStepCheck.bind(this);
        this.paymentStepCheck = this.paymentStepCheck.bind(this);
        this.paymentTypeHandler = this.paymentTypeHandler.bind(this);
        this.state = {
            data: {
                person: UserCart.getPersonFromProps(props),
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
                        townValid: true,
                        streetValid: true,
                        houseValid: true,
                        housingValid: true,
                        constructionValid: true,
                        apartmentValid: true,
                        entranceValid: true,
                        intercomValid: true,
                        addressCommentValid: true,
                    },
                },
                goodsFormValid: true,
                orderFormValid: true,
                paymentFormValid: true,
                message: null,
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
                checkers: {
                    person: {
                        firstName: isNotBlank,
                        email: checkEmail,
                        phone: checkPhone,
                        agreementChecked: isBoolean,
                        address: {
                            region: isNotBlank,
                            town: this.checkTown,
                            street: isNotBlank,
                            house: isNotBlank,
                        },
                    },
                },
                formValidField: 'orderFormValid',
                stateSetter: this.setWizardState,
            }
        );
    }

    static getDerivedStateFromProps(props, state) {
        if (state.data.person.editDate !== props.userData.editDate) {
            return update(state, {data: {person: {$set: UserCart.getPersonFromProps(props)}}});
        }
        return null;
    }

    static getPersonFromProps(props) {
        return {
            ...props.userData,
            agreementChecked: true,
            address: {
                ...props.userData.address,
                region: (props.userData.address.region ? props.userData.address.region : "77")
            },
        };
    }

    checkTown = (town, data) => {
        let region = data.person.address.region;
        return (
            (region !== '77' && region !== '78' && isNotBlank(town))
            ||
            ((region === '77' || region === '78') && !isNotBlank(town))
        );
    };

    paymentTypeHandler(paymentType) {
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
        this.setWizardState(this, this.state);
        return valid;
    };

    orderStepCheck = () => {
        const {formValid, state} = this.validator.validate();
        this.setWizardState(this, state);
        return formValid;
    };

    paymentStepCheck = () => {
        let valid = true;
        this.setWizardState(this, this.state);
        return valid;
    };

    setWizardState(compRef, state) {
        const {goodsFormValid, orderFormValid, paymentFormValid} = state.ui;
        compRef.setState(
            update(state, {
                tabsState: {
                    0: {nextButton: {disabled: {$set: !goodsFormValid}}},
                    1: {nextButton: {disabled: {$set: !orderFormValid}}},
                    2: {nextButton: {disabled: {$set: !paymentFormValid}}}
                },
                message: {
                    $set: (!goodsFormValid || !orderFormValid || !paymentFormValid)
                        ? "Необходимо исправить ошибки при заполнении полей"
                        : null
                }
            },)
        );
    }

    render() {
        const {classes, userUi} = this.props;
        const {
            data, ui, tabsState, message,
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
                                    content: GoodsTab,
                                    containerClassName: classes.goodsContainer,
                                    ...tabsState[0]
                                },
                                {
                                    key: "order",
                                    url: "/cart/order",
                                    content: (
                                        <FillOrderTab
                                            paymentTypeHandler={this.paymentTypeHandler}
                                            validatorRef={this.validator}
                                            userUi={userUi} data={data} ui={ui}
                                        />
                                    ),
                                    containerClassName: classes.orderContainer,
                                    ...tabsState[1]
                                },
                                {
                                    key: "payment",
                                    url: "/cart/payment",
                                    content: PaymentTab,
                                    containerClassName: classes.paymentContainer,
                                    ...tabsState[2]
                                },
                            ]
                        } finalUrl="/" message={message}/>
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
