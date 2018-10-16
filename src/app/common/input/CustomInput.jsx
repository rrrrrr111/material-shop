import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import customInputStyle from "app/common/input/customInputStyle.jsx";
import MaskedInputWrapper from "app/common/input/MaskedInputWrapper";
import NumberInputWrapper from "app/common/input/NumberInputWrapper";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import {MaskedInput} from "react-text-mask";


function CustomInput({...props}) {
    const {
        classes,
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        numberProps,
        maskProps,
        error,
        white,
        inputRootCustomClasses,
        success,
        inputClasses,
    } = props;

    const labelClasses = classNames({
        [" " + classes.labelRootError]: error,
        [" " + classes.labelRootSuccess]: success && !error
    });
    const underlineClasses = classNames({
        [classes.underlineError]: error,
        [classes.underlineSuccess]: success && !error,
        [classes.underline]: true,
        [classes.whiteUnderline]: white
    });
    const marginTop = classNames({
        [inputRootCustomClasses]: inputRootCustomClasses !== undefined
    });
    const inputClassNames = classNames({
        [inputClasses]: inputClasses,
        [classes.input]: true,
        [classes.whiteInput]: white
    });
    const formControlClasses = formControlProps !== undefined
        ? classNames(formControlProps.className, classes.formControl)
        : classes.formControl;
    const input = (
        <Input
            classes={{
                input: inputClassNames,
                root: marginTop,
                disabled: classes.disabled,
                underline: underlineClasses
            }}
            id={id}
            {...inputProps}
            inputComponent={
                maskProps === undefined
                    ? (numberProps === undefined
                        ? null
                        : NumberInputWrapper
                    )
                    : MaskedInputWrapper
            }
            inputProps={
                maskProps === undefined
                    ? (numberProps === undefined
                        ? null
                        : numberProps
                    )
                    : maskProps
            }
        />
    );

    return (
        <FormControl {...formControlProps} className={formControlClasses}>
            {labelText !== undefined ? (
                <InputLabel
                    className={classes.labelRoot + " " + labelClasses}
                    htmlFor={id}
                    {...labelProps}
                >
                    {labelText}
                </InputLabel>
            ) : null}
            {input}
            {error ? (
                <Clear className={classes.feedback + " " + classes.labelRootError}/>
            ) : success ? (
                <Check className={classes.feedback + " " + classes.labelRootSuccess}/>
            ) : null}
        </FormControl>
    );
}

CustomInput.propTypes = {
    classes: PropTypes.object.isRequired,
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    maskProps: PropTypes.object,
    numberProps: PropTypes.object,
    formControlProps: PropTypes.object,
    inputRootCustomClasses: PropTypes.string,
    inputClasses: PropTypes.string,
    error: PropTypes.bool,
    success: PropTypes.bool,
    white: PropTypes.bool
};

export default withStyles(customInputStyle)(CustomInput);
