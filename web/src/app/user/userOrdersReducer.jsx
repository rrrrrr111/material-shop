import {ORDER_CREATED} from "app/cart/reducer";
import {USER_LOGGED_OUT} from "app/user/reducer";
import {createReducer} from "app/utils/functionUtil";
import update from 'immutability-helper';


export const USER_ORDERS_DATA = 'USER_ORDERS_DATA';
export const USER_ORDERS_START_LOADING = 'USER_ORDERS_START_LOADING';
export const USER_ORDERS_LOADING_ERROR = 'USER_ORDERS_LOADING_ERROR';


const initialUserOrdersData = [];
export const dataUserOrdersReducer = createReducer(
    {
        orders: initialUserOrdersData
    }, {
        [USER_ORDERS_DATA]: (state, value) => {
            return update(state, {orders: {$set: value.orders}});
        },
        [USER_LOGGED_OUT]: () => {
            return initialUserOrdersData;
        },
    });

const initialUserOrdersUi = {
    loaded: false,
    loading: false,
    paging: {
        count: 3,
        page: 1,
        sorting: "create_date desc",
        hasMore: true
    }
};
export const uiUserOrdersReducer = createReducer(initialUserOrdersUi, {
    [USER_ORDERS_START_LOADING]: (state) => {
        return update(state, {loading: {$set: true}});
    },
    [USER_ORDERS_DATA]: (state, value) => {
        return update(state, {loading: {$set: false}, loaded: {$set: true}, paging: {$set: value.pageResponse}});
    },
    [USER_ORDERS_LOADING_ERROR]: (state) => {
        return update(state, {loading: {$set: false}});
    },
    [ORDER_CREATED]: () => {
        return initialUserOrdersUi;
    },
    [USER_LOGGED_OUT]: () => {
        return initialUserOrdersUi;
    },
});

export const mapUserOrdersToProps = (state) => {
    return state.userOrders;
};