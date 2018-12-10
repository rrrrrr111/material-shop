import {createReducer} from "app/utils/functionUtil";
import update from 'immutability-helper';


export const MAIN_FEED_DATA = 'MAIN_FEED_DATA';
export const START_RELOAD_MAIN_FEED = 'START_RELOAD_MAIN_FEED';

const initialFeedDataState = {
    products: [],
};
export const dataFeedReducer = createReducer(
    initialFeedDataState, {
        [MAIN_FEED_DATA]: (state, value = initialFeedDataState) => {
            return update(state, {products: {$set: value.products}});
        }
    });

const initialFeedUiState = {
    loading: false,
    loaded: false,
    message: "",
    filter: {},
};
export const uiFeedReducer = createReducer(initialFeedUiState, {
    [START_RELOAD_MAIN_FEED]: (state) => {
        return update(state, {loading: {$set: true}, message: {$set: ""}});
    },
    [MAIN_FEED_DATA]: (state, value) => {
        return update(state, {
            loading: {$set: false},
            loaded: {$set: value.success},
            message: {$set: value.message}
        });
    }
});

export const mapFeedToProps = (state) => {
    return state.feed;
};