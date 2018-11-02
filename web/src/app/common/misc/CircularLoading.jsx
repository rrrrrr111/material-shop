import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import {appStyles} from "app/common/style/styles";
import React from "react";


const style = theme => ({
    container: {
        ...appStyles(theme).alignCenter,
        width: "70px",
    },
    circular: {
        margin: theme.spacing.unit * 2,
    },
});

// todo используется цвет темы Matireal UI, вынести настройки темы
function CircularLoading({...props}) {
    const {classes} = props;
    return (
        <div className={classes.container}>
            <CircularProgress className={classes.circular} thickness={5}/>
        </div>
    );
}

export default withStyles(style)(CircularLoading);
