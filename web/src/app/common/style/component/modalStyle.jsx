const modalStyle = theme => ({
    modalRoot: {
        overflow: "auto",
        display: "block"
    },
    modal: {
        [theme.breakpoints.up("sm")]: {
            maxWidth: "500px",
            margin: "1.75rem auto"
        },
        borderRadius: "6px",
        overflow: "visible",
        maxHeight: "unset",
        width: "100%",
        marginTop: "130px !important"
    },
    modalHeader: {
        borderBottom: "none",
        paddingTop: "24px",
        paddingRight: "24px",
        paddingBottom: "0",
        paddingLeft: "24px",
        minHeight: "16.43px"
    },
    modalTitle: {
        margin: "0",
        lineHeight: "1.5"
    },
    modalCloseButton: {
        "&, &:hover": {
            color: "#999999"
        },
        "&:hover": {
            opacity: "1"
        },
        cursor: "pointer",
        padding: "1rem",
        margin: "-1rem -1rem -1rem auto",
        backgroundColor: "transparent",
        border: "0",
        WebkitAppearance: "none",
        float: "right",
        fontSize: "1.5rem",
        fontWeight: "500",
        lineHeight: "1",
        textShadow: "0 1px 0 #ffffff",
        opacity: ".5"
    },
    modalClose: {
        fontSize: "16px",
        lineHeight: "40px",
        overflow: "visible",
    },
    modalBody: {
        paddingTop: "24px",
        paddingRight: "24px",
        paddingBottom: "16px",
        paddingLeft: "24px",
        position: "relative",
        overflow: "visible"
    },
    modalFooter: {
        padding: "15px",
        textAlign: "right",
        paddingTop: "0",
        marginBottom: "17px",
    },
    modalFooterCenter: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    instructionNoticeModal: {
        marginBottom: "25px"
    },
    imageNoticeModal: {
        maxWidth: "150px"
    },
    modalLarge: {
        [theme.breakpoints.up("md")]: {
            maxWidth: "800px"
        }
    },
    modalSmall: {
        [theme.breakpoints.up("sm")]: {
            width: "300px",
            margin: "1.75rem auto"
        },
        margin: "0 auto"
    },
    modalSmallBody: {
        marginTop: "20px"
    },
    modalSmallFooterFirstButton: {
        margin: "0",
        paddingLeft: "16px",
        paddingRight: "16px",
        width: "auto"
    },
    modalSmallFooterSecondButton: {
        marginBottom: "0",
        marginLeft: "5px"
    },
});

export default modalStyle;
