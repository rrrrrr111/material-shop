import util from "app/utils/util";
import PropTypes from "prop-types";
import React from "react";
import {Link, NavLink} from "react-router-dom";

function LocalLink(props) {
    const {to, navLink, children, ...others} = props;
    const params = {
        pathname: to,
        state: {
            local: true, // спец флаг о локальном переходе, чтобы можно было вернуться на туже страницу по HTML5 history
            yScroll: util.navigate.getCurrentYScroll() // запоминаем позицию по Y чтобы вернуться
        }
    };

    return (
        navLink
            ? <NavLink to={params} {...others}> {children} </NavLink>
            : <Link to={params} {...others}> {children} </Link>

    );
}

LocalLink.propTypes = {
    navLink: PropTypes.bool,
    ...NavLink.propTypes,
    ...Link.propTypes
};

export default LocalLink;
