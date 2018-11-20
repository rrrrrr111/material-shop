import withStyles from "@material-ui/core/styles/withStyles";


import cardFooterStyle from "app/common/card/cardFooterStyle.jsx";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

function CardFooter(props) {
    const {
        classes,
        className,
        children,
        plain,
        profile,
        pricing,
        testimonial,
        ...rest
    } = props;
    const cardFooterClasses = classNames({
        [classes.cardFooter]: true,
        [classes.cardFooterPlain]: plain,
        [classes.cardFooterProfile]: profile || testimonial,
        [classes.cardFooterPricing]: pricing,
        [classes.cardFooterTestimonial]: testimonial,
        [className]: className !== undefined
    });
    return (
        <div className={cardFooterClasses} {...rest}>
            {children}
        </div>
    );
}

CardFooter.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    pricing: PropTypes.bool,
    testimonial: PropTypes.bool
};

export default withStyles(cardFooterStyle)(CardFooter);
