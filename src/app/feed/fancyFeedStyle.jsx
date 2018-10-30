import {appStyles} from "app/common/style/styles";
import tooltipStyle from "app/common/tooltip/tooltipStyle";
import {cardTitle, roseColor, title} from "lib/assets/jss/material-kit-pro-react.jsx";


const fancyFeedStyle = theme => ({
    ...appStyles(theme),
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
