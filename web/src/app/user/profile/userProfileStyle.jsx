import customCheckboxRadioSwitch from "app/common/input/customCheckboxRadioSwitchStyle";
import inputStyle from "app/common/input/inputStyle";
import {helperStyles} from "app/common/style/styleConsts";
import {container, formControl, labelRoot, main, mainRaised} from "app/common/style/themeStyles.jsx";

const commonTabStyle = theme => ({
    maxWidth: 600,
    ...helperStyles(theme).centeredContainer,
});

const userProfileStyle = theme => ({
    ...helperStyles(theme),
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
