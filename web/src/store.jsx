import {dataCartReducer, uiCartReducer} from "app/cart/reducer";
import {notifyReducer} from "app/common/message/notify/reducer";
import {dataFeedReducer, uiFeedReducer} from "app/feed/reducer";
import {dataUserReducer, uiUserReducer} from "app/user/reducer";
import {dataUserOrdersReducer, uiUserOrdersReducer} from "app/user/userOrdersReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";


export const store = applyMiddleware(thunk)(createStore)(
    combineReducers({
        user: combineReducers({
            data: dataUserReducer,
            ui: uiUserReducer,
        }),
        userOrders: combineReducers({
            data: dataUserOrdersReducer,
            ui: uiUserOrdersReducer,
        }),
        feed: combineReducers({
            data: dataFeedReducer,
            ui: uiFeedReducer,
        }),
        cart: combineReducers({
            data: dataCartReducer,
            ui: uiCartReducer,
        }),
        notify: notifyReducer
    }));

export const action = (type, value) => {
    return {type, value};
};

export const dispatch = (type, value) => {
    return store.dispatch((dispatch, getState) => {
        dispatch(action(type, value));
        return Promise.resolve(dispatch)
    })
};
