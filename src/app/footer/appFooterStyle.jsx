import {btnLink, container, description, section, title} from "lib/assets/jss/material-kit-pro-react.jsx";
import imagesStyles from "lib/assets/jss/material-kit-pro-react/imagesStyles.jsx";

const appFooterStyle = {
    ...imagesStyles,
    container,
    title,
    description,
    dividerBlock: {
        height: 40
    },
    section: {
        ...section,
        padding: "70px 0px"
    },
    socialFeed: {
        "& p": {
            display: "table-cell",
            verticalAlign: "top",
            overflow: "hidden",
            paddingBottom: "10px",
            maxWidth: 300
        },
        "& i": {
            fontSize: "20px",
            display: "table-cell",
            paddingRight: "10px"
        }
    },
    img: {
        width: "20%",
        marginRight: "5%",
        marginBottom: "5%",
        float: "left"
    },
    list: {
        marginBottom: "0",
        padding: "0",
        marginTop: "0"
    },
    inlineBlock: {
        display: "inline-block",
        padding: "0px",
        width: "auto"
    },
    left: {
        float: "left!important",
        display: "block"
    },
    right: {
        padding: "15px 0",
        margin: "0",
        float: "right"
    },
    aClass: {
        textDecoration: "none",
        backgroundColor: "transparent"
    },
    block: {
        color: "inherit",
        padding: "0.9375rem",
        fontWeight: "500",
        fontSize: "12px",
        textTransform: "uppercase",
        borderRadius: "3px",
        textDecoration: "none",
        position: "relative",
        display: "block"
    },
    footerBrand: {
        height: "50px",
        padding: "15px 15px",
        fontSize: "18px",
        lineHeight: "50px",
        marginLeft: "-15px",
        color: "#3c4858",
        textDecoration: "none",
        fontWeight: 700,
        fontFamily: "Roboto Slab,Times New Roman,serif"
    },
    pullCenter: {
        display: "inline-block",
        float: "none"
    },
    socialIcons: {
        "& ul": {
            marginBottom: 0,
            padding: 0,
            listStyle: "none",
            "& li": {
                display: "inline-block"
            },
            "& a": {
                display: "block"
            }
        }
    },
    iconSocial: {
        width: "25px",
        height: "25px",
        fontSize: "24px",
        minWidth: "41px",
        padding: 0,
        overflow: "hidden",
        position: "relative",
        margin: "0 5px 20px 0"
    },
    linksVertical: {
        "& li": {
            display: "block !important",
            marginLeft: "-5px",
            marginRight: "-5px",
            "& a": {
                padding: "5px !important"
            }
        }
    },
    footer: {
        "& ul li": {
            display: "inline-block"
        },
        "& h4, & h5": {
            color: "#3c4858",
            textDecoration: "none"
        },
        "& ul:not($socialButtons) li a": {
            color: "inherit",
            padding: "0.9375rem",
            fontWeight: "500",
            fontSize: "12px",
            textTransform: "uppercase",
            borderRadius: "3px",
            textDecoration: "none",
            position: "relative",
            display: "block"
        },
        "& small": {
            fontSize: "75%",
            color: "#777"
        },
        "& $pullCenter": {
            display: "inline-block",
            float: "none"
        }
    },
    copyRight: {
        padding: "15px 0px"
    },
    socialButtons: {
        "& li": {
            display: "inline-block"
        }
    },
    icon: {
        top: "3px",
        width: "18px",
        height: "18px",
        position: "relative"
    },
    footerLinks: {
        textAlign: "left",
        "& H5": {
            fontWeight: "700",
            fontFamily: "Roboto Slab,Times New Roman,serif",
        },
        "& p": {
            fontSize: "13px",
            padding: "20px 5pc 0 5px",
            lineHeight: "16px",
            overflow: "hidden",
        },
    },
    copyRightInfo: {
        fontSize: "8px",
        lineHeight: "10px",
        textAlign: "justify",
        color: "#666",
        margin: "12px 5px 0 5px",
    },
};

export default appFooterStyle;
