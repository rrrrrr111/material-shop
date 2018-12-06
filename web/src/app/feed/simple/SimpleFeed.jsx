import Grid from "@material-ui/core/Grid/Grid";
import Grow from "@material-ui/core/Grow/Grow";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "app/common/grid/GridContainer";
import GridItemMessage from "app/common/message/GridItemMessage";
import {MAIN_FEED_DATA, mapFeedToProps, START_RELOAD_MAIN_FEED} from "app/feed/reducer";
import simpleFeedStyle from "app/feed/simple/simpleFeedStyle.jsx";
import SimpleProductCard from "app/feed/simple/SimpleProductCard";
import {connect} from "app/utils/functionUtil";
import util from "app/utils/util";
import React from "react";
import {dispatch} from "store";

class SimpleFeed extends React.PureComponent {

    componentDidMount() {
        util.navigate.scrollUp();
        this.reloadMainFeed();
    }

    reloadMainFeed = () => {
        dispatch(START_RELOAD_MAIN_FEED)
            .then((dispatch) => {
                return util.ajax.backendPost("product/list", {});
            })
            .then((response) => {
                return dispatch(MAIN_FEED_DATA, response);
            })
    };

    getMessage = (ui, products) => {
        if (ui.loading) {
            return "Загрузка каталога товаров";
        } else if (ui.message) {
            return ui.message;
        } else if (ui.loaded && products.length === 0) {
            return "Товар не найден";
        }
        return null;
    };

    render() {
        const {classes, data, ui} = this.props;
        const message = this.getMessage(ui, data.products);
        return (
            <GridContainer spacing={16} className={classes.simpleFeedContainer} justify="center">
                {(message)
                    ? <GridItemMessage loading={ui.loading} text={message}/>
                    : data.products.map((product, index) => {
                        return (
                            <Grow timeout={100 * index} in={true} key={index}>
                                <Grid item xs={12} sm={6} md={3} lg={2}>
                                    <SimpleProductCard product={product}/>
                                </Grid>
                            </Grow>
                        );
                    })
                }
            </GridContainer>
        );
    }
}

export default connect(mapFeedToProps)(withStyles(simpleFeedStyle)(SimpleFeed));
