import {capitalize} from "app/utils/functionUtil";
import update from 'immutability-helper';

export const isNotBlank = (str) => {
    return (str && str.trim().length !== 0);
};

export const isTrue = (val) => {
    return !!val;
};

export const checkRegexp = (str, regexp) => {
    return (str && regexp.test(str));
};

export const checkEmail = (email) => {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return checkRegexp(email, regExp);
};

const createValidator = (compRef, conf) => {
    return new Validator(compRef, conf);
};

class Validator {
    constructor(compRef, conf) {
        this.compRef = compRef;
        this.conf = conf;
    }

    handleChange = (fieldName, value) => {
        const fieldValid = this.isFieldValid(fieldName, value);
        const formValid = this.checkOtherFormFieldsFlags(fieldName, fieldValid);
        this.compRef.setState(
            update(
                this.compRef.state, {
                    data: {[fieldName]: {$set: value}},
                    ui: {
                        [fieldName + "Valid"]: {$set: fieldValid},
                        [this.conf.formValidField]: {$set: formValid}
                    }
                })
        );
    };

    isFieldValid = (fieldName, value) => {
        if (this.conf.disabled) {
            return true;
        }
        let valid = this.compRef.state.ui[fieldName + "Valid"];
        if (!valid) {
            valid = this.conf.fieldsToCheckers[fieldName](value);
        }
        return valid;
    };

    checkOtherFormFieldsFlags = (exceptField, valid = true) => {
        if (!valid) return false;
        for (const field in this.conf.fieldsToCheckers) {
            if (this.conf.fieldsToCheckers.hasOwnProperty(field)
                && field !== exceptField) {
                valid &= this.compRef.state.ui[field + "Valid"]
            }
        }
        return valid;
    };

    isFormValid = () => {
        if (this.conf.disabled) {
            return true;
        }
        const checkers = this.conf.fieldsToCheckers;
        const compRef = this.compRef;
        const uiObj = {...compRef.state.ui};

        let formValid = true;
        let fieldValid;
        for (const field in checkers) {
            if (checkers.hasOwnProperty(field)) {
                fieldValid = checkers[field](compRef.state.data[field]);
                uiObj[field + "Valid"] = fieldValid;
                formValid &= fieldValid;
            }
        }
        if (!formValid) {
            uiObj[this.conf.formValidField] = formValid;
            compRef.setState({
                ...compRef.state,
                ui: uiObj
            });
        }
        return formValid;
    };
}

export const prepareHandler = (compRef, fieldName, valueHandler) => {
    const handlerName = `handle${capitalize(fieldName)}Change`;
    let handler = compRef[handlerName];
    if (handler) {
        return handler;
    }
    handler = (e) => {
        valueHandler(compRef, fieldName, e);
    };
    handler.bind(compRef);
    return handler;
};

export const inputHandler = (compRef, fieldName, event) => {
    compRef.validator.handleChange(fieldName, event.target.value);
};

export const inputTrimHandler = (compRef, fieldName, event) => {
    compRef.validator.handleChange(fieldName, event.target.value.trim());
};

export const checkboxHandler = (compRef, fieldName, event) => {
    compRef.validator.handleChange(fieldName, !compRef.state.data[fieldName]);
};

const validate = {
    isNotBlank: isNotBlank,
    isTrue: isTrue,
    checkRegexp: checkRegexp,
    checkEmail: checkEmail,
    createValidator: createValidator,
};
export default validate;
