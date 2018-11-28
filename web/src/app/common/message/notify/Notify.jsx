import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";
import {CLOSE_NOTIFY, mapNotifyToProps} from "app/common/message/notify/reducer";
import snackbarStyle from "app/common/message/notify/snackbarStyle";
import {connect} from "app/utils/functionUtil";
import React from "react";
import {dispatch} from "store";
import {notificationColor, notificationPlace} from "../../style/styleConsts";
import Snackbar from "./Snackbar";


class Notify extends React.PureComponent {
    constructor(props) {
        super(props);
        this.closeNotify = this.closeNotify.bind(this);
    }

    static timeout = 3000;

    clearCloseTimer = () => {
        if (this.closeTimerRef) {
            clearTimeout(this.closeTimerRef);
        }
    };

    restartCloseTimer() {

        this.clearCloseTimer();
        this.closeTimerRef = setTimeout(() => {
                dispatch(CLOSE_NOTIFY);
            }, Notify.timeout
        );
    };

    closeNotify() {
        this.clearCloseTimer();
        dispatch(CLOSE_NOTIFY);
    };

    render() {
        const {classes, text, show} = this.props;
        if (show) {
            this.restartCloseTimer();
        }

        return (<Snackbar place={notificationPlace} color={notificationColor}
                          icon={<AppIcon className={classes.icon} name="far fa-bell"/>}
                          message={text} open={show}
                          onClose={this.closeNotify}
                          close
        />);
    };
}

export default connect(mapNotifyToProps)(withStyles(snackbarStyle)(Notify));
