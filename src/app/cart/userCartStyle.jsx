import customCheckboxRadioSwitch from "app/common/input/customCheckboxRadioSwitchStyle";
import {appStyles} from "app/common/style/styles";
import {title} from "lib/assets/jss/material-kit-pro-react.jsx";

const userCartStyle = theme => ({
    ...appStyles(theme),
    ...customCheckboxRadioSwitch,
    title,

    goodsContainer: {
        ...appStyles(theme).centeredContainer,
        maxWidth: 1200,
    },
    orderContainer: {
        ...appStyles(theme).centeredContainer,
        maxWidth: 800,
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
    agreementCheckboxLabel: {
        fontSize: "10px",
        lineHeight: "12px",
    },
});

export default userCartStyle;
