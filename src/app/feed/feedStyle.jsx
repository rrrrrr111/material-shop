import {appStyles} from "app/common/style/styles";
import {cardTitle, main, mainRaised, mlAuto} from "lib/assets/jss/material-kit-pro-react";


const feedStyle = theme => ({
    ...appStyles(theme),
    mlAuto,
    main: {
        ...main,
        /*overflow: "hidden"*/
        paddingLeft: 30,
        paddingRight: 30,
    },
    mainRaised,

    stats: {
        color: "#999"
    },

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
