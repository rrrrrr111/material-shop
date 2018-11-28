// ##############################
// // // NavPills component style
// #############################

import {helperStyles} from "app/common/style/styleConsts";

const wizardStyle = theme => ({
    ...helperStyles(theme),

    contentWrapper: {
        marginTop: "20px",
        "& .react-swipeable-view-container > div > div": {
            padding: "0 15px 15px 15px",
        }
    },
});

export default wizardStyle;
