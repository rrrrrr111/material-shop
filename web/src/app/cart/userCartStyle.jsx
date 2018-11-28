import customCheckboxRadioSwitch from "app/common/input/customCheckboxRadioSwitchStyle";
import {helperStyles, blackColor} from "app/common/style/styleConsts";
import {container, main, mainRaised} from "app/common/style/themeStyles";
import {title} from "app/common/style/themeStyles.jsx";

const userCartStyle = theme => ({
    ...helperStyles(theme),
    ...customCheckboxRadioSwitch,
    title,
    main,
    mainRaised,
    container,
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
    agreementCheckboxLabel: {
        fontSize: "10px",
        lineHeight: "12px",
    },
});

export default userCartStyle;
