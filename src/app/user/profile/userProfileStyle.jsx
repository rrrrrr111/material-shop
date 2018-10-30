import customCheckboxRadioSwitch from "app/common/input/customCheckboxRadioSwitchStyle";
import inputStyle from "app/common/input/inputStyle";
import {appStyles} from "app/common/style/styles";
import {container, formControl, labelRoot, main, mainRaised} from "lib/assets/jss/material-kit-pro-react.jsx";

const commonTabStyle = theme => ({
    maxWidth: 600,
    ...appStyles(theme).centeredContainer,
});

const userProfileStyle = theme => ({
    ...appStyles(theme),
    ...customCheckboxRadioSwitch,
    ...inputStyle,

    labelRoot,
    formControl,
    main,
    mainRaised,
    container,

    profileTabs: {
        margin: "40px 0 50px 0",
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
