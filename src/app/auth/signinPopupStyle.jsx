import {cardTitle, container, description, mlAuto, mrAuto, title} from "lib/assets/jss/material-kit-pro-react.jsx";

import modalStyle from "lib/assets/jss/material-kit-pro-react/modalStyle.jsx";
import tooltipsStyle from "lib/assets/jss/material-kit-pro-react/tooltipsStyle.jsx";
import popoverStyles from "lib/assets/jss/material-kit-pro-react/popoverStyles.jsx";
import customCheckboxRadioSwitch from "lib/assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.jsx";

const signinPopupStyle = theme => ({
    container,
    description,
    cardTitle,
    mlAuto,
    mrAuto,
    ...tooltipsStyle,
    ...popoverStyles,
    ...modalStyle(theme),
    ...customCheckboxRadioSwitch,
    section: {
        padding: "70px 0 0"
    },
    title: {
        ...title,
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none"
    },
    icon: {
        width: "24px",
        height: "24px",
        color: "#495057"
    },
    label: {
        color: "rgba(0, 0, 0, 0.26)",
        cursor: "pointer",
        display: "inline-flex",
        fontSize: "14px",
        transition: "0.3s ease all",
        lineHeight: "1.428571429",
        fontWeight: "400",
        paddingLeft: "0"
    },
    textCenter: {
        textAlign: "center"
    },
    cardTitleWhite: {
        ...cardTitle,
        color: "#FFFFFF !important"
    },
    socialLine: {
        marginTop: "1rem",
        textAlign: "center",
        padding: "0"
    },
    socialLineButton: {
        "&, &:hover": {color: "#fff"},
        marginLeft: "5px",
        marginRight: "5px",
        "& svg": {
            width: "25px",
            height: "25px",
        },
    },
    cardLoginHeader: {
        marginTop: "-40px",
        padding: "20px 0",
        width: "100%",
        marginBottom: "15px"
    },
    cardLoginBody: {
        paddingTop: "17px",
        paddingBottom: "17px"
    },
    justifyContentCenter: {
        WebkitBoxPack: "center !important",
        MsFlexPack: "center !important",
        justifyContent: "center !important"
    },
    infoArea: {
        padding: "0px 0px 20px !important"
    },
    space50: {
        height: "50px",
        display: "block"
    }
});

export default signinPopupStyle;