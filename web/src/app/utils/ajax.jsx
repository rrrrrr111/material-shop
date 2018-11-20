import {determineUserMessage, SERVER_SIDE_ERROR} from "app/utils/messageUtil";
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
    return {
        ...response.data,
        message: determineUserMessage(response.data.message),
    };
};

const handleError = (error) => {
    if (error && error.response
        && error.response.data && error.response.data.message) {
        return {message: determineUserMessage(error.response.data.message)};
    }
    return {message: SERVER_SIDE_ERROR};
};

const backendPost = (urlTail, request) => {
    return prepareBackend()
        .then((backend) => {
            return backend.axiosInstance.post(urlTail, {
                ...request,
                shopId: backend.siteConfig.shopId
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
                    shopId: siteConfig.shopId
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
                    shopId: siteConfig.shopId
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
