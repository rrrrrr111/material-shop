import {createReducer} from "app/utils/functionUtil";
import update from 'immutability-helper';


export const RELOAD_MAIN_FEED = 'RELOAD_MAIN_FEED';
export const dataFeedReducer = createReducer(
    {
        products: [],
    }, {
        [RELOAD_MAIN_FEED]: (state, value) => {
            return update(state, {products: {$set: value}});
        }
    });

export const START_RELOAD_MAIN_FEED = 'START_RELOAD_MAIN_FEED';
export const STOP_RELOAD_MAIN_FEED = 'STOP_RELOAD_MAIN_FEED';
export const uiFeedReducer = createReducer({
    loading: false,
    error: false,
    filter: null,
}, {
    [START_RELOAD_MAIN_FEED]: (state) => {
        return update(state, {loading: {$set: true}, error: {$set: false}});
    },
    [STOP_RELOAD_MAIN_FEED]: (state, value) => {
        return update(state, {loading: {$set: false}, error: {$set: value}});
    }
});