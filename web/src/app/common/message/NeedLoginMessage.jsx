import ErrorMessage from "app/common/message/ErrorMessage";
import LocalLink from "app/common/misc/LocalLink";
import PropTypes from "prop-types";
import React from "react";

const NeedLoginMessage = (props) => {
    const {show} = props;
    return (
        <ErrorMessage show={show}>
            Для работы на странице необходимо выполнить
            <LocalLink nav to="/auth/signin" modal> Вход </LocalLink>
            или
            <LocalLink nav to="/auth/signup" modal> Регистрацию </LocalLink>
        </ErrorMessage>
    );
};

NeedLoginMessage.propTypes = {
    show: PropTypes.bool.isRequired,
};

export default NeedLoginMessage;
