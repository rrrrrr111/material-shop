import customSelectStyle from "app/common/input/customSelectStyle";
import imagesStyle from "app/common/style/imagesStyle.jsx";
import {appStyles} from "app/common/style/styles";
import tooltipStyle from "app/common/tooltip/tooltipStyle";
import {
    cardTitle,
    container,
    main,
    mainRaised,
    mlAuto,
    roseColor,
    title
} from "lib/assets/jss/material-kit-pro-react.jsx";


const productStyle = theme => ({
    ...appStyles(theme),
    ...tooltipStyle(theme),
    ...imagesStyle,
    ...customSelectStyle,

    mlAuto,
    main,
    mainRaised,

    container: {
        ...container,
        zIndex: 2,
        paddingBottom: 50,
    },
    title: {
        ...title,
        marginBottom: 0
    },
    mainPrice: {
        margin: "15px 0 25px 0"
    },
    productAccordion: {
        height: 500,
    },
    productAccordionPanel: {
        maxHeight: 300,
        overflowY: "auto",
    },

    productPage: {
        backgroundColor: "#eee",
        "& $mainRaised": {
            padding: "40px"
        },
        "& .image-gallery-slide img": {
            borderRadius: "3px",
            maxWidth: "300px",
            height: "auto"
        },
        "& .image-gallery-swipe": {
            margin: "30px 0px",
            overflow: "hidden",
            width: "100%",
            height: "auto",
            textAlign: "center"
        },
        "& .image-gallery-thumbnails > .image-gallery-thumbnails-container a": {
            "&.active > div": {
                opacity: "1",
                borderColor: "#DDDDDD"
            },
            "& > div": {
                width: "80%",
                maxWidth: "85px",
                margin: "0 auto",
                padding: "8px",
                display: "block",
                border: "1px solid transparent",
                background: "transparent",
                borderRadius: "3px",
                opacity: ".8"
            },
            "& > div img": {
                borderRadius: "3px",
                width: "100%",
                height: "auto",
                textAlign: "center"
            }
        }
    },
    titleRow: {
        marginTop: "-8vh"
    },
    floatRight: {
        float: "right!important"
    },
    pageHeader: {
        minHeight: "60vh",
        maxHeight: "600px",
        height: "auto",
        backgroundPosition: "top center"
    },
    relatedProducts: {
        marginTop: "50px",
        "& $title": {
            marginBottom: "80px"
        }
    },
    pickSize: {
        marginTop: "50px"
    },

    cardCategory: {
        textAlign: "center",
        marginTop: "10px"
    },
    cardTitle: {
        ...cardTitle,
        textAlign: "center"
    },
    cardDescription: {
        textAlign: "center",
        color: "#999"
    },
    textRose: {
        color: roseColor
    },
    justifyContentBetween: {
        justifyContent: "space-between!important"
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
    inlineBlock: {
        display: "inline-block",
        padding: "0px",
        width: "auto"
    },
    list: {
        marginBottom: "0",
        padding: "0",
        marginTop: "0"
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
    icon: {
        top: "3px",
        width: "18px",
        height: "18px",
        position: "relative"
    }
});

export default productStyle;
