import {createReducer} from "app/utils/functionUtil";
import update from 'immutability-helper';


export const RELOAD_USER_DATA = 'RELOAD_USER_DATA';
let initialState = {
    id: null,
    email: null,
    password: null,
    phone: null,
    firstName: null,
    lastName: null,
    dateOfBirth: null,
    sex: null,
    agreementChecked: true,
    editDate: null,
};
export const dataUserReducer = createReducer(
    initialState, {
        [RELOAD_USER_DATA]: (state, value = initialState) => {
            return value;
        }
    });

export const START_RELOAD_USER_DATA = 'START_RELOAD_USER_DATA';
export const STOP_RELOAD_USER_DATA = 'STOP_RELOAD_USER_DATA';
export const uiUserReducer = createReducer({
    loading: false,
    error: null,
}, {
    [START_RELOAD_USER_DATA]: (state) => {
        return update(state, {loading: {$set: true}, error: {$set: null}});
    },
    [STOP_RELOAD_USER_DATA]: (state, value) => {
        return update(state, {loading: {$set: false}, error: {$set: value}});
    }
});