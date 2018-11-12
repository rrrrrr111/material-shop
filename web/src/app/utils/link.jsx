import fill from "lodash/fill"
import toNumber from "lodash/toNumber"

let indexOf = function (str, symbol) {
    const index = str.indexOf(symbol);
    if (index === -1) {
        throw `Symbol ${symbol} not found in ${str}`;
    }
    return index;
};
const subPart = function (str, fromSymbol, toSymbol) {
    let fromIndex;
    if (fromSymbol) {
        fromIndex = indexOf(str, fromSymbol) + 1;
    } else {
        fromIndex = 0;
    }
    let toIndex;
    if (toSymbol) {
        toIndex = indexOf(str, toSymbol);
    } else {
        toIndex = str.length;
    }
    return str.substring(fromIndex, toIndex);
};

const partToExtension = function (imgNumDef) {
    imgNumDef = imgNumDef.trim();
    let semIndex = imgNumDef.indexOf(':');
    if (semIndex === -1) {
        return "jpg";
    } else {
        return imgNumDef.substring(semIndex + 1);
    }
};

const partToNumber = function (imgNumDef) {
    imgNumDef = imgNumDef.trim();
    let semIndex = imgNumDef.indexOf(':');
    if (semIndex === -1) {
        return toNumber(imgNumDef);
    } else {
        return toNumber(imgNumDef.substring(0, semIndex));
    }
};

const toImgExtensions = function (imgNumDefs) {
    const parts = imgNumDefs.split(',');
    const arrSize = partToNumber(parts[parts.length - 1]);
    const arr = fill(Array(arrSize), "jpg");

    for (let i = 0; i < parts.length; i++) {
        const number = partToNumber(parts[i]);
        arr[number - 1] = partToExtension(parts[i]);
    }
    return arr;
};


const link = {

    /**
     * Например /some-url[1,2,5:gif,7]
     */
    productImg(imgDef) {
        const urlPart = subPart(imgDef, undefined, '[');
        const imgPart = subPart(imgDef, '[', ']');
        const imgExtensions = toImgExtensions(imgPart);

        return `/img/${urlPart}/p1.${imgExtensions[0]}`;
    },

    productLink(link) {
        return `/p/${link}`;
    },

    productImgs(imgDef) {
        const urlPart = subPart(imgDef, undefined, '[');
        const imgPart = subPart(imgDef, '[', ']');
        const imgExtensions = toImgExtensions(imgPart);

        return imgExtensions.map((ext, index) => {
            const url = `/img/${urlPart}/p${index + 1}.${ext}`;
            return {original: url, thumbnail: url}
        });
    },
    beApi(url) {
        //const server = process.env.REACT_APP_BACKEND_SERVER_HOST + ":" + process.env.REACT_APP_BACKEND_SERVER_PORT;
        const server = "127.0.0.1:8080";
        return `http://${server}/api/be/${url}`
    }
};
export default link;
