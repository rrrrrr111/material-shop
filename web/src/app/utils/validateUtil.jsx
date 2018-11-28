import {capitalize} from "app/utils/functionUtil";

export const isNotBlank = (str) => {
    return (str && str.trim().length !== 0);
};

export const isNotEmpty = (str) => {
    return (str && str.length !== 0);
};

export const isTrue = (val) => {
    return (val === true);
};

export const isBoolean = (val) => {
    return (val === true || val === false);
};

export const checkRegexp = (str, regexp) => {
    return (str && regexp.test(str));
};

export const checkEmail = (email) => {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return checkRegexp(email, regExp);
};

export const checkPhone = (phone) => {
    return checkRegexp(phone, /^\d{10}$/);
};

const createValidator = (compRef, conf) => {
    //conf.disabled = true;
    return new Validator(compRef, conf);
};

class Validator {
    constructor(compRef, conf) {
        this.compRef = compRef;
        this.conf = {
            disabled: false, // выключение всей валидации
            formValidField: 'formValid', // поле в state формы сигнализирующее, что все поля валидны
            lazyValidation: true, // true - подсветка ошибки только при нажатии кнопки, false - сразу при вводе
            revalidateAllOnChange: false, // проверка всех полей при изменении в одном
            ...conf
        };
    }

    handleChange = (fieldName, value) => {
        const newData = {...this.compRef.state.data};
        const newUi = {...this.compRef.state.ui};
        const lazy = this.conf.lazyValidation;
        const checkers = this.conf.fieldsToCheckers;
        const propPath = fieldName.split('.');

        this.setField(newData, propPath, value); // todo

        let formValid;
        if (this.conf.revalidateAllOnChange) {
            formValid = this.checkFields(lazy, newData, newUi, checkers);
        } else {
            this.checkField(lazy, newData, newUi, fieldName, checkers);
            formValid = this.checkFieldFlags(newUi, checkers);
        }
        newUi[this.conf.formValidField] = formValid;
        this.setState(newData, newUi);
    };

    isFormValid = () => {
        if (this.conf.disabled) {
            return true;
        }
        const newData = {...this.compRef.state.data};
        const newUi = {...this.compRef.state.ui};
        const checkers = this.conf.fieldsToCheckers;

        const formValid = this.checkFields(false, newData, newUi, checkers);
        newUi[this.conf.formValidField] = formValid;

        if (!formValid) {
            this.setState(newData, newUi);
        }
        return formValid;
    };

    checkFields = (lazy, dataObj, uiObj, checkersObj) => {
        let checker;
        for (const fieldName in checkersObj) {
            if (checkersObj.hasOwnProperty(fieldName)) {
                checker = checkersObj[fieldName];
                if (typeof checker === "function") {
                    this.checkField(lazy, dataObj, uiObj, fieldName, checkersObj);
                } else {
                    dataObj[fieldName] = {...dataObj[fieldName]};
                    uiObj[fieldName] = {...uiObj[fieldName]};
                    this.checkFields(lazy, dataObj[fieldName], uiObj[fieldName], checker);
                }
            }
        }
        return this.checkFieldFlags(uiObj, checkersObj);
    };

    checkField = (lazy, dataObj, uiObj, fieldName, checkersObj) => {
        if (this.conf.disabled) {
            return true;
        }
        const fieldValidFlag = `${fieldName}Valid`;
        if (!lazy || !uiObj[fieldValidFlag]) {
            uiObj[fieldValidFlag] = checkersObj[fieldName](dataObj[fieldName], dataObj);
        }
    };

    checkFieldFlags = (uiObj, checkersObj) => {
        let formValid = true;
        let checker;
        for (const fieldName in checkersObj) {
            if (checkersObj.hasOwnProperty(fieldName)) {
                checker = checkersObj[fieldName];
                if (typeof checker === "function") {
                    formValid &= uiObj[`${fieldName}Valid`]
                } else { // вложенный объект
                    uiObj[fieldName] = {...uiObj[fieldName]};
                    formValid &= this.checkFieldFlags(uiObj[fieldName], checker);
                }
            }
        }
        return formValid;
    };

    setState(newData, newUi) {
        this.compRef.setState({
            ...this.compRef.state,
            data: newData,
            ui: newUi,
        });
    }
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
    compRef[handlerName] = handler;
    return handler;
};

export const prepareEnterHandler = (compRef, onEnterHandler) => {
    const handlerName = `handleEnter`;
    let handler = compRef[handlerName];
    if (handler) {
        return handler;
    }
    handler = (e) => {
        if (e.key === 'Enter') {
            onEnterHandler(e);
        }
    };
    compRef[handlerName] = handler;
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
    createValidator: createValidator,
};
export default validate;
