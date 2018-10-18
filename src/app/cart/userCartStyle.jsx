import {appStyles} from "app/common/styles";
import {title} from "lib/assets/jss/material-kit-pro-react.jsx";

const userCartStyle = theme => ({
    ...appStyles(theme),
    title,

    goodsContainer: {
        ...appStyles(theme).centeredContainer,
        maxWidth: 1200,
    },
    orderContainer: {
        ...appStyles(theme).centeredContainer,
        maxWidth: 1200,
    },
    paymentContainer: {
        ...appStyles(theme).centeredContainer,
        maxWidth: 1200,
    },
    goodsTableContainer: {
        minHeight: 400,
    },
    imgCell: {
        width: "100%",
        padding: "0 30px 0 30px",
    },
    imgContainer: {
        ...appStyles(theme).alignCenter,
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
    quantityCustomInput: {
        padding: 0,
    },
    quantityInput: {
        ...appStyles(theme).textCenter,
        width: 40,
    },
    tableFooterContainer: {
        ...appStyles(theme).width100,
    },
    price: {
        ...appStyles(theme).nowrap,
        color: title.color,
        fontFamily: title.fontFamily,
        fontSize: "1.0625rem",
        fontWeight: title.fontWeight,
    },
    rubSign: {
        marginLeft: 4,
        fontSize: 13,
    },
    priceTotal: {
        ...appStyles(theme).nowrap,
        ...appStyles(theme).right,
        color: title.color,
        fontFamily: title.fontFamily,
        fontWeight: title.fontWeight,
        fontSize: "1.5625rem",
        margin: "20px 40px 20px 40px",
    },
    rubSignTotal: {
        marginLeft: 5,
        fontSize: 18,
    },
});

export default userCartStyle;
