import {determineUserMessage, SERVER_SIDE_ERROR} from "app/utils/notifyUtil";
import util from "app/utils/util";
import axios from "axios";


const KEY_JWT = 'JWT';
const HEADER_JWT = 'x-auth-token';

let backend;
const prepareBackend = () => {
    if (!backend) {
        return util.global.getSiteConfig()
            .then((siteConfig) => {
                const axiosInstance = axios.create({
                    baseURL: siteConfig.backendApiUrl,
                    headers: {
                        [HEADER_JWT]: localStorage.getItem(KEY_JWT)
                    }
                });
                backend = Promise.resolve({axiosInstance, siteConfig});
                return {axiosInstance, siteConfig};
            });
    }
    return backend;
};

const checkStatus = function (response) {
    if (response.status && response.status !== 200) {
        throw new Error("Exception on server side");
    }
};
const renewToken = function (newJwt) {
    const oldJwt = localStorage.getItem(KEY_JWT);
    if (oldJwt !== newJwt) {
        localStorage.setItem(KEY_JWT, newJwt);
        backend = null;
    }
};
const handleResponse = (response) => {
    checkStatus(response);
    const jwt = response.headers[HEADER_JWT];
    if (jwt) {
        renewToken(jwt);
    }
    const message = determineUserMessage(response.data.message);
    return {
        ...response.data,
        message: message,
        success: !message
    };
};

const handleError = (error) => {
    let message;
    let status;
    if (error && error.response) {
        status = error.response.status;
        if (error.response.data && error.response.data.message) {
            message = determineUserMessage(error.response.data.message);
        } else {
            message = null;
        }
    } else {
        message = SERVER_SIDE_ERROR;
    }
    return {message, status, success: false};
};

const backendPost = (urlTail, request) => {
    return prepareBackend()
        .then((backend) => {
            return backend.axiosInstance.post(urlTail, {
                ...request,
                shopIdentity: backend.siteConfig.shopIdentity
            });
        }).then(handleResponse, handleError);
};

const backendSignin = (loginData) => {
    return util.global.getSiteConfig()
        .then((siteConfig) => {
            return axios({
                url: "auth/login-processing",
                baseURL: siteConfig.backendApiUrl,
                params: {
                    shopIdentity: siteConfig.shopIdentity
                },
                method: 'get',
                auth: {
                    username: loginData.email,
                    password: loginData.password
                },
                headers: {
                    [HEADER_JWT]: localStorage.getItem(KEY_JWT)
                },
            });
        }).then(handleResponse, handleError);
};

const backendSignout = () => {
    return util.global.getSiteConfig()
        .then((siteConfig) => {
            return axios({
                url: "auth/signout",
                baseURL: siteConfig.backendApiUrl,
                params: {
                    shopIdentity: siteConfig.shopIdentity
                },
                method: 'get',
                headers: {
                    [HEADER_JWT]: localStorage.getItem(KEY_JWT)
                },
            });
        }).then((response) => {
            checkStatus(response);
            renewToken(null);
            return {
                ...response.data,
                message: determineUserMessage(response.data.message),
            };
        }, handleError);
};

const localGet = (url, config) => {
    return axios.get(url, config)
        .then(handleResponse, handleError)
};

const ajax = {
    backendPost: backendPost,
    backendSignin: backendSignin,
    backendSignout: backendSignout,
    localGet: localGet,
};
export default ajax;
