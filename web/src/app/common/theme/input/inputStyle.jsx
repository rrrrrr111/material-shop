import {dangerColor, font, primaryColor, successColor} from "app/common/style/styleConsts";
import {formControl, labelRoot,} from "app/common/style/themeStyles.jsx";

const inputStyle = {
    formControl,
    labelRoot,
    disabled: {
        "&:before": {
            backgroundColor: "transparent !important"
        }
    },
    underline: {
        "&:hover:not($disabled):before,&:before": {
            borderBottomColor: "#D2D2D2 !important",
            borderBottomWidth: "1px !important"
        },
        "&:after": {
            borderBottomColor: primaryColor
        }
    },
    underlineError: {
        "&:after": {
            borderBottomColor: dangerColor
        }
    },
    underlineSuccess: {
        "&:after": {
            borderBottomColor: successColor
        }
    },
    labelRootError: {
        color: dangerColor + " !important"
    },
    labelRootSuccess: {
        color: successColor + " !important"
    },
    feedback: {
        position: "absolute",
        bottom: "4px",
        right: "0",
        zIndex: "2",
        display: "block",
        width: "24px",
        height: "24px",
        textAlign: "center",
        pointerEvents: "none"
    },
    whiteUnderline: {
        "&:hover:not($disabled):before,&:before": {
            borderBottomColor: "#FFFFFF"
        },
        "&:after": {
            borderBottomColor: "#FFFFFF"
        }
    },
    input: {
        color: "#495057",
        "&,&::placeholder": {
            fontSize: "14px",
            fontFamily: font,
            fontWeight: "400",
            lineHeight: "1.42857",
            opacity: "1"
        },
        "&::placeholder": {
            color: "#AAAAAA"
        }
    },
    whiteInput: {
        "&,&::placeholder": {
            color: "#FFFFFF",
            opacity: "1"
        }
    }
};

export default inputStyle;
