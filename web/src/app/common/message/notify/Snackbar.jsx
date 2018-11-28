import IconButton from "@material-ui/core/IconButton";
import Snack from "@material-ui/core/Snackbar";

import withStyles from "@material-ui/core/styles/withStyles";

import Close from "@material-ui/icons/Close";

import snackbarStyle from "app/common/message/notify/snackbarStyle.jsx";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import {ALL_COLOR_KEYS} from "../../style/styleConsts";

function Snackbar(props) {
    const {classes, message, color, close, icon, place, open} = props;
    let action = [];
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
                onClick={() => props.onClose()}
            >
                <Close className={classes.close}/>
            </IconButton>
        ];
    }
    return (
        <Snack
            anchorOrigin={{
                vertical: place.indexOf("t") === -1 ? "bottom" : "top",
                horizontal:
                    place.indexOf("l") !== -1
                        ? "left"
                        : place.indexOf("c") !== -1 ? "center" : "right"
            }}
            open={open}
            message={
                <div>
                    {icon !== undefined ? icon : null}
                    <span className={messageClasses}>{message}</span>
                </div>
            }
            action={action}
            ContentProps={{
                classes: {
                    root: classes.root + " " + classes[color],
                    message: classes.message
                }
            }}
        />
    );
}

Snackbar.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.node.isRequired,
    color: PropTypes.oneOf(ALL_COLOR_KEYS),
    close: PropTypes.bool,
    icon: PropTypes.node,
    onClose: PropTypes.func,
    place: PropTypes.oneOf(["tl", "tr", "tc", "br", "bl", "bc"]),
    open: PropTypes.bool
};

export default withStyles(snackbarStyle)(Snackbar);
