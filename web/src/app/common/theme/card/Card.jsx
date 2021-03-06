import withStyles from "@material-ui/core/styles/withStyles";
import {ALL_COLOR_KEYS} from "app/common/style/styleConsts";
import cardStyle from "app/common/theme/card/cardStyle.jsx";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";


function Card(props) {
    const {
        classes,
        className,
        children,
        plain,
        profile,
        blog,
        raised,
        background,
        pricing,
        color,
        product,
        testimonial,
        ...rest
    } = props;
    const cardClasses = classNames({
        [classes.card]: true,
        [classes.cardPlain]: plain,
        [classes.cardProfile]: profile || testimonial,
        [classes.cardBlog]: blog,
        [classes.cardRaised]: raised,
        [classes.cardBackground]: background,
        [classes.cardPricingColor]:
        (pricing && color !== undefined) || (pricing && background !== undefined),
        [classes[color]]: color,
        [classes.cardPricing]: pricing,
        [classes.cardProduct]: product,
        [className]: className !== undefined
    });
    return (
        <div className={cardClasses} {...rest}>
            {children}
        </div>
    );
}

Card.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    blog: PropTypes.bool,
    raised: PropTypes.bool,
    background: PropTypes.bool,
    pricing: PropTypes.bool,
    testimonial: PropTypes.bool,
    color: PropTypes.oneOf(ALL_COLOR_KEYS),
    product: PropTypes.bool
};

export default withStyles(cardStyle)(Card);
