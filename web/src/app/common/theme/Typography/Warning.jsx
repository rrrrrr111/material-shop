import withStyles from "@material-ui/core/styles/withStyles";

import typographyStyle from "app/common/theme/Typography/typographyStyle.jsx";

import PropTypes from "prop-types";
import React from "react";

function Warning({ ...props }) {
  const { classes, children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.warningText}>
      {children}
    </div>
  );
}

Warning.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(typographyStyle)(Warning);
