// ##############################
// // // NavPills component style
// #############################

import {appStyles} from "app/common/style/styles";

const wizardStyle = theme => ({
    ...appStyles(theme),

    contentWrapper: {
        marginTop: "20px",
        "& .react-swipeable-view-container > div > div": {
            padding: "0 15px 15px 15px",
        }
    },
});

export default wizardStyle;
