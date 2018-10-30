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
};
export default link;
