import React from "react";

import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import typographyStyle from "app/common/theme/Typography/typographyStyle.jsx";

function Muted({ ...props }) {
  const { classes, children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.mutedText}>
      {children}
    </div>
  );
}

Muted.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(typographyStyle)(Muted);
