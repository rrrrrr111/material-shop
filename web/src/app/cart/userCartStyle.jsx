import {blackColor, helperStyles} from "app/common/style/styleConsts";
import {container, main, mainRaised, smallText} from "app/common/style/themeStyles";
import {title} from "app/common/style/themeStyles.jsx";

const userCartStyle = theme => ({
    ...helperStyles(theme),
    title,
    main,
    mainRaised,
    container,
    smallText,
    cartContainer: {
        margin: "-35px 0 50px 0",
    },
    goodsContainer: {
        ...helperStyles(theme).centeredContainer,
        maxWidth: 1200,
    },
    orderContainer: {
        ...helperStyles(theme).centeredContainer,
        maxWidth: 800,
    },
    paymentContainer: {
        ...helperStyles(theme).centeredContainer,
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
        ...helperStyles(theme).alignCenter,
        width: "60px",
        maxHeight: "80px",
        overflow: "hidden",
        display: "block",
        "& img": {
            width: "100%"
        }
    },
    goodsName: {
        color: blackColor,
    },
    quantityCustomInput: {
        padding: 0,
    },
    quantityInput: {
        ...helperStyles(theme).textCenter,
        width: 40,
    },
    tableFooterContainer: {
        ...helperStyles(theme).width100,
    },
    signinOrSignup: {
        ...smallText,
        margin: "0 0 0 20px",
    },
});

export default userCartStyle;
