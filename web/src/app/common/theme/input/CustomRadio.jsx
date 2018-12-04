import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import {checkRadioSwitchColor} from "app/common/style/styleConsts";
import {classNames, withStyles} from "app/utils/functionUtil";
import PropTypes from "prop-types";
import React from "react";

const style = theme => ({
    box: {
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
    radioRoot: {
        padding: "16px"
    },
    radio: {
        color: checkRadioSwitchColor + "!important"
    },
    radioChecked: {
        width: "16px",
        height: "16px",
        border: "1px solid " + checkRadioSwitchColor,
        borderRadius: "50%"
    },
    radioUnchecked: {
        width: "0px",
        height: "0px",
        padding: "7px",
        border: "1px solid rgba(0, 0, 0, .54)",
        borderRadius: "50%"
    },
    disabled: {
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
    },
});

function CustomRadio(props) {
    const {
        classes,
        label,
        checked,
        value,
        error,
        disabled,
        onChange,
    } = props;

    return (
        <div className={classes.box}>
            <FormControlLabel
                classes={{label: classes.label}}
                disabled={disabled}
                label={label}
                control={
                    <Radio
                        checked={checked}
                        onChange={onChange}
                        value={value}
                        name="radio-button"
                        aria-label="radio-button"
                        disabled={disabled}
                        icon={<FiberManualRecord className={classNames({
                            [classes.radioUnchecked]: true,
                            [classes.disabled]: disabled,
                            "redShadow": error
                        })}/>}
                        checkedIcon={<FiberManualRecord className={classNames({
                            [classes.radioChecked]: true,
                            [classes.disabled]: disabled,
                            "redShadow": error
                        })}/>}
                        classes={{
                            checked: classes.radio,
                            root: classes.radioRoot
                        }}
                    />}
            />
        </div>
    );
}

CustomRadio.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    checked: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

export default withStyles(style)(CustomRadio);
