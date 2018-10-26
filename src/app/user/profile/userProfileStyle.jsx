import customCheckboxRadioSwitch from "app/common/input/customCheckboxRadioSwitchStyle";
import inputStyle from "app/common/input/inputStyle";
import {appStyles} from "app/common/style/styles";
import {container, formControl, labelRoot, main, mainRaised} from "lib/assets/jss/material-kit-pro-react.jsx";

const commonTabStyle = theme => ({
    maxWidth: 600,
    ...appStyles(theme).centeredContainer,
});

const userProfileStyle = theme => ({
    ...customCheckboxRadioSwitch,
    ...labelRoot,
    ...formControl,
    ...inputStyle,
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
