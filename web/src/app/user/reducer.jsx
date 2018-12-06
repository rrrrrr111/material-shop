import {ORDER_CREATED} from "app/cart/reducer";
import {createReducer} from "app/utils/functionUtil";
import update from 'immutability-helper';


export const USER_START_LOADING = 'USER_START_LOADING';
export const USER_STOP_LOADING = 'USER_STOP_LOADING';
export const USER_DATA = 'USER_DATA';
export const USER_AUTH = 'USER_AUTH';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

const initialUserData = {
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
    initialUserData, {
        [USER_DATA]: (state, value = initialUserData) => {
            return value;
        },
        [USER_AUTH]: (state, value) => {
            return value.success ? value.person : state;
        },
        [USER_LOGGED_OUT]: () => {
            return initialUserData;
        },
        [ORDER_CREATED]: (state, value) => {
            return value.authPersonUpdated ? value.person : state;
        }
    });

const initialUserUi = {
    loaded: false, // загружены ли уже данные, если true, юзер успешно авторизован
    loading: false, // данные в процессе загрузки
};
export const uiUserReducer = createReducer(initialUserUi, {
    [USER_DATA]: (state) => {
        return update(state, {loading: {$set: false}});
    },
    [USER_AUTH]: (state, value) => {
        return update(state, {loading: {$set: false}, loaded: {$set: value.success}});
    },
    [USER_LOGGED_OUT]: () => {
        return initialUserUi;
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