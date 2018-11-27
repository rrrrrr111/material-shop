import {dataCartReducer, uiCartReducer} from "app/cart/reducer";
import {notifyReducer} from "app/common/message/notify/reducer";
import {dataFeedReducer, uiFeedReducer} from "app/feed/reducer";
import {dataUserReducer, uiUserReducer} from "app/user/reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";


// мы здесь настроили middleware, которое будет получать экшены до того, как их получит редьюсер,
// это позволит нам сделать экшоны с RESTами
export const store = applyMiddleware(thunk)(createStore)(
    combineReducers({
        user: combineReducers({
            data: dataUserReducer,
            ui: uiUserReducer,
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
    return store.dispatch((dispatch) => {
        return dispatch(action(type, value));
    })
};
