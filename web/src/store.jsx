import {dataFeedReducer, uiFeedReducer} from "app/feed/reducer";
import {dataUserReducer, uiUserReducer} from "app/user/reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";


/** Функция подключает Redux Store */
const configureStore = function (initialState) {

    // мы здесь настроили middleware, которое будет получать экшены до того, как их получит редьюсер,
    // это позволит нам сделать экшоны с RESTами
    return applyMiddleware(thunk)(createStore)(
        combineReducers({
            user: combineReducers({
                data: dataUserReducer,
                ui: uiUserReducer,
            }),
            feed: combineReducers({
                data: dataFeedReducer,
                ui: uiFeedReducer,
            }),
        }));
};

export {
    configureStore,
}