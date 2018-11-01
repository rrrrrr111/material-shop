import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "app/common/grid/GridContainer";
import {RELOAD_MAIN_FEED, START_RELOAD_MAIN_FEED, STOP_RELOAD_MAIN_FEED} from "app/feed/reducer";
import simpleFeedStyle from "app/feed/simple/simpleFeedStyle.jsx";
import SimpleProductCard from "app/feed/simple/SimpleProductCard";
import {action, toProps} from "app/utils/functionUtil";
import util from "app/utils/util";
import classNames from 'classnames';
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
            })
            .finally(function () {
                dispatch(action(STOP_RELOAD_MAIN_FEED));
            })
    };

    render() {
        const {classes, data} = this.props;
        return (
            <div className={classNames(classes.main, classes.mainRaised)}>
                <GridContainer spacing={16}>
                    {data.products.map((product, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={3} lg={2} key={index}>
                                <SimpleProductCard product={product}/>
                            </Grid>
                        );
                    })}
                </GridContainer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.feed;
};

export default connect(mapStateToProps)(withStyles(simpleFeedStyle)(SimpleFeed));
