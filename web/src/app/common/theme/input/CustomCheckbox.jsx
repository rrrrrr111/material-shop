import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Check from "@material-ui/icons/Check";
import {withStyles} from "app/utils/functionUtil";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const style = theme => ({
    horizontalBox: {
        position: "relative",
        display: "block",
        "&:first-child": {
            marginTop: "10px"
        },
        "&:not(:first-child)": {
            marginTop: "-14px"
        },
        marginTop: "0",
        marginBottom: "0"
    },
    checkedIcon: {
        width: "20px",
        height: "20px",
        border: "1px solid rgba(0, 0, 0, 0.84)",
        borderRadius: "3px"
    },
    uncheckedIcon: {
        width: "0px",
        height: "0px",
        padding: "9px",
        border: "1px solid rgba(0, 0, 0, .54)",
        borderRadius: "3px"
    },
    disabledIcon: {
        borderColor: "#000000",
        opacity: "0.26",
        color: "#000000"
    },
    label: {
        cursor: "pointer",
        paddingLeft: "0",
        color: "#AAAAAA",
        fontSize: "14px",
        lineHeight: "1.428571429",
        fontWeight: "400",
        display: "inline-flex",
        transition: "0.3s ease all"
    }
});

function CustomCheckbox(props) {
    const {
        classes,
        label,
        boxClass,
        checked,
        error,
        disabled,
        onClick,
    } = props;

    return (
        <div className={classes.horizontalBox}>
            <FormControlLabel
                className={boxClass}
                classes={{label: classes.label}}
                control={
                    <Checkbox tabIndex={-1}
                              checked={checked}
                              onClick={onClick}
                              checkedIcon={<Check
                                  className={
                                      classNames({
                                          [classes.checkedIcon]: true,
                                          [classes.disabledIcon]: disabled,
                                          "redShadow": error
                                      })}/>}
                              icon={<Check
                                  className={
                                      classNames({
                                          [classes.uncheckedIcon]: true,
                                          [classes.disabledIcon]: disabled,
                                          "redShadow": error
                                      })}/>}
                              disabled={disabled}/>
                }
                label={label}
            />
        </div>
    );
}

CustomCheckbox.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    boxClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    checked: PropTypes.bool,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

export default withStyles(style)(CustomCheckbox);
