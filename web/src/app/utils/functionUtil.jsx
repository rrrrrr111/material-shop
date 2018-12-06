import withStylesExport from "@material-ui/core/styles/withStyles";
import classNamesExport from "classnames";
import {createBrowserHistory} from 'history'
import updateExport from 'immutability-helper';
import debounceExport from 'lodash/debounce'
import toNumberExport from "lodash/toNumber"
import PropTypesExport from "prop-types";
import NumberFormatExport from "react-number-format";
import {connect as connectExport} from "react-redux";


export const connect = connectExport; // для удобства, автоматический импорт в IDEA
export const debounce = debounceExport;
export const toNumber = toNumberExport;
export const classNames = classNamesExport;
export const PropTypes = PropTypesExport;
export const withStyles = withStylesExport;
export const NumberFormat = NumberFormatExport;
export const update = updateExport;
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

export const updateUiField = (componentRef, state, fieldName, value) => {
    componentRef.setState(
        update(
            state, {
                ui: {[fieldName]: {$set: value}}
            })
    );
};

export const jacksonStrToDateStr = (str) => {
    return str.substr(0, 10);
}