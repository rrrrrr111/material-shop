import {createReducer} from "app/utils/functionUtil";
import update from 'immutability-helper';


export const USER_START_LOADING = 'USER_START_LOADING';
export const USER_STOP_LOADING = 'USER_STOP_LOADING';
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
    loading: false,
    loaded: false,
}, {
    [USER_AUTH_RESULT]: (state, value) => {
        return update(state, {loaded: {$set: value}});
    },
    [USER_LOGGED_OUT]: (state) => {
        return update(state, {loaded: {$set: false}});
    },
    [USER_START_LOADING]: (state) => {
        return update(state, {loading: {$set: true}});
    },
    [USER_STOP_LOADING]: (state) => {
        return update(state, {loading: {$set: false}});
    },
});

export const mapUserToProps = (state) => {
    return state.user;
};