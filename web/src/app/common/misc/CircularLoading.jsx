import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import {helperStyles} from "app/common/style/styleConsts";
import {PropTypes} from "app/utils/functionUtil";
import React from "react";


const style = theme => ({
    container: {
        ...helperStyles(theme).alignCenter,
        width: "70px",
    },
    circular: {
        margin: theme.spacing.unit * 2,
    },
});

// todo используется цвет темы Matireal UI, вынести настройки темы
function CircularLoading(props) {
    const {classes, show, children, ...rest} = props;
    return (
        show ? (
                <div className={classes.container}>
                    <CircularProgress className={classes.circular} thickness={5} {...rest}/>
                </div>)
            : (children ? children : null)
    );
}

CircularLoading.propTypes = {
    show: PropTypes.bool
};

export default withStyles(style)(CircularLoading);
