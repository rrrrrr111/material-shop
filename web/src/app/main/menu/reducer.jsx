import {Dictionary} from "app/utils/dictionaryUtil";
import {createReducer} from "app/utils/functionUtil";
import update from 'immutability-helper';

export const MENU_DATA = 'MENU_DATA';
export const START_RELOAD_MENU_DATA = 'START_RELOAD_MENU_DATA';
export const RELOAD_MENU_DATA_ERROR = 'RELOAD_MENU_DATA_ERROR';

const initialMenuDataState =
    new Dictionary([])
;
export const dataMenuReducer = createReducer(initialMenuDataState, {
    [MENU_DATA]: (state, value = initialMenuDataState.values) => {
        return new Dictionary(value);
    }
});

const initialMenuUiState = {
    loading: false,
    loaded: false,
    message: "",
};
export const uiMenuReducer = createReducer(initialMenuUiState, {
    [START_RELOAD_MENU_DATA]: (state) => {
        return update(state, {
            loading: {$set: true},
            message: {$set: ""}
        });
    },
    [MENU_DATA]: (state) => {
        return update(state, {
            loading: {$set: false},
            loaded: {$set: true}
        });
    },
    [RELOAD_MENU_DATA_ERROR]: (state, value) => {
        return update(state, {
            loading: {$set: false},
            loaded: {$set: false},
            message: {$set: value.message}
        });
    }
});

export const mapMenuToProps = (state) => {
    return state.menu;
};