import tooltipStyle from "app/common/tooltip/tooltipStyle.jsx";
import {mlAuto} from "lib/assets/jss/material-kit-pro-react.jsx";

const menuStyle = theme => ({
    ...tooltipStyle(theme),

    list: {
        /* для десктопа */
        [theme.breakpoints.up("md")]: {
            WebkitBoxAlign: "center",
            MsFlexAlign: "center",
            alignItems: "center",
            WebkitBoxOrient: "horizontal",
            WebkitBoxDirection: "normal",
            MsFlexDirection: "row",
            flexDirection: "row",
            maxHeight: "100%"
        },
        /* для мобил */
        [theme.breakpoints.down("sm")]: {
            display: "block"
        },
        marginTop: "0px",
        display: "flex",
        paddingLeft: "0",
        marginBottom: "0",
        listStyle: "none",
        padding: "0"
    },
    listItem: {
        float: "left",
        color: "inherit",
        position: "relative",
        display: "block",
        width: "auto",
        margin: "0",
        padding: "0",
        [theme.breakpoints.down("sm")]: {
            "& ul": {
                maxHeight: "400px",
                overflowY: "auto", // my
                overflowX: "auto", // my
            },
            width: "100%",
            "&:not(:last-child)": {
                "&:after": {
                    width: "calc(100% - 30px)",
                    content: '""',
                    display: "block",
                    height: "1px",
                    marginLeft: "15px",
                    backgroundColor: "#e5e5e5"
                }
            }
        }
    },
    listItemText: {
        padding: "0 !important"
    },
    rootMenuItemButton: {
        color: "inherit",
        position: "relative",
        padding: "0.9375rem",
        fontWeight: "400",
        fontSize: "12px",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        "&:hover,&:focus": {
            color: "inherit"
        },
        "& .fab,& .far,& .fal,& .fas,& .material-icons": {
            position: "relative",
            top: "2px",
            marginTop: "-4px",
            marginRight: "4px",
            marginBottom: "0px",
            fontSize: "1.25rem"
        },
        [theme.breakpoints.down("sm")]: {
            width: "calc(100% - 30px)",
            marginLeft: "10px",
            marginBottom: "6px", // my
            marginTop: "6px", // my
            textAlign: "left",
            "& > span:first-child": {
                justifyContent: "flex-start"
            }
        },
        "& svg": {
            marginRight: "3px",
            width: "20px",
            height: "20px"
        }
    },
    navLinkJustIcon: {
        "& .fab,& .far,& .fal,& .fas,& .material-icons": {
            marginRight: "0px"
        },
        "& svg": {
            marginRight: "0px"
        }
    },
    navButton: {
        position: "relative",
        fontWeight: "400",
        fontSize: "12px",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        [theme.breakpoints.down("sm")]: {
            width: "calc(100% - 30px)",
            marginLeft: "15px",
            marginBottom: "5px",
            marginTop: "5px",
            textAlign: "left",
            "& > span:first-child": {
                justifyContent: "flex-start"
            }
        }
    },
    notificationNavLink: {
        color: "inherit",
        padding: "0.9375rem",
        fontWeight: "400",
        fontSize: "12px",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        top: "4px"
    },
    registerNavLink: {
        top: "3px",
        position: "relative",
        fontWeight: "400",
        fontSize: "12px",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex"
    },
    navLinkActive: {
        "&, &:hover, &:focus,&:active ": {
            color: "inherit",
            backgroundColor: "rgba(255, 255, 255, 0.1)"
        }
    },
    dropdownIcons: {
        width: "24px",
        height: "24px",
        fontSize: "24px",
        margin: "-4px 14px 0 0",
        opacity: "0.5",
        top: "1px",
        verticalAlign: "middle",
        position: "relative",
        "&.fas, &.fab": { // my
            margin: "-4px 11px 0 3px",
            fontSize: "22px",
        },
    },
    socialIcons: {
        position: "relative",
        fontSize: "1.25rem",
        maxWidth: "24px"
    },
    socialIconsButton: {
        top: "4px",
        [theme.breakpoints.down("sm")]: {
            top: "0"
        }
    },
    dropdownLink: {
        "&,&:hover,&:focus": {
            color: "inherit",
            textDecoration: "none",
            display: "flex",
            padding: "0.75rem 1.25rem 0.75rem 0.75rem",
            whiteSpace: "normal",
            /* для десктопа */
            [theme.breakpoints.up("md")]: { //my
                minWidth: 200,
                maxWidth: 300,
            },
        }
    },
    marginRight5: {
        marginRight: "5px"
    },
    collapse: {
        [theme.breakpoints.up("md")]: {
            display: "flex !important",
            MsFlexPreferredSize: "auto",
            flexBasis: "auto"
        },
        WebkitBoxFlex: "1",
        MsFlexPositive: "1",
        flexGrow: "1",
        WebkitBoxAlign: "center",
        MsFlexAlign: "center",
        alignItems: "center"
    },
    mlAuto
});

export default menuStyle;
