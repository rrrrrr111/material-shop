// ##############################
// // // Badge component styles
// #############################
import {
    dangerColor,
    infoColor,
    primaryColor,
    roseColor,
    successColor,
    warningColor
} from "app/common/style/styleConsts";

const badgeStyle = {
    badge: {
        marginRight: "3px",
        borderRadius: "12px",
        padding: "5px 12px",
        textTransform: "uppercase",
        fontSize: "10px",
        fontWeight: "500",
        lineHeight: "1",
        color: "#fff",
        textAlign: "center",
        whiteSpace: "nowrap",
        verticalAlign: "baseline",
        display: "inline-block"
    },
    primary: {
        backgroundColor: primaryColor
    },
    warning: {
        backgroundColor: warningColor
    },
    danger: {
        backgroundColor: dangerColor
    },
    success: {
        backgroundColor: successColor
    },
    info: {
        backgroundColor: infoColor
    },
    rose: {
        backgroundColor: roseColor
    },
    gray: {
        backgroundColor: "#6c757d"
    }
};

export default badgeStyle;
