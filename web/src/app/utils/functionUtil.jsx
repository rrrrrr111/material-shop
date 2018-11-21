import {createBrowserHistory} from 'history'
import update from 'immutability-helper';
import {connect as reduxConnect} from "react-redux";


export const connect = reduxConnect; // для удобства, автоматический импорт
export const routerHistory = createBrowserHistory({});

export const action = (type, value) => {
    return {type: type, value: value};
};

export const createReducer = (initialState, mappingObj) => {
    return (state = initialState, action) => {
        const changeStateFunc = mappingObj[action.type];
        if (changeStateFunc !== undefined) {
            return changeStateFunc(state, action.value)
        }
        return state
    };
};

export const buttonDebounceRule = {leading: true, trailing: false};

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const updateUiField = (componentRef, fieldName, value) => {
    componentRef.setState(
        update(
            componentRef.state, {
                ui: {[fieldName]: {$set: value}}
            })
    );
};

export const update2UiFields = (componentRef, fieldName1, value1, fieldName2, value2) => {
    componentRef.setState(
        update(
            componentRef.state, {
                ui: {
                    [fieldName1]: {$set: value1},
                    [fieldName2]: {$set: value2}
                }
            })
    );
};