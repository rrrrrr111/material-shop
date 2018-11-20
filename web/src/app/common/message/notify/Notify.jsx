import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";
import {CLOSE_NOTIFY} from "app/common/message/notify/reducer";
import snackbarStyle from "app/common/message/notify/snackbarStyle";
import {action} from "app/utils/functionUtil";
import React from "react";
import {connect} from "react-redux";
import {notificationColor, notificationPlace} from "../../style/styles";
import Snackbar from "./Snackbar";


class Notify extends React.PureComponent {
    constructor(props) {
        super(props);
        this.closeNotify = this.closeNotify.bind(this);
    }

    static timeout = 300000;

    clearCloseTimer = () => {
        if (this.closeTimerRef) {
            clearTimeout(this.closeTimerRef);
        }
    };

    restartCloseTimer() {

        this.clearCloseTimer();
        this.closeTimerRef = setTimeout(
            () => {
                this.props.dispatch((dispatch) => {
                    dispatch(action(CLOSE_NOTIFY));
                })
            }, Notify.timeout
        );
    };

    closeNotify() {
        this.clearCloseTimer();
        this.props.dispatch((dispatch) => {
            dispatch(action(CLOSE_NOTIFY));
        })
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

const mapStateToProps = (state) => {
    return state.notify;
};

export default connect(mapStateToProps)(withStyles(snackbarStyle)(Notify));
