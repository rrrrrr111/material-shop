import util from "app/utils/util";
import axios from "axios";

const checkError = (response) => {
    if (response.status && response.status !== 200) {
        throw new Error("Exception on server side");
    }
};

let backendAxios;
const getBackendAxios = () => {
    if (!backendAxios) {
        return util.global.getSiteConfig()
            .then((siteConfig) => {
                const ax = axios.create({
                    baseURL: siteConfig.backendApiUrl,
                    xsrfCookieName: 'XSRF-TOKEN',
                    xsrfHeaderName: 'X-CSRF-TOKEN',
                });
                backendAxios = Promise.resolve(ax);
                return ax;
            });
    }
    return backendAxios;
};

const backendPost = (urlTail, request) => {
    return getBackendAxios()
        .then((backendAxios) => {
            return backendAxios.post(urlTail, request);
        }).then(function (response) {
            checkError(response);
            return response.data;
        });
};

export const UNKNOWN_SERVER_CONNECTION_ERROR = "Unknown error";
const backendLogin = (loginData) => {
    return util.global.getSiteConfig()
        .then((siteConfig) => {
            return axios({
                url: "auth/login-processing",
                baseURL: siteConfig.backendApiUrl,
                method: 'get',
                auth: {
                    username: loginData.email,
                    password: loginData.password
                }
            });
        }).then(
            function (response) {
                checkError(response);
                return response.data.message;
            },
            function (error) {
                if (error && error.response
                    && error.response.data && error.response.data.message) {
                    return error.response.data.message;
                }
                return UNKNOWN_SERVER_CONNECTION_ERROR;
            });
};

const localGet = (url, config) => {
    return axios.get(url, config)
        .then(response => {
            checkError(response);
            return response.data;
        })
};
const ajax = {
    backendPost: backendPost,
    backendLogin: backendLogin,
    localGet: localGet,
};
export default ajax;
