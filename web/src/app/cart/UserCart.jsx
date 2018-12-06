import withStyles from "@material-ui/core/styles/withStyles";
import FillOrderTab from "app/cart/FillOrderTab";
import GoodsTab from "app/cart/GoodsTab";
import PaymentTab from "app/cart/PaymentTab";
import {mapCartToProps, ORDER_CREATED, START_ORDER_CREATE, STOP_ORDER_CREATE} from "app/cart/reducer";
import userCartStyle from "app/cart/userCartStyle";
import Clearfix from "app/common/misc/Clearfix";
import Wizard from "app/common/wizard/Wizard";
import UserDataLoader from "app/user/profile/UserDataLoader";
import {
    ajaxDebounceTimeout,
    buttonDebounceRule,
    connect,
    debounce,
    update,
    updateUiField
} from "app/utils/functionUtil";
import util from "app/utils/util";
import {checkEmail, checkPhone, isBoolean, isNotBlank} from "app/utils/validateUtil";
import classNames from "classnames";
import React from "react";
import {dispatch} from "store";

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

export const moscowName = util.dictionary.regionDict.getById("77").name;
export const piterName = util.dictionary.regionDict.getById("78").name;

class UserCart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.goodsStepGoNext = this.goodsStepGoNext.bind(this);
        this.orderStepGoNext = this.orderStepGoNext.bind(this);
        this.paymentStepGoNext = this.paymentStepGoNext.bind(this);

        const defaultDelivery = util.dictionary.deliveryTypeDict.getById(0);
        const defaultPaymentType = "CASH";

        this.state = UserCart.getDerivedStateFromProps(props, {
            data: {
                person: null,
                order: {
                    deliveryAmount: defaultDelivery.coast,
                    deliveryType: defaultDelivery.name,
                    paymentInfo: null,
                    paymentType: defaultPaymentType,
                    totalAmount: 0,
                },
            },
            ui: {
                person: initialPersonUi,
                order: {
                    goodsAmountValid: true,
                    deliveryTypeValid: true,
                    paymentTypeValid: true,
                },
                goodsFormValid: true,
                orderFormValid: true,
                paymentFormValid: true,
                message: null,
            },
            tabsState: [
                {
                    prevButton: {text: "Вернуться к покупкам"},
                    nextButton: {text: "К оформлению заказа", onClick: this.goodsStepGoNext},
                },
                {
                    prevButton: {text: "Назад"},
                    nextButton: {text: "", onClick: this.orderStepGoNext},
                    isFinalStep: true
                },
                {
                    prevButton: {text: "Назад"},
                    nextButton: {text: "Подтвердить заказ", onClick: this.paymentStepGoNext},
                },
            ],
        });
        this.goodsTabValidator = util.validate.createValidator(this, {
                checkers: {
                    order: {
                        goodsAmount: this.checkGoodsAmount,
                    },
                },
                formValidField: 'goodsFormValid',
                stateSetter: this.setWizardState,
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
                    order: {
                        goodsAmount: this.checkGoodsAmount,
                        deliveryType: this.checkDeliveryType,
                        paymentType: this.checkPaymentType,
                    },
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
        if (state.data.order.cartGoodsList !== props.data.order.cartGoodsList) {
            state = update(state, {
                data: {
                    order: {
                        cartGoodsList: {$set: props.data.order.cartGoodsList},
                        goodsAmount: {$set: props.data.order.goodsAmount},
                        goodsQuantity: {$set: props.data.order.goodsQuantity}
                    },
                },
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
                region: (props.userData.address.region ? props.userData.address.region : moscowName)
            },
        };
    }

    static getWizardState(state, clearValidation) {
        const {paymentType} = state.data.order;
        const {goodsFormValid, orderFormValid, paymentFormValid} = state.ui;

        const step2nextButtonText = paymentType === "CASH" ? "Подтвердить заказ" : "Перейти к оплате";
        const step2isFinal = paymentType === "CASH";

        return update(state, {
            ui: {
                message: {
                    $set: (clearValidation ? null : UserCart.determineMessage(state))
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

    static determineMessage = (state) => {
        const {
            goodsFormValid, orderFormValid, paymentFormValid
        } = state.ui;
        const {
            goodsAmountValid
        } = state.ui.order;
        const {
            goodsAmount
        } = state.data.order;

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
            (region !== moscowName && region !== piterName && isNotBlank(town))
            ||
            ((region === moscowName || region === piterName) && !isNotBlank(town))
        );
    };

    checkGoodsAmount = (goodsAmount) => {
        return goodsAmount >= util.global.getSiteConfigSync().minCartGoodsAmount;
    };

    checkDeliveryType = (deliveryType) => {
        return deliveryType === "COURIER";
    };

    checkPaymentType = (paymentType) => {
        return paymentType === "CASH";
    };

    goodsStepGoNext = (goCallback) => {
        const {formValid, state} = this.goodsTabValidator.validate();
        if (!formValid) {
            this.setWizardState(this, state);
            return;
        }
        goCallback();
    };

    orderStepGoNext = (goCallback) => {
        const {formValid, state} = this.orderTabValidator.validate();
        if (!formValid) {
            this.setWizardState(this, state);
            return;
        }
        if (this.state.data.order.paymentType === "CASH") {
            this._debouncedCreateOrder(state, goCallback);
        } else {
            goCallback();
        }
    };

    _debouncedCreateOrder = debounce(
        (state, goCallback) => {
            const compRef = this;
            updateUiField(compRef, state, "message", "");

            dispatch(START_ORDER_CREATE)
                .then(() => {
                    return util.ajax.backendPost("order/create", compRef.state.data);
                })
                .then((response) => {
                    updateUiField(compRef, this.state, "message", response.message);
                    if (response.success) {
                        dispatch(ORDER_CREATED, response);
                        util.notify.orderCreated(response.order.id);
                        goCallback();
                    } else {
                        dispatch(STOP_ORDER_CREATE);
                    }
                });
        }, ajaxDebounceTimeout, buttonDebounceRule);

    paymentStepGoNext = (goCallback) => {
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
