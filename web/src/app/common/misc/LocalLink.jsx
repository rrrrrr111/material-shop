import util from "app/utils/util";
import PropTypes from "prop-types";
import React from "react";
import {Link, NavLink} from "react-router-dom";

class LocalLink extends React.PureComponent {

    determineState(modal) {
        return {
            local: true,
            modal: modal,
            prevYScroll: util.navigate.getCurrentYScroll()
        };
    }

    render() {
        const {
            to, nav, modal, children,
            ...others
        } = this.props;
        const params = {
            pathname: to,
            state: this.determineState(modal)
        };
        return (
            nav
                ? <NavLink to={params} {...others}>{children}</NavLink>
                : <Link to={params} {...others}>{children}</Link>
        );
    }

    static propTypes = {
        nav: PropTypes.bool,
        modal: PropTypes.bool,
        ...NavLink.propTypes,
        ...Link.propTypes,
    };
}

export default LocalLink;
