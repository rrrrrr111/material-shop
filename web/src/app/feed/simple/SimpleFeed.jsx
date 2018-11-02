import Grid from "@material-ui/core/Grid/Grid";
import Grow from '@material-ui/core/Grow';
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "app/common/grid/GridContainer";
import GridItemMessage from "app/common/message/GridItemMessage";
import CircularLoading from "app/common/misc/CircularLoading";
import {RELOAD_MAIN_FEED, START_RELOAD_MAIN_FEED, STOP_RELOAD_MAIN_FEED} from "app/feed/reducer";
import simpleFeedStyle from "app/feed/simple/simpleFeedStyle.jsx";
import SimpleProductCard from "app/feed/simple/SimpleProductCard";
import {action} from "app/utils/functionUtil";
import util from "app/utils/util";
import classNames from "classnames";
import React from "react";
import {connect} from "react-redux";

class SimpleFeed extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        util.navigate.scrollUp(150);
        this.props.dispatch(this.reloadMainFeed);
    }

    reloadMainFeed = (dispatch) => {
        dispatch(action(START_RELOAD_MAIN_FEED));
        fetch(util.link.beApi("feed"))
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                dispatch(action(RELOAD_MAIN_FEED, json.products));
                dispatch(action(STOP_RELOAD_MAIN_FEED, false));
            })
            .catch(function () {
                dispatch(action(RELOAD_MAIN_FEED, []));
                dispatch(action(STOP_RELOAD_MAIN_FEED, true));
            });
    };

    awaitMessage = (classes, isError) => (
        <Grow in={true}>
            <Grid item>
                <CircularLoading/>
                <h3 className={classNames(classes.title, classes.textCenter)}>
                    {isError
                        ? "Ошибка при обращении к серверу, попробуйте позже"
                        : "Загрузка каталога товаров"
                    }
                </h3>
            </Grid>
        </Grow>
    );

    render() {
        const {classes, data, ui} = this.props;
        return (
            <GridContainer spacing={16} className={classes.simpleFeedContainer} justify="center">
                {(ui.loading || ui.error)
                    ? (<GridItemMessage loading={ui.loading} text={
                        ui.error
                            ? "Ошибка при обращении к серверу, попробуйте позже"
                            : "Загрузка каталога товаров"
                    }/>)
                    : data.products.map((product, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={3} lg={2} key={index}>
                                <SimpleProductCard product={product}/>
                            </Grid>
                        );
                    })
                }
            </GridContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return state.feed;
};

export default connect(mapStateToProps)(withStyles(simpleFeedStyle)(SimpleFeed));
