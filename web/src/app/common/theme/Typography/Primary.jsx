import React from "react";

import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import typographyStyle from "app/common/theme/Typography/typographyStyle.jsx";

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
