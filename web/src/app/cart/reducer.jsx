import {createReducer, update} from "app/utils/functionUtil";

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';

export const START_ORDER_CREATE = 'START_ORDER_CREATE';
export const STOP_ORDER_CREATE = 'STOP_ORDER_CREATE';
export const ORDER_CREATED = 'ORDER_CREATED';

const initialState = {
    order: {
        cartGoodsList: [],
        goodsAmount: 0,
        goodsQuantity: 0,
    },
};
export const dataCartReducer = createReducer(
    initialState, {
        // добавление одной единицы товара в корзину
        [ADD_TO_CART]: (state, value) => {
            return updateCart(state, value,
                (state, index) => {
                    return update(state, {
                        order: {
                            cartGoodsList: {
                                [index]: {
                                    quantity: {
                                        $apply: ((q) => {
                                            return q + 1;
                                        })
                                    }
                                }
                            }
                        }
                    });
                },
                (state) => {
                    return update(state, {order: {cartGoodsList: {$push: [{...value, quantity: 1}]}}});
                }
            );
        },
        // изменение количества определенного товара в корзине, без добавления\удаления товара
        [CHANGE_QUANTITY]: (state, value) => {
            return updateCart(state, value,
                (state, index) => {
                    return update(state, {order: {cartGoodsList: {[index]: {quantity: {$set: value.quantity}}}}});
                }
            );
        },
        // удаление товара из корзины независимо от его количества
        [REMOVE_FROM_CART]: (state, value) => {
            return updateCart(state, value,
                (state, index) => {
                    return update(state, {order: {cartGoodsList: {$splice: [[index, 1]]}}});
                }
            );
        },
        // заказ оформлен
        [ORDER_CREATED]: (state) => {
            return initialState;
        },
    });

export const uiCartReducer = createReducer({
    loading: false,
}, {
    [START_ORDER_CREATE]: (state) => {
        return update(state, {loading: {$set: true}});
    },
    [STOP_ORDER_CREATE]: (state) => {
        return update(state, {loading: {$set: false}});
    },
    [ORDER_CREATED]: (state) => {
        return update(state, {loading: {$set: false}});
    },
});

const updateCart = (state, product, foundCallback, notFoundCallback) => {
    const index = state.order.cartGoodsList.findIndex((it) => (it.productId === product.productId));
    let resState = state;
    if (index > -1 && foundCallback) {
        resState = foundCallback(state, index);
    } else if (notFoundCallback) {
        resState = notFoundCallback(state);
    }
    return update(resState, {
        order: {
            goodsAmount: {$set: getCartGoodsAmount(resState.order.cartGoodsList)},
            goodsQuantity: {$set: getCartGoodsQuantity(resState.order.cartGoodsList)}
        }
    });
};

const getCartGoodsAmount = (cartGoodsList) => {
    return cartGoodsList.map(item => item.price * item.quantity).reduce((a, b) => a + b, 0);
};

const getCartGoodsQuantity = (cartGoodsList) => {
    return cartGoodsList.map(item => item.quantity).reduce((a, b) => a + b, 0);
};

export const mapCartToProps = (state) => {
    return state.cart;
};


