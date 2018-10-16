import {appStyles} from "app/common/styles";

const userCartStyle = theme => ({
    ...appStyles(theme),

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
    quantityCustomInput: {
        padding: 0,
    },
    quantityInput: {
        ...appStyles(theme).textCenter,
        width: 40,
    },
    price: {
        whiteSpace: "nowrap",
    },
});

export default userCartStyle;
