import customCheckboxRadioSwitch from "app/common/theme/input/customCheckboxRadioSwitchStyle.jsx";
import modalStyle from "app/common/style/component/modalStyle.jsx";
import popoverStyles from "app/common/style/component/popoverStyles.jsx";
import {helperStyles} from "app/common/style/styleConsts";
import tooltipStyle from "app/common/theme/tooltip/tooltipStyle.jsx";
import {cardTitle, container, description, mlAuto, mrAuto, title} from "app/common/style/themeStyles.jsx";


const loginPopupStyle = theme => ({
    container,
    description,
    cardTitle,
    mlAuto,
    mrAuto,
    ...helperStyles(theme),
    ...tooltipStyle(theme),
    ...popoverStyles,
    ...modalStyle(theme),
    ...customCheckboxRadioSwitch,
    section: {
        padding: "70px 0 0"
    },
    modalLogin: {
        width: "100%",
        minWidth: "250px",
        maxWidth: "360px",
        [theme.breakpoints.down("sm")]: {
            width: "80%",
            maxWidth: "300px",
        },
        "& $modalCloseButton": {
            color: "#fff",
            top: "-10px",
            right: "10px",
            textShadow: "none",
            position: "relative"
        },
        "& $modalHeader": {
            borderBottom: "none",
            paddingTop: "24px",
            paddingRight: "24px",
            paddingBottom: "0",
            paddingLeft: "24px"
        },
        "& $modalBody": {
            paddingBottom: "0",
            paddingTop: "0"
        },
        "& $modalFooter": {
            paddingBottom: "0",
            paddingTop: "0"
        }
    },
    modalLoginCard: {
        marginBottom: "20px",
        margin: "0",
        "& $modalHeader": {
            paddingTop: "0"
        }
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
        paddingBottom: "17px",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
    infoArea: {
        padding: "0px 0px 20px !important"
    },
    space50: {
        height: "50px",
        display: "block"
    },
});

export default loginPopupStyle;
