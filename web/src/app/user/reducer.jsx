import {createReducer} from "app/utils/functionUtil";
import update from 'immutability-helper';


export const RELOAD_USER_DATA = 'RELOAD_USER_DATA';
let initialState = {
    id: null,
    email: "",
    password: "",
    phone: "",
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    sex: null,
    agreementChecked: false,
    editDate: null,
};
export const dataUserReducer = createReducer(
    initialState, {
        [RELOAD_USER_DATA]: (state, value = initialState) => {
            return value;
        },
        [USER_LOGGED_OUT]: () => {
            return initialState;
        },
    });

export const START_RELOAD_USER_DATA = 'START_RELOAD_USER_DATA';
export const STOP_RELOAD_USER_DATA = 'STOP_RELOAD_USER_DATA';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const uiUserReducer = createReducer({
    loading: false,
    error: null,
    authorized: false,
}, {
    [START_RELOAD_USER_DATA]: (state) => {
        return update(state, {loading: {$set: true}, error: {$set: null}});
    },
    [STOP_RELOAD_USER_DATA]: (state, value) => {
        return update(state, {
                loading: {$set: false},
                error: {$set: value.message},
                authorized: {$set: value.authorized}
            }
        );
    },
    [USER_LOGGED_OUT]: (state) => {
        return update(state, {authorized: {$set: false}});
    },
});