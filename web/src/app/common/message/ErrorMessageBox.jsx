import Grow from "@material-ui/core/Grow/Grow";
import PropTypes from "prop-types";
import React from "react";

function ErrorMessageBox(props) {
    const {text} = props;
    return (text
        ? <Grow in={true}>
            <div className="errMessBox">
                <span className="errMess">{text}</span>
            </div>
        </Grow>
        : null);
}

ErrorMessageBox.propTypes = {
    text: PropTypes.string,
};

export default ErrorMessageBox;
