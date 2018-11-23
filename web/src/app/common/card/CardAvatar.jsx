import {classNames, PropTypes} from "app/utils/functionUtil";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";



import cardAvatarStyle from "app/common/card/cardAvatarStyle.jsx";

function CardAvatar({ ...props }) {
  const {
    classes,
    children,
    className,
    plain,
    profile,
    testimonial,
    testimonialFooter,
    ...rest
  } = props;
  const cardAvatarClasses = classNames({
    [classes.cardAvatar]: true,
    [classes.cardAvatarProfile]: profile,
    [classes.cardAvatarPlain]: plain,
    [classes.cardAvatarTestimonial]: testimonial,
    [classes.cardAvatarTestimonialFooter]: testimonialFooter,
    [className]: className !== undefined
  });
  return (
    <div className={cardAvatarClasses} {...rest}>
      {children}
    </div>
  );
}

CardAvatar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  profile: PropTypes.bool,
  plain: PropTypes.bool,
  testimonial: PropTypes.bool,
  testimonialFooter: PropTypes.bool
};

export default withStyles(cardAvatarStyle)(CardAvatar);
