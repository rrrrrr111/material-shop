const link = {

    productImg(url) {
        return require("public/img/" + url);
    },

    productImgs(images) {
        return images.map((image) => {
            return {
                original: require("public/img/" + image.original),
                thumbnail: require("public/img/" + image.thumbnail)
            }
        });
    },
    beApi(url) {
        return `http://localhost:${process.env.EXPRESS_SERVER_PORT}/api/${url}`
    }
};
export default link;
