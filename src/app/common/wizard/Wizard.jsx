import withStyles from "@material-ui/core/styles/withStyles";
import {PRIMARY_COLOR} from "app/common/styles";
import wizardStyle from "app/common/wizard/wizardStyle";
import util from "app/utils/util";
import GridContainer from "lib/components/Grid/GridContainer.jsx";
import GridItem from "lib/components/Grid/GridItem.jsx";
import PropTypes from "prop-types";
import React from "react";
import {Redirect, withRouter} from "react-router";
import SwipeableViews from "react-swipeable-views";

class Wizard extends React.PureComponent {
    history = null;

    constructor(props) {
        super(props);
        this.history = props.history;
        this.state = {
            activeTabKey: this.props.tabsConfig[Wizard.defaultProps.activeTabIndex].key,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSwipe = this.handleSwipe.bind(this);
    }

    handleChange = (event, activeTabIndex) => {
        this.pushToTab(activeTabIndex);
    };

    handleSwipe = activeTabIndex => {
        this.pushToTab(activeTabIndex);
    };

    pushToTab(activeTabIndex) {
        util.navigate.goToUrl(this.props.tabsConfig[activeTabIndex].url, this.history);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.activeTabKey !== nextProps.match.params.activeTabKey;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        const tabIndex = this.getTabIndex(nextProps);
        this.setState({activeTabKey: this.props.tabsConfig[tabIndex].key,});
    }

    componentDidUpdate(prevProps, prevState) {
        util.navigate.scrollUp(150);
    }

    getTabIndex = (props) => {
        return this.props.tabsConfig.map((tab) => tab.key)
            .indexOf(props.match.params.activeTabKey);
    };

    render() {
        const {
            classes,
            tabsConfig,
            direction,
            horizontal,
        } = this.props;

        let tabIndex = this.getTabIndex(this.props);
        if (tabIndex < 0) {
            return <Redirect to="/page-not-found"/>;
        }

        const tabContent = (
            <div className={classes.contentWrapper}>
                <SwipeableViews
                    axis={direction === "rtl" ? "x-reverse" : "x"}
                    index={tabIndex}
                    onChangeIndex={this.onSwipe}
                >
                    {tabsConfig.map((prop, key) => {
                        return (
                            <div className={classes.content} key={key}>
                                {prop.content}
                            </div>
                        );
                    })}
                </SwipeableViews>
            </div>
        );
        return horizontal !== undefined ? (
            <GridContainer>
                <GridItem {...horizontal.contentGrid}>{tabContent}</GridItem>
            </GridContainer>
        ) : (
            <div>
                {tabContent}
            </div>
        );
    }

    static defaultProps = {
        activeTabIndex: 0,
        color: PRIMARY_COLOR
    };

    static propTypes = {
        classes: PropTypes.object.isRequired,
        tabsConfig: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                pillText: PropTypes.string,
                pillIcon: PropTypes.string,
                pillClasses: PropTypes.string,
                content: PropTypes.node.isRequired,
            })
        ).isRequired,
        direction: PropTypes.string,
        horizontal: PropTypes.shape({
            contentGrid: PropTypes.object
        }),
    };
}

export default withStyles(wizardStyle)(withRouter(Wizard));
