import Grow from "@material-ui/core/Grow/Grow";
import PropTypes from "prop-types";
import React from "react";

const ErrorMessage = (props) => {
    const {show, children} = props;
    if (typeof show === 'boolean' && show === false) {
        return null;
    }

    let message;
    if (show && typeof show === 'string') {
        message = show;
    } else if (children) {
        message = children;
    }

    if (!message) {
        return null;
    }

    return (
        <Grow in={true}>
            <div className="errMessBox">
                <span className="errMess">{message}</span>
            </div>
        </Grow>
    );
};

ErrorMessage.propTypes = {
    show: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default ErrorMessage;
