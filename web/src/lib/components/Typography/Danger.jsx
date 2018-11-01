import React from "react";

import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import typographyStyle from "lib/assets/jss/material-kit-pro-react/components/typographyStyle.jsx";

function Danger({ ...props }) {
  const { classes, children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.dangerText}>
      {children}
    </div>
  );
}

Danger.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(typographyStyle)(Danger);
