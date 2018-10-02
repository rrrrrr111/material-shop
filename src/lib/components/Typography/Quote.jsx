import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import typographyStyle from "lib/assets/jss/material-kit-pro-react/components/typographyStyle.jsx";

function Quote({ ...props }) {
  const { classes, text, author, authorClassName, textClassName } = props;
  const quoteClasses = classNames(classes.defaultFontStyle, classes.quote);
  const quoteTextClasses = classNames({
    [classes.quoteText]: true,
    [textClassName]: textClassName !== undefined
  });
  const quoteAuthorClasses = classNames({
    [classes.quoteAuthor]: true,
    [authorClassName]: authorClassName !== undefined
  });
  return (
    <blockquote className={quoteClasses}>
      <p className={quoteTextClasses}>{text}</p>
      <small className={quoteAuthorClasses}>{author}</small>
    </blockquote>
  );
}

Quote.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.node,
  author: PropTypes.node,
  textClassName: PropTypes.string,
  authorClassName: PropTypes.string
};

export default withStyles(typographyStyle)(Quote);
