import tooltipsStyle from "app/common/style/tooltipsStyle";
import {cardTitle, main, mainRaised} from "lib/assets/jss/material-kit-pro-react";

const feedStyle = {
    ...tooltipsStyle,
    main: {
        ...main
        /*overflow: "hidden"*/
    },
    mainRaised,


    cardTitle: {
        ...cardTitle,
        textAlign: "center",
        marginBottom: "0px !important"
    },

    justifyContentBetween: {
        WebkitBoxPack: "justify!important",
        justifyContent: "space-between !important"
    },

    priceContainer: {
        display: "inline-flex"
    },


};

export default feedStyle;
