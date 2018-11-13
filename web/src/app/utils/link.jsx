import util from "app/utils/util";
import fill from "lodash/fill"
import toNumber from "lodash/toNumber"

const indexOf = function (str, symbol) {
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

const DEFAULT_IMAGE_EXTENSION = "jpg";
const partToExtension = function (imgNumDef) {
    const semIndex = imgNumDef.indexOf(':');
    if (semIndex === -1) {
        return DEFAULT_IMAGE_EXTENSION;
    } else {
        return imgNumDef.substring(semIndex + 1).trim();
    }
};

const partToNumber = function (imgNumDef) {
    const semIndex = imgNumDef.indexOf(':');
    if (semIndex === -1) {
        return toNumber(imgNumDef.trim());
    } else {
        return toNumber(imgNumDef.substring(0, semIndex).trim());
    }
};

const toImgExtensions = function (imgNumDefs) {
    const parts = imgNumDefs.split(',');
    const arrSize = partToNumber(parts[parts.length - 1]);
    const arr = fill(Array(arrSize), DEFAULT_IMAGE_EXTENSION);

    for (let i = 0; i < parts.length; i++) {
        const number = partToNumber(parts[i]);
        arr[number - 1] = partToExtension(parts[i]);
    }
    return arr;
};

const link = {

    /**
     * Строит полные URL из сокращения,
     * например сокращение /some-url[2:png,4]
     * преобразуется в набор URL картинок:
     * /img/some-url/p1.jpg  /img/some-url/p2.png
     * /img/some-url/p3.jpg  /img/some-url/p4.jpg
     */
    productImgs(imgDef) {
        const urlPart = subPart(imgDef, undefined, '[');
        const imgPart = subPart(imgDef, '[', ']');
        const imgExtensions = toImgExtensions(imgPart);
        const imageUrlPrefix = util.global.getSiteConfigSync().imageUrlPrefix;

        return imgExtensions.map((ext, index) => {
            const url = `${imageUrlPrefix}/${urlPart}/p${index + 1}.${ext}`;
            return {original: url, thumbnail: url}
        });
    },

    /**
     * Строит полный URL первой картинки
     */
    productImg(imgDef) {
        const urlPart = subPart(imgDef, undefined, '[');
        const imgPart = subPart(imgDef, '[', ']');
        const imgExtensions = toImgExtensions(imgPart);
        const imageUrlPrefix = util.global.getSiteConfigSync().imageUrlPrefix;

        return `${imageUrlPrefix}/${urlPart}/p1.${imgExtensions[0]}`;
    },

    productLink(link) {
        return `/p/${link}`;
    },
};
export default link;
