import classNamesExport from "classnames";
import {createBrowserHistory} from 'history'
import update from 'immutability-helper';
import debounceExport from 'lodash/debounce'
import toNumberExport from "lodash/toNumber"
import PropTypesExport from "prop-types";
import withStylesExport from "@material-ui/core/styles/withStyles";
import {connect as connectExport} from "react-redux";


export const connect = connectExport; // для удобства, автоматический импорт в IDEA
export const debounce = debounceExport;
export const toNumber = toNumberExport;
export const classNames = classNamesExport;
export const PropTypes = PropTypesExport;
export const withStyles = withStylesExport;
export const routerHistory = createBrowserHistory({});

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
export const buttonDebounceTimeout = 500;
export const ajaxDebounceTimeout = 1000;

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