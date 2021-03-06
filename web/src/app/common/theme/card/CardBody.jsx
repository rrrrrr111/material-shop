import withStyles from "@material-ui/core/styles/withStyles";
import cardBodyStyle from "app/common/theme/card/cardBodyStyle.jsx";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

function CardBody(props) {
    const {
        classes,
        className,
        children,
        background,
        plain,
        formHorizontal,
        pricing,
        signup,
        color,
        ...rest
    } = props;
    const cardBodyClasses = classNames({
        [classes.cardBody]: true,
        [classes.cardBodyBackground]: background,
        [classes.cardBodyPlain]: plain,
        [classes.cardBodyFormHorizontal]: formHorizontal,
        [classes.cardPricing]: pricing,
        [classes.cardSignup]: signup,
        [classes.cardBodyColor]: color,
        [className]: className
    });
    return (
        <div className={cardBodyClasses} {...rest}>
            {children}
        </div>
    );
}

CardBody.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    background: PropTypes.bool,
    plain: PropTypes.bool,
    formHorizontal: PropTypes.bool,
    pricing: PropTypes.bool,
    signup: PropTypes.bool,
    color: PropTypes.bool
};

export default withStyles(cardBodyStyle)(CardBody);
