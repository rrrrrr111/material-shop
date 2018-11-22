import {createReducer} from "app/utils/functionUtil";
import update from 'immutability-helper';


export const MAIN_FEED_DATA = 'MAIN_FEED_DATA';
let initialState = {
    products: [],
};
export const dataFeedReducer = createReducer(
    initialState, {
        [MAIN_FEED_DATA]: (state, value = initialState.products) => {
            return update(state, {products: {$set: value}});
        }
    });

export const START_RELOAD_MAIN_FEED = 'START_RELOAD_MAIN_FEED';
export const STOP_RELOAD_MAIN_FEED = 'STOP_RELOAD_MAIN_FEED';
export const uiFeedReducer = createReducer({
    loading: false,
    loaded: false,
    message: false,
    filter: null,
}, {
    [START_RELOAD_MAIN_FEED]: (state) => {
        return update(state, {loading: {$set: true}, message: {$set: ""}});
    },
    [STOP_RELOAD_MAIN_FEED]: (state, value) => {
        return update(state, {loading: {$set: false}, message: {$set: value}});
    },
    [MAIN_FEED_DATA]: (state) => {
        return update(state, {loaded: {$set: true}});
    }
});

export const mapFeedToProps = (state) => {
    return state.feed;
};