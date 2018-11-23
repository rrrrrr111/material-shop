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
        const newData = {...this.compRef.state.data, [fieldName]: value};
        const newUi = {...this.compRef.state.ui};
        const lazy = this.conf.lazyValidation;

        if (this.conf.revalidateAllOnChange) {
            this.checkFields(lazy, newData, newUi);
        } else {
            this.checkField(lazy, newData, newUi, fieldName);
            this.checkFieldFlags(newUi);
        }
        this.setState(newData, newUi);
    };

    isFormValid = () => {
        if (this.conf.disabled) {
            return true;
        }

        const newData = {...this.compRef.state.data};
        const newUi = {...this.compRef.state.ui};
        this.checkFields(false, newData, newUi);
        const formValid = newUi[this.conf.formValidField];

        if (!formValid) {
            this.setState(newData, newUi);
        }
        return formValid;
    };

    checkFields = (lazy, newData, newUi) => {
        const checkers = this.conf.fieldsToCheckers;

        for (const fieldName in checkers) {
            if (checkers.hasOwnProperty(fieldName)) {
                this.checkField(lazy, newData, newUi, fieldName);
            }
        }
        this.checkFieldFlags(newUi);
    };

    checkField = (lazy, newData, newUi, fieldName) => {
        if (this.conf.disabled) {
            return true;
        }
        const fieldValidFlag = `${fieldName}Valid`;
        if (!lazy || !newUi[fieldValidFlag]) {
            newUi[fieldValidFlag] = this.conf.fieldsToCheckers[fieldName](newData[fieldName], newData);
        }
    };

    checkFieldFlags = (newUi) => {
        const checkers = this.conf.fieldsToCheckers;
        let formValid = true;
        for (const fieldName in checkers) {
            if (checkers.hasOwnProperty(fieldName)) {
                formValid &= newUi[`${fieldName}Valid`]
            }
        }
        newUi[this.conf.formValidField] = formValid;
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
    handler.bind(compRef);
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
    createValidator: createValidator,
};
export default validate;
