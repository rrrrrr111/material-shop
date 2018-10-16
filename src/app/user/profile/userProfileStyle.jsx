import customInputStyle from "app/common/input/customInputStyle";
import {appStyles} from "app/common/styles";
import {container, formControl, labelRoot, main, mainRaised} from "lib/assets/jss/material-kit-pro-react.jsx";
import customCheckboxRadioSwitch from "lib/assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle";

const commonTabStyle = theme => ({
    maxWidth: 600,
    ...appStyles(theme).centeredContainer,
});

const userProfileStyle = theme => ({
    ...customCheckboxRadioSwitch,
    ...labelRoot,
    ...formControl,
    ...customInputStyle,
    ...container,
    ...appStyles(theme),
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
    profileTab: {
        ...commonTabStyle(theme),
    },
    ordersTab: {
        ...commonTabStyle(theme),
        maxWidth: 800,
    },
    settingsTab: {
        ...commonTabStyle(theme),
    },
    passwordTab: {
        ...commonTabStyle(theme),
    },
});

export default userProfileStyle;
