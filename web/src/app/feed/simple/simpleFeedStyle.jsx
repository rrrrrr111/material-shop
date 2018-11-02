import {appStyles} from "app/common/style/styles";
import {cardTitle, main, mainRaised, mlAuto} from "lib/assets/jss/material-kit-pro-react";


const simpleFeedStyle = theme => ({
    ...appStyles(theme),
    mlAuto,
    simpleFeedContainer: {
        ...main,
        ...mainRaised,
        overflow: "hidden",
        paddingLeft: 30,
        paddingRight: 30,
        minHeight: 600,

    },

    stats: {
        color: "#999"
    },
    productCard: {
        margin: 0,
    },
    productHeader: {
        marginTop: 0,
    },
    productTitle: {
        ...cardTitle,
        textAlign: "center",
        marginBottom: "0 !important",
        fontSize: 15
    },
    priceContainer: {
        display: "inline-flex"
    },
    productBody: {
        padding: 5,
    }
});

export default simpleFeedStyle;
