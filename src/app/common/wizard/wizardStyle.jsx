// ##############################
// // // NavPills component style
// #############################

import {appStyles} from "app/common/styles";

const wizardStyle = theme => ({
    ...appStyles(theme),

    contentWrapper: {
        marginTop: "20px",
        "& .react-swipeable-view-container > div > div": {
            paddingLeft: "15px",
            paddingRight: "15px"
        }
    },
});

export default wizardStyle;
