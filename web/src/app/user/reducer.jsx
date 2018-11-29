import {createReducer} from "app/utils/functionUtil";
import update from 'immutability-helper';


export const USER_START_LOADING = 'USER_START_LOADING';
export const USER_STOP_LOADING = 'USER_STOP_LOADING';
export const USER_DATA = 'USER_DATA';
export const USER_AUTH = 'USER_AUTH';
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
    address: {
        region: "",
        town: "",
        street: "",
        house: "",
        housing: "",
        construction: "",
        apartment: "",
        entrance: "",
        intercom: "",
        addressComment: "",
    },
    editDate: null,
};
export const dataUserReducer = createReducer(
    initialState, {
        [USER_DATA]: (state, value = initialState) => {
            return {...initialState, ...value}; // todo
        },
        [USER_AUTH]: (state, value) => {
            return value.success ? {...initialState, ...value.person} : state; // todo
        },
        [USER_LOGGED_OUT]: () => {
            return initialState;
        },
    });

export const uiUserReducer = createReducer({
    loaded: false, // загружены ли уже данные, если true, юзер успешно авторизован
    loading: false, // данные в процессе загрузки
}, {
    [USER_DATA]: (state) => {
        return update(state, {loading: {$set: false}});
    },
    [USER_AUTH]: (state, value) => {
        return update(state, {loading: {$set: false}, loaded: {$set: value.success}});
    },
    [USER_LOGGED_OUT]: (state) => {
        return update(state, {loading: {$set: false}, loaded: {$set: false}});
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