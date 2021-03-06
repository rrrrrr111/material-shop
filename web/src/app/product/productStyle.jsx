import customSelectStyle from "app/common/theme/input/customSelectStyle";
import {helperStyles} from "app/common/style/styleConsts";
import tooltipStyle from "app/common/theme/tooltip/tooltipStyle";
import {container, main, mainRaised, title} from "app/common/style/themeStyles.jsx";


const productStyle = theme => ({
    ...helperStyles(theme),
    ...tooltipStyle(theme),
    ...customSelectStyle,

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
    price: {
        margin: 0,
        lineHeight: 2,
        fontSize: "25px",
    },
    productAccordion: {
        height: 500,
    },
    productAccordionPanel: {
        maxHeight: 300,
        overflowY: "auto",
    },
});

export default productStyle;
