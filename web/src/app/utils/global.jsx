import util from "app/utils/util";

let siteConfig;
const getSiteConfig = () => {
    if (!siteConfig) {
        return util.ajax.fetchSiteConfig()
            .then(json => {
                siteConfig = json;
                console.log("fetch used ");
                return siteConfig;
            });
    }
    console.log("cash used ");
    return Promise.resolve(siteConfig)
};

const global = {
    getSiteConfig: getSiteConfig,
};
export default global;
