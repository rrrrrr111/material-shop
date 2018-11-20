import Grid from "@material-ui/core/Grid";

import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";

const style = {
    grid: {
        position: "relative",
        width: "100%",
        minHeight: "1px",
        paddingRight: "15px",
        paddingLeft: "15px"
        /* flexBasis: "auto" */
    }
};

function GridItem(props) {
    const {classes, children, className, ...rest} = props;
    const c = className ? classes.grid + " " + className : classes.grid;

    return (
        <Grid item {...rest} className={c}>
            {children}
        </Grid>
    );
}

export default withStyles(style)(GridItem);
