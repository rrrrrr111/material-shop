import {ORDER_CREATED} from "app/cart/reducer";
import {createReducer} from "app/utils/functionUtil";
import update from 'immutability-helper';


export const USER_ORDERS_DATA = 'USER_ORDERS_DATA';
export const USER_ORDERS_START_LOADING = 'USER_ORDERS_START_LOADING';
export const USER_ORDERS_LOADING_ERROR = 'USER_ORDERS_LOADING_ERROR';


export const dataUserOrdersReducer = createReducer(
    {
        orders: []
    }, {
        [USER_ORDERS_DATA]: (state, value) => {
            return update(state, {orders: {$set: value.orders}});
        },
    });

export const uiUserOrdersReducer = createReducer({
    loaded: false,
    loading: false,
    paging: {
        count: 3,
        page: 1,
        sorting: "create_date asc",
        hasMore: true
    }
}, {
    [USER_ORDERS_START_LOADING]: (state) => {
        return update(state, {loading: {$set: true}});
    },
    [USER_ORDERS_DATA]: (state, value) => {
        return update(state, {loading: {$set: false}, loaded: {$set: true}, paging: {$set: value.pageResponse}});
    },
    [USER_ORDERS_LOADING_ERROR]: (state) => {
        return update(state, {loading: {$set: false}});
    },
    [ORDER_CREATED]: (state) => {
        return update(state, {loaded: {$set: false}});
    },
});

export const mapUserOrdersToProps = (state) => {
    return state.userOrders;
};