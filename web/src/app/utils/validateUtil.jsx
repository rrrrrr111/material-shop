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

const createValidator = (objRef, conf) => {
    return new Validator(objRef, conf);
};

class Validator {
    constructor(objRef, conf) {
        this.objRef = objRef;
        this.conf = conf;
    }

    handleChange = (fieldName, value) => {
        const fieldValid = this.isFieldValid(fieldName, value);
        const formValid = this.checkOtherFormFieldsFlags(fieldName, fieldValid);
        this.objRef.setState(
            update(
                this.objRef.state, {
                    data: {[fieldName]: {$set: value}},
                    ui: {
                        [fieldName + "Valid"]: {$set: fieldValid},
                        [this.conf.formValidField]: {$set: formValid}
                    }
                })
        );
    };

    isFieldValid = (fieldName, value) => {
        let valid = this.objRef.state.ui[fieldName + "Valid"];
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
                valid &= this.objRef.state.ui[field + "Valid"]
            }
        }
        return valid;
    };

    isFormValid = () => {
        const checkers = this.conf.fieldsToCheckers;
        const objRef = this.objRef;
        const uiObj = {...objRef.state.ui};

        let formValid = true;
        let fieldValid;
        for (const field in checkers) {
            if (checkers.hasOwnProperty(field)) {
                fieldValid = checkers[field](objRef.state.data[field]);
                uiObj[field + "Valid"] = fieldValid;
                formValid &= fieldValid;
            }
        }
        if (!formValid) {
            uiObj[this.conf.formValidField] = formValid;
            objRef.setState({
                ...objRef.state,
                ui: uiObj
            });
        }
        return formValid;
    };
}

const validate = {
    isNotBlank: isNotBlank,
    isTrue: isTrue,
    checkRegexp: checkRegexp,
    checkEmail: checkEmail,
    createValidator: createValidator,
};
export default validate;
