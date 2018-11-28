import React from "react";

import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import typographyStyle from "app/common/theme/Typography/typographyStyle.jsx";

function Success({ ...props }) {
  const { classes, children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.successText}>
      {children}
    </div>
  );
}

Success.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(typographyStyle)(Success);
