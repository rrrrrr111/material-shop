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

const setField = (obj, path, value) => {
    let i = 0;
    path = path.split('.');
    for (; i < path.length - 1; i++) {
        //obj[path[i]] = {...obj[path[i]]};
        obj = obj[path[i]];
    }
    obj[path[i]] = value;
};

const getField = (obj, path) => {
    let i;
    path = path.split('.');
    for (i = 0; i < path.length - 1; i++) {
        obj = obj[path[i]];
    }
    return obj[path[i]];
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

    handleChange = (fieldPath, value) => {
        const compRef = this.compRef,
            newData = {...compRef.state.data},
            newUi = {...compRef.state.ui},
            lazy = this.conf.lazyValidation,
            checkers = this.conf.fieldsToCheckers;

        setField(newData, fieldPath, value);

        newUi[this.conf.formValidField] = this.conf.revalidateAllOnChange
            ? this.checkFields(lazy, newData, newUi, checkers)
            : this.checkFields(lazy, newData, newUi, checkers, fieldPath);
        this.setState(compRef, newData, newUi);
    };

    isFormValid = () => {
        if (this.conf.disabled) {
            return true;
        }
        const compRef = this.compRef,
            newData = {...compRef.state.data},
            newUi = {...compRef.state.ui},
            checkers = this.conf.fieldsToCheckers;

        const formValid = this.checkFields(false, newData, newUi, checkers);
        newUi[this.conf.formValidField] = formValid;
        if (!formValid) {
            this.setState(compRef, newData, newUi);
        }
        return formValid;
    };

    checkFields = (lazy, dataObj, uiObj, checkersObj, fieldPathToCheck) => {
        let fieldNameToCheck = null,
            rest = null;
        if (fieldPathToCheck) {
            const i = fieldPathToCheck.indexOf('.');
            fieldNameToCheck = (i > -1 ? fieldPathToCheck.substring(0, i) : fieldPathToCheck);
            rest = (i > -1 ? fieldPathToCheck.substring(i + 1) : null)
        }

        for (const fieldName in checkersObj) {
            if (checkersObj.hasOwnProperty(fieldName)) {
                if (fieldNameToCheck && fieldName !== fieldNameToCheck) {
                    continue;
                }
                const checker = checkersObj[fieldName];
                if (typeof checker === "function") {
                    this.checkField(lazy, dataObj, uiObj, fieldName, checker);
                } else {
                    dataObj[fieldName] = {...dataObj[fieldName]};
                    uiObj[fieldName] = {...uiObj[fieldName]};
                    this.checkFields(lazy, dataObj[fieldName], uiObj[fieldName], checkersObj[fieldName], rest);
                }
            }
        }
        return this.checkFieldFlags(uiObj, checkersObj);
    };

    checkField = (lazy, dataObj, uiObj, fieldName, checker) => {
        const fieldValidFlag = `${fieldName}Valid`;
        if (!lazy || !uiObj[fieldValidFlag]) {
            const value = dataObj[fieldName];
            uiObj[fieldValidFlag] = checker(value, this.compRef.state.data);
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
                    formValid &= this.checkFieldFlags(uiObj[fieldName], checkersObj[fieldName]);
                }
            }
        }
        return formValid;
    };

    setState(compRef, data, ui) {
        //console.log(">>> validator >>>", data, ui);
        compRef.setState({
            ...compRef.state,
            data,
            ui,
        });
    }
}

export const prepareHandler = (compRef, fieldName, valueHandler) => {
    const handlerName = `handle_${fieldName.replace('.', '_')}Change`;
    let handler = compRef[handlerName];
    if (handler) {
        return handler;
    }
    handler = (e, param) => {
        valueHandler(compRef, fieldName, e, param);
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
    handler = (e, param) => {
        if (e.key === 'Enter') {
            onEnterHandler(e, param);
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
    compRef.validator.handleChange(fieldName, !getField(compRef.state.data, fieldName));
};

const validate = {
    createValidator: createValidator,
};
export default validate;
