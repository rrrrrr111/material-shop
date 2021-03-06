import {helperStyles, roseColor} from "app/common/style/styleConsts";
import {cardTitle, title} from "app/common/style/themeStyles.jsx";
import tooltipStyle from "app/common/theme/tooltip/tooltipStyle";


const fancyFeedStyle = theme => ({
    ...helperStyles(theme),
    ...tooltipStyle(theme),

    title: {
        ...title,
        marginBottom: 0
    },
    relatedProducts: {
        marginTop: "50px",
        "& $title": {
            marginBottom: "80px"
        }
    },
    textRose: {
        color: roseColor
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
});

export default fancyFeedStyle;
