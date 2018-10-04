import {appStyles} from "app/common/styles";
import {container, formControl, labelRoot, main, mainRaised} from "lib/assets/jss/material-kit-pro-react.jsx";
import customInputStyle from "lib/assets/jss/material-kit-pro-react/components/customInputStyle";

const commonTabStyle = {
    maxWidth: 600,
    ...appStyles.width100,
    ...appStyles.alignCenter,
};

const userProfileStyle = {
    ...labelRoot,
    ...formControl,
    ...customInputStyle,
    ...container,
    ...appStyles,
    main: {
        ...main
    },
    mainRaised: {
        ...mainRaised
    },
    profileTabs: {
        marginTop: "4.284rem",
        marginBottom: "50px",
    },
    profileTabPill: {
        width: 115,
        height: 120,
    },
    footerContainer: {
        ...appStyles.width100,
    },
    footerButton: {
        ...appStyles.right,
        margin: "30px 20px 20px 20px",
    },
    profileTab: {
        ...commonTabStyle,
    },
    ordersTab: {
        ...commonTabStyle,
        maxWidth: 800,
    },
    settingsTab: {
        ...commonTabStyle,
    },
    passwordTab: {
        ...commonTabStyle,
    },
};

export default userProfileStyle;
