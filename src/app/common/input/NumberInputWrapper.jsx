import PropTypes from "prop-types";
import React from "react";
import NumberFormat from 'react-number-format';


function NumberInputWrapper(props) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
        />
    );
}

NumberInputWrapper.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default (NumberInputWrapper);