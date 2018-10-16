import {appStyles} from "app/common/styles";

const userCartStyle = theme => ({
    ...appStyles(theme),

    imgContainer: {
        width: "60px",
        maxHeight: "80px",
        overflow: "hidden",
        display: "block",
        "& img": {
            width: "100%"
        }
    },
    goodsName: {
        color: "#3C4858",
    },
    price: {
        whiteSpace: "nowrap",
    },
});

export default userCartStyle;
