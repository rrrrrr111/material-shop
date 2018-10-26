import {appStyles} from "app/common/style/styles";
import tooltipStyle from "app/common/style/tooltipStyle";
import {cardTitle, main, mainRaised} from "lib/assets/jss/material-kit-pro-react";


const feedStyle = theme => ({
    ...tooltipStyle(theme),
    ...appStyles(theme),
    main: {
        ...main,
        /*overflow: "hidden"*/
        paddingLeft: 30,
        paddingRight: 30,
    },
    mainRaised,

    cardTitle: {
        ...cardTitle,
        textAlign: "center",
        marginBottom: "0px !important"
    },

    priceContainer: {
        display: "inline-flex"
    },
});

export default feedStyle;
