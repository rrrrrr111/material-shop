import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "app/common/grid/GridContainer";
import GridItemMessage from "app/common/message/GridItemMessage";
import {RELOAD_MAIN_FEED, START_RELOAD_MAIN_FEED, STOP_RELOAD_MAIN_FEED} from "app/feed/reducer";
import simpleFeedStyle from "app/feed/simple/simpleFeedStyle.jsx";
import SimpleProductCard from "app/feed/simple/SimpleProductCard";
import {action, fetchBe} from "app/utils/functionUtil";
import util from "app/utils/util";
import React from "react";
import {connect} from "react-redux";

class SimpleFeed extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        util.navigate.scrollUp();
        this.props.dispatch(this.reloadMainFeed);
    }

    reloadMainFeed = (dispatch) => {
        dispatch(action(START_RELOAD_MAIN_FEED));
        util.ajax.fetchBe("feed/list", {})
            .then(function (json) {
                dispatch(action(RELOAD_MAIN_FEED, json.products));
                dispatch(action(STOP_RELOAD_MAIN_FEED, false));
            })
            .catch(function () {
                dispatch(action(RELOAD_MAIN_FEED, []));
                dispatch(action(STOP_RELOAD_MAIN_FEED, true));
            });
    };

    awaitMessage = (isLoading, isError, productsIsEmpty) => {
        if (isLoading) {
            return "Загрузка каталога товаров";
        } else if (isError) {
            return "Ошибка при обращении к серверу, попробуйте позже";
        } else if (productsIsEmpty) {
            return "Товар не найден";
        }
        return null;
    };

    render() {
        const {classes, data, ui} = this.props;
        const message = this.awaitMessage(ui.loading, ui.error, data.products.length === 0);
        return (
            <GridContainer spacing={16} className={classes.simpleFeedContainer} justify="center">
                {(message)
                    ? <GridItemMessage loading={ui.loading} text={message}/>
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
