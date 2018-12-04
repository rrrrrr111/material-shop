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

const initialPersonUi = {
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
};

class UserCart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.goodsStepCheck = this.goodsStepCheck.bind(this);
        this.orderStepCheck = this.orderStepCheck.bind(this);
        this.paymentStepCheck = this.paymentStepCheck.bind(this);

        this.state = UserCart.getDerivedStateFromProps(props, {
            data: {
                person: null,
                deliveryAmount: null,
                deliveryType: "COURIER",
                paymentInfo: null,
                paymentType: "CASH",
                totalAmount: 0,
            },
            ui: {
                person: initialPersonUi,
                goodsAmountValid: true,
                deliveryTypeValid: true,
                paymentTypeValid: true,
                goodsFormValid: true,
                orderFormValid: true,
                paymentFormValid: true,
                message: null,
            },
            tabsState: [
                {
                    prevButton: {text: "Вернуться к покупкам"},
                    nextButton: {text: "К оформлению заказа", canGo: this.goodsStepCheck},
                },
                {
                    prevButton: {text: "Назад"},
                    nextButton: {text: "", canGo: this.orderStepCheck},
                    isFinalStep: true
                },
                {
                    prevButton: {text: "Назад"},
                    nextButton: {text: "Подтвердить заказ", canGo: this.paymentStepCheck},
                },
            ],
        });
        this.goodsTabValidator = util.validate.createValidator(this, {
                checkers: {
                    goodsAmount: this.checkGoodsAmount,
                },
                formValidField: 'goodsFormValid',
            }
        );
        this.orderTabValidator = util.validate.createValidator(this, {
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
                    goodsAmount: this.checkGoodsAmount,
                    deliveryType: this.checkDeliveryType,
                    paymentType: this.checkPaymentType,
                },
                formValidField: 'orderFormValid',
                stateSetter: this.setWizardState,
            }
        );
    }

    static getDerivedStateFromProps(props, state) { // срабатывает при изменении пропретей, а также стэйта
        let changed = false;
        if (!state.data.person || state.data.person.editDate !== props.userData.editDate) {
            state = update(state, {
                data: {person: {$set: UserCart.getPersonFromProps(props)}},
                ui: {person: {$set: initialPersonUi}}
            });
            changed |= true;
        }
        if (state.data.cartGoodsList !== props.data.cartGoodsList) {
            state = update(state, {
                data: {
                    cartGoodsList: {$set: props.data.cartGoodsList},
                    goodsAmount: {$set: props.data.goodsAmount},
                    goodsQuantity: {$set: props.data.goodsQuantity}
                }
            });
            state = UserCart.getWizardState(state, true);
            changed |= true;
        }

        if (state.ui.loading !== props.ui.loading) {
            state = update(state, {ui: {loading: {$set: props.ui.loading}}});
            changed |= true;
        }
        return changed ? state : null;
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

    static getWizardState(state, clearValidation) {
        const {paymentType} = state.data;
        const {goodsFormValid, orderFormValid, paymentFormValid} = state.ui;

        const step2nextButtonText = paymentType === "CASH" ? "Подтвердить заказ" : "Перейти к оплате";
        const step2isFinal = paymentType === "CASH";

        return update(state, {
            ui: {
                message: {
                    $set: (clearValidation ? null : UserCart.getWizardMessage(state))
                }
            },
            tabsState: {
                0: {
                    nextButton: {
                        disabled: {$set: !(goodsFormValid | clearValidation)}
                    }
                },
                1: {
                    nextButton: {
                        disabled: {$set: !(orderFormValid | clearValidation)},
                        text: {$set: step2nextButtonText}
                    },
                    isFinalStep: {$set: step2isFinal}
                },
                2: {
                    nextButton: {
                        disabled: {$set: !(paymentFormValid | clearValidation)}
                    }
                }
            },
        },);
    }

    static getWizardMessage = (state) => {
        const {
            goodsAmountValid,
            goodsFormValid, orderFormValid, paymentFormValid
        } = state.ui;
        const {
            goodsAmount
        } = state.data;

        if (!goodsAmountValid) {
            const minAmount = util.global.getSiteConfigSync().minCartGoodsAmount;

            return `Минимальная сумма покупок ${minAmount}р. Необходимо добавить 
                    в корзину товаров еще на ${minAmount - goodsAmount}р.`;
        }
        if (!goodsFormValid || !orderFormValid || !paymentFormValid) {
            return "Необходимо исправить ошибки при заполнении полей";
        }
        return null;
    };

    checkTown = (town, data) => {
        let region = data.person.address.region;
        return (
            (region !== '77' && region !== '78' && isNotBlank(town))
            ||
            ((region === '77' || region === '78') && !isNotBlank(town))
        );
    };

    checkGoodsAmount = (goodsAmount) => {
        return goodsAmount > util.global.getSiteConfigSync().minCartGoodsAmount;
    };

    checkDeliveryType = (deliveryType) => {
        return deliveryType === "COURIER";
    };

    checkPaymentType = (paymentType) => {
        return paymentType === "CASH";
    };

    goodsStepCheck = () => {
        const {formValid, state} = this.goodsTabValidator.validate();
        this.setWizardState(this, state);
        return formValid;
    };

    orderStepCheck = () => {
        const {formValid, state} = this.orderTabValidator.validate();
        this.setWizardState(this, state);
        return formValid;
    };

    paymentStepCheck = () => {
        let valid = true;
        this.setWizardState(this, this.state);
        return valid;
    };

    setWizardState(compRef, state) {
        compRef.setState(
            UserCart.getWizardState(state, false)
        );
    }

    render() {
        const {classes, userUi} = this.props;
        const {
            data, ui, tabsState,
        } = this.state;
        const {
            message,
        } = this.state.ui;

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
                                    content: <GoodsTab data={data}/>,
                                    containerClassName: classes.goodsContainer,
                                    ...tabsState[0]
                                },
                                {
                                    key: "order",
                                    url: "/cart/order",
                                    content: (
                                        <FillOrderTab
                                            validatorRef={this.orderTabValidator}
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
