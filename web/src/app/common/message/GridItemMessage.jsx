import Grid from "@material-ui/core/Grid/Grid";
import Grow from "@material-ui/core/Grow/Grow";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularLoading from "app/common/misc/CircularLoading";
import {appStyles} from "app/common/style/styles";
import PropTypes from "prop-types";
import React from "react";


const style = theme => ({
    text: {
        ...appStyles(theme).title,
        ...appStyles(theme).textCenter,
    },
});

function GridItemMessage(props) {
    const {classes, loading, text} = props;
    return (
        <Grow in={true}>
            <Grid item>
                <CircularLoading show={loading}/>
                <h3 className={classes.text}>
                    {text}
                </h3>
            </Grid>
        </Grow>
    );
}

GridItemMessage.defaultProps = {
    loading: false
};

GridItemMessage.propTypes = {
    loading: PropTypes.bool,
    text: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(GridItemMessage);
