import util from "app/utils/util";
import axios from "axios";

const checkError = (ajaxResponse) => {
    if (ajaxResponse.status && ajaxResponse.status !== '200') {
        console.log(ajaxResponse);
        throw "Exception on server side";
    }
};

const normalizeUrl = function (url) {
    if (url.charAt(url.length - 1) !== '/') {
        url += '/';
    }
    return url;
};

let backendAxios;
const getBackendAxios = () => {
    if (!backendAxios) {
        return util.global.getSiteConfig()
            .then((siteConfig) => {
                const ax = axios.create({
                    baseURL: siteConfig.backendApiUrl,
                    xsrfCookieName: 'XSRF-TOKEN',
                    xsrfHeaderName: 'X-XSRF-TOKEN',
                });
                backendAxios = Promise.resolve(ax);
                return ax;
            });
    }
    return backendAxios;
};

const fetchBe = (urlTail, request) => {
    return getBackendAxios()
        .then((backendAxios) => {
            return backendAxios.post(urlTail, request);
        }).then(function (response) {
            return response.data;
        }).then(function (json) {
            checkError(json);
            return json;
        });
};

const fetchSiteConfig = () => {
    return axios.get("/configurable/site-config.json")
        .then(response => response.data)
};
const ajax = {
    fetchBe: fetchBe,
    fetchSiteConfig: fetchSiteConfig,
};
export default ajax;
