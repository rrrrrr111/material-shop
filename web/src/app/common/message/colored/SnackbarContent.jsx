import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Snack from "@material-ui/core/SnackbarContent";
import withStyles from "@material-ui/core/styles/withStyles";
import Close from "@material-ui/icons/Close";
import {
    container,
    dangerBoxShadow,
    defaultFont,
    infoBoxShadow,
    primaryBoxShadow,
    successBoxShadow,
    warningBoxShadow
} from "app/common/style/themeStyles";
import PropTypes from "prop-types";
import React from "react";

const style = theme => ({
    root: {
        ...defaultFont,
        position: "relative",
        padding: "20px 15px",
        lineHeight: "20px",
        marginBottom: "20px",
        fontSize: "14px",
        backgroundColor: "white",
        color: "#555555",
        borderRadius: "0px",
        maxWidth: "100%",
        minWidth: "auto",
        boxShadow:
            "0 12px 20px -10px rgba(255, 255, 255, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 255, 255, 0.2)"
    },
    info: {
        backgroundColor: "#00d3ee",
        color: "#ffffff",
        ...infoBoxShadow
    },
    success: {
        backgroundColor: "#5cb860",
        color: "#ffffff",
        ...successBoxShadow
    },
    warning: {
        backgroundColor: "#ffa21a",
        color: "#ffffff",
        ...warningBoxShadow
    },
    danger: {
        backgroundColor: "#f55a4e",
        color: "#ffffff",
        ...dangerBoxShadow
    },
    primary: {
        backgroundColor: "#af2cc5",
        color: "#ffffff",
        ...primaryBoxShadow
    },
    message: {
        padding: "0",
        display: "block",
        maxWidth: "89%"
    },
    close: {
        width: "20px",
        height: "20px"
    },
    iconButton: {
        width: "24px",
        height: "24px",
        float: "right",
        fontSize: "1.5rem",
        fontWeight: "500",
        lineHeight: "1",
        position: "absolute",
        right: "-4px",
        top: "0",
        padding: "0"
    },
    icon: {
        display: "block",
        float: "left",
        marginRight: "1.071rem"
    },
    container: {
        ...container,
        position: "relative"
    }
});

class SnackbarContent extends React.Component {
    constructor(props) {
        super(props);
        this.closeAlert = this.closeAlert.bind(this);
        const {
            classes,
            message,
            color,
            close,
            icon
        } = props;
        let action = [];
        if (close) {
            action = [
                <IconButton
                    className={classes.iconButton}
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.closeAlert}
                >
                    <Close className={classes.close}/>
                </IconButton>
            ];
        }
        let snackIcon = null;
        switch (typeof icon) {
            case "function":
                snackIcon = <props.icon className={classes.icon}/>;
                break;
            case "string":
                snackIcon = <Icon className={classes.icon}>{props.icon}</Icon>;
                break;
            default:
                snackIcon = null;
                break;
        }
        this.state = {
            alert: (
                <Snack
                    message={
                        <div>
                            {snackIcon}
                            {message}
                            {close ? action : null}
                        </div>
                    }
                    classes={{
                        root: classes.root + " " + classes[color],
                        message: classes.message + " " + classes.container
                    }}
                />
            )
        };
    }

    closeAlert() {
        this.setState({alert: null});
    }

    render() {
        return this.state.alert;
    }
}

SnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.node.isRequired,
    color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
    close: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

export default withStyles(style)(SnackbarContent);
