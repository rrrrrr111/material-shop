import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import buttonStyle from "app/common/button/buttonStyle.jsx";
import {ALL_COLORS} from "app/common/style/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";


function RegularButton(props) {
    const {
        classes,
        color,
        round,
        children,
        fullWidth,
        disabled,
        simple,
        size,
        block,
        link,
        justIcon,
        fileButton,
        className,
        ...rest
    } = props;
    const btnClasses = classNames({
        [classes.button]: true,
        [classes[size]]: size,
        [classes[color]]: color,
        [classes.round]: round,
        [classes.fullWidth]: fullWidth,
        [classes.disabled]: disabled,
        [classes.simple]: simple,
        [classes.block]: block,
        [classes.link]: link,
        [classes.justIcon]: justIcon,
        [classes.fileButton]: fileButton,
        [className]: className
    });
    return (
        <Button {...rest} className={btnClasses}>
            {children}
        </Button>
    );
}

RegularButton.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(ALL_COLORS),
    size: PropTypes.oneOf(["sm", "lg"]),
    simple: PropTypes.bool,
    round: PropTypes.bool,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    block: PropTypes.bool,
    link: PropTypes.bool,
    justIcon: PropTypes.bool,
    fileButton: PropTypes.bool
};

export default withStyles(buttonStyle)(RegularButton);
