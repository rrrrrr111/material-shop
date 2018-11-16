import IconButton from "@material-ui/core/IconButton";
import Snack from "@material-ui/core/SnackbarContent";
import withStyles from "@material-ui/core/styles/withStyles";
import Close from "@material-ui/icons/Close";
import snackbarStyle from "app/common/message/notify/snackbarStyle.jsx";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

function SnackbarContent({...props}) {
    const {classes, message, color, close, icon} = props;
    var action = [];
    const messageClasses = classNames({
        [classes.iconMessage]: icon !== undefined
    });
    if (close !== undefined) {
        action = [
            <IconButton
                className={classes.iconButton}
                key="close"
                aria-label="Close"
                color="inherit"
            >
                <Close className={classes.close}/>
            </IconButton>
        ];
    }
    return (
        <Snack
            message={
                <div>
                    {icon !== undefined ? <props.icon className={classes.icon}/> : null}
                    <span className={messageClasses}>{message}</span>
                </div>
            }
            classes={{
                root: classes.root + " " + classes[color],
                message: classes.message
            }}
            action={action}
        />
    );
}

SnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.node.isRequired,
    color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
    close: PropTypes.bool,
    icon: PropTypes.func
};

export default withStyles(snackbarStyle)(SnackbarContent);
