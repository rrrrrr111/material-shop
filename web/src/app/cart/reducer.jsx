import {createReducer} from "app/utils/functionUtil";
import update from 'immutability-helper';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';

export const START_ORDER_CREATE = 'START_ORDER_CREATE';
export const STOP_ORDER_CREATE = 'STOP_ORDER_CREATE';
export const ORDER_CREATED = 'ORDER_CREATED';

export const dataCartReducer = createReducer(
    {
        cartGoodsList: [],
    }, {
        // добавление одной единицы товара в корзину
        [ADD_TO_CART]: (state, value) => {
            return updateCart(state, value,
                (state, index) => {
                    return update(state, {cartGoodsList: {[index]: {quantity: {$set: obj.quantity + 1}}}});
                },
                (state) => {
                    return update(state, {cartGoodsList: {$push: [{...value, quantity: 1}]}});
                }
            );
        },
        // удаление товара из корзины независимо от его количества
        [REMOVE_FROM_CART]: (state, value) => {
            return updateCart(state, value,
                (state, index) => {
                    return update(state, {cartGoodsList: {$splice: [[index, 1]]}});
                }
            );
        },
        // изменение количества определенного товара в корзине, без добавления\удаления товара
        [CHANGE_QUANTITY]: (state, value) => {
            return updateCart(state, value,
                (state, index) => {
                    return update(state, {cartGoodsList: {[index]: {quantity: {$set: value.quantity}}}});
                }
            );
        },
        // заказ оформлен
        [ORDER_CREATED]: (state) => {
            return update(state, {cartGoodsList: {$set: []}});
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
});

const updateCart = (state, product, foundCallback, notFoundCallback) => {
    let index = state.cartGoodsList.findIndex((it) => (it.productId === product.productId));
    if (index > -1) {
        return foundCallback(state, index);
    } else {
        return notFoundCallback(state);
    }
};

export const mapCartToProps = (state) => {
    return state.cart;
};


