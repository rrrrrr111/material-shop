import React from "react";

import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import typographyStyle from "lib/assets/jss/material-kit-pro-react/components/typographyStyle.jsx";

function Primary({ ...props }) {
  const { classes, children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.primaryText}>
      {children}
    </div>
  );
}

Primary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(typographyStyle)(Primary);
