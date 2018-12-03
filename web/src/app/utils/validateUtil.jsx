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
        const context = this.initContext();

        setField(context.rootData, fieldPath, value);
        setField(context.data, fieldPath, value);

        context.rootUi[this.conf.formValidField] = this.conf.revalidateAllOnChange
            ? this.checkFields(context)
            : this.checkFields(context, fieldPath);
        this.setState(context);
    };

    validate = () => {
        if (this.conf.disabled) {
            return true;
        }
        const context = this.initContext(false);
        const formValid = this.checkFields(context);

        context.rootUi[this.conf.formValidField] = formValid;
        return {
            formValid,
            state: {
                ...context.compRef.state,
                data: context.rootData,
                ui: context.rootUi,
            }
        };
    };

    initContext = (lazy = this.conf.lazyValidation) => {
        const compRef = this.compRef,
            newData = {...compRef.state.data},
            newUi = {...compRef.state.ui};
        return {
            compRef,
            lazy,
            rootData: newData,
            data: newData,
            rootUi: newUi,
            ui: newUi,
            rootCheckers: this.conf.checkers,
            checkers: this.conf.checkers,
        };
    };

    checkFields = (context, fieldPathToCheck) => {
        let fieldNameToCheck = null,
            restPath = null,
            formValid = true;
        if (fieldPathToCheck) {
            const i = fieldPathToCheck.indexOf('.');
            fieldNameToCheck = (i > -1 ? fieldPathToCheck.substring(0, i) : fieldPathToCheck);
            restPath = (i > -1 ? fieldPathToCheck.substring(i + 1) : null)
        }
        const checkers = context.checkers;
        for (const fieldName in checkers) {
            if (checkers.hasOwnProperty(fieldName)) {

                const checker = checkers[fieldName];
                if (typeof checker === "function") {
                    if (!(fieldNameToCheck && fieldName !== fieldNameToCheck)) {
                        this.checkField(context, fieldName, checker);
                    }
                    formValid &= context.ui[`${fieldName}Valid`];
                } else {
                    if (!(fieldNameToCheck && fieldName !== fieldNameToCheck)) {
                        context.data[fieldName] = {...context.data[fieldName]};
                        context.ui[fieldName] = {...context.ui[fieldName]};
                    }
                    context.data = context.data[fieldName];
                    context.ui = context.ui[fieldName];
                    context.checkers = context.checkers[fieldName];
                    formValid &= this.checkFields(context, restPath);
                }
            }
        }
        return formValid;
    };

    checkField = (context, fieldName, checker) => {
        const fieldValidFlag = `${fieldName}Valid`;
        if (!context.lazy || !context.ui[fieldValidFlag]) {
            const value = context.data[fieldName],
                valid = checker(value, context.rootData);
            context.ui[fieldValidFlag] = !!valid;
            //console.log(`>>> validator.checkField >>> ${fieldName} is valid: ${context.ui[fieldValidFlag]}`);
        }
    };

    setState(context) {
        console.log(">>> validator.setState >>> data:", context.rootData, "ui:", context.rootUi);
        context.compRef.setState({
            ...context.compRef.state,
            data: context.rootData,
            ui: context.rootUi,
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
