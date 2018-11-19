import {determineUserMessage, SERVER_SIDE_ERROR} from "app/utils/messageUtil";
import util from "app/utils/util";
import axios from "axios";

let backend;
const prepareBackend = () => {
    if (!backend) {
        return util.global.getSiteConfig()
            .then((siteConfig) => {
                const axiosInstance = axios.create({
                    baseURL: siteConfig.backendApiUrl,
                    xsrfCookieName: 'XSRF-TOKEN',
                    xsrfHeaderName: 'X-CSRF-TOKEN',
                    withCredentials: true,
                });
                backend = Promise.resolve({axiosInstance, siteConfig});
                return {axiosInstance, siteConfig};
            });
    }
    return backend;
};

const handleResponse = (response) => {
    if (response.status && response.status !== 200) {
        throw new Error("Exception on server side");
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
                }
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
                method: 'get'
            });
        }).then(handleResponse, handleError);
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
