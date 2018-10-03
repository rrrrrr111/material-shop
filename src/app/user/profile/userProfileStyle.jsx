import {container, main, mainRaised} from "lib/assets/jss/material-kit-pro-react.jsx";

const userProfileStyle = {
    container,
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
    }
};

export default userProfileStyle;
