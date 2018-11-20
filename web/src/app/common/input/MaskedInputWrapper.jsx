import PropTypes from "prop-types";
import React from "react";
import MaskedInput from 'react-text-mask';



function MaskedInputWrapper(props) {
    return (
        <MaskedInput
            ref={props.inputRef}
            props
        />
    );
}

MaskedInputWrapper.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

export default (MaskedInputWrapper);
