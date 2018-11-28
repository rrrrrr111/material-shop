import React from "react";

import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import typographyStyle from "app/common/theme/Typography/typographyStyle.jsx";

function Rose({ ...props }) {
  const { classes, children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.roseText}>
      {children}
    </div>
  );
}

Rose.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(typographyStyle)(Rose);