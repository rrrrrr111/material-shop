import {createReducer} from "app/utils/functionUtil";
import update from 'immutability-helper';


export const USER_DATA = 'USER_DATA';
export const USER_AUTH_RESULT = 'USER_AUTH_RESULT';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

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
        [USER_DATA]: (state, value = initialState) => {
            return value;
        },
        [USER_LOGGED_OUT]: () => {
            return initialState;
        },
    });

export const uiUserReducer = createReducer({
    authorized: false,
}, {
    [USER_AUTH_RESULT]: (state, value) => {
        return update(state, {authorized: {$set: value}});
    },
    [USER_LOGGED_OUT]: (state) => {
        return update(state, {authorized: {$set: false}});
    },
});