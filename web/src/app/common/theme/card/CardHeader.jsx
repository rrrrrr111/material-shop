import withStyles from "@material-ui/core/styles/withStyles";
import {ALL_COLOR_KEYS} from "app/common/style/styleConsts";
import cardHeaderStyle from "app/common/theme/card/cardHeaderStyle.jsx";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

function CardHeader(props) {
    const {
        classes,
        className,
        children,
        color,
        plain,
        image,
        contact,
        signup,
        noShadow,
        ...rest
    } = props;
    const cardHeaderClasses = classNames({
        [classes.cardHeader]: true,
        [classes[color + "CardHeader"]]: color,
        [classes.cardHeaderPlain]: plain,
        [classes.cardHeaderImage]: image,
        [classes.cardHeaderContact]: contact,
        [classes.cardHeaderSignup]: signup,
        [classes.noShadow]: noShadow,
        [className]: className
    });
    return (
        <div className={cardHeaderClasses} {...rest}>
            {children}
        </div>
    );
}

CardHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    color: PropTypes.oneOf(ALL_COLOR_KEYS),
    plain: PropTypes.bool,
    image: PropTypes.bool,
    contact: PropTypes.bool,
    signup: PropTypes.bool,
    noShadow: PropTypes.bool
};

export default withStyles(cardHeaderStyle)(CardHeader);
