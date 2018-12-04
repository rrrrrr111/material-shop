import {dangerColor, grayColor, primaryColor, roseColor} from "app/common/style/styleConsts";


const customCheckboxRadioSwitch = {
    checkRoot: {
        padding: "14px"
    },


    checked: {
        color: primaryColor + "!important"
    },


    labelHorizontal: {
        color: "rgba(0, 0, 0, 0.26)",
        cursor: "pointer",
        display: "inline-flex",
        fontSize: "14px",
        lineHeight: "1.428571429",
        fontWeight: "400",
        paddingTop: "39px",
        marginRight: "0",
        "@media (min-width: 992px)": {
            float: "right"
        }
    },
    labelHorizontalRadioCheckbox: {
        paddingTop: "22px"
    },
    labelLeftHorizontal: {
        color: "rgba(0, 0, 0, 0.26)",
        cursor: "pointer",
        display: "inline-flex",
        fontSize: "14px",
        lineHeight: "1.428571429",
        fontWeight: "400",
        paddingTop: "22px",
        marginRight: "0"
    },

    inlineChecks: {
        marginTop: "8px"
    },
    iconCheckbox: {
        height: "116px",
        width: "116px",
        color: grayColor,
        "& > span:first-child": {
            borderWidth: "4px",
            borderStyle: "solid",
            borderColor: "#CCCCCC",
            textAlign: "center",
            verticalAlign: "middle",
            borderRadius: "50%",
            color: "inherit",
            margin: "0 auto 20px",
            transition: "all 0.2s"
        },
        "&:hover": {
            color: roseColor,
            "& > span:first-child": {
                borderColor: roseColor
            }
        }
    },
    iconCheckboxChecked: {
        color: roseColor,
        "& > span:first-child": {
            borderColor: roseColor
        }
    },
    iconCheckboxIcon: {
        fontSize: "40px",
        lineHeight: "111px"
    },
    switchBase: {
        color: primaryColor + "!important"
    },
    switchIcon: {
        boxShadow: "0 1px 3px 1px rgba(0, 0, 0, 0.4)",
        color: "#FFFFFF !important",
        border: "1px solid rgba(0, 0, 0, .54)",
        transform: "translateX(-4px)!important"
    },
    switchIconChecked: {
        borderColor: "#9c27b0",
        transform: "translateX(0px)!important"
    },
    switchBar: {
        width: "30px",
        height: "15px",
        backgroundColor: "rgb(80, 80, 80)",
        borderRadius: "15px",
        opacity: "0.7!important"
    },
    switchChecked: {
        "& + $switchBar": {
            backgroundColor: "rgba(156, 39, 176, 1) !important"
        }
    }
};

export default customCheckboxRadioSwitch;
