import Grow from "@material-ui/core/Grow/Grow";
import PropTypes from "prop-types";
import React from "react";

const ErrorMessageBox = (props) => {
    const {text} = props;
    if (text) {
        return (
            <Grow in={true}>
                <div className="errMessBox">
                    <span className="errMess">{text}</span>
                </div>
            </Grow>
        );
    }
    return null;
};

ErrorMessageBox.propTypes = {
    text: PropTypes.string,
};

export default ErrorMessageBox;
