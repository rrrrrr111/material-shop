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
        const server = process.env.REACT_APP_BACKEND_SERVER_HOST + ":" + process.env.REACT_APP_BACKEND_SERVER_PORT;
        return `http://${server}/api/be/${url}`
    }
};
export default link;
