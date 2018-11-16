import util from "app/utils/util";

let siteConfig;
const getSiteConfig = () => {
    if (!siteConfig) {
        return util.ajax.localGet("/configurable/site-config.json")
            .then(json => {
                siteConfig = json;
                return json;
            });
    }
    return Promise.resolve(siteConfig);
};

const getSiteConfigSync = () => {
    if (!siteConfig) {
        throw new Error("Site config not loaded yet");
    }
    return siteConfig;
};

const global = {
    getSiteConfig: getSiteConfig,
    getSiteConfigSync: getSiteConfigSync,
};
export default global;
