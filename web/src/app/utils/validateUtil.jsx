const isNotBlank = (str) => {
    return (str && str.trim().length !== 0);
};

const checkRegexp = (str, regexp) => {
    return (str && regexp.test(str));
};

const checkEmail = (email) => {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return checkRegexp(email, regExp);
};

const validate = {
    isNotBlank: isNotBlank,
    checkRegexp: checkRegexp,
    checkEmail: checkEmail,
};
export default validate;
