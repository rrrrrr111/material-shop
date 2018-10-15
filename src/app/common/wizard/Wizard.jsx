import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";
import {buttonColor} from "app/common/styles";
import wizardStyle from "app/common/wizard/wizardStyle";
import util from "app/utils/util";
import Button from "lib/components/CustomButtons/Button";
import GridContainer from "lib/components/Grid/GridContainer.jsx";
import GridItem from "lib/components/Grid/GridItem.jsx";
import debounce from 'lodash/debounce'
import PropTypes from "prop-types";
import React from "react";
import {Redirect, withRouter} from "react-router";
import SwipeableViews from "react-swipeable-views";

class Wizard extends React.Component {
    history = null;

    constructor(props) {
        super(props);
        this.history = props.history;

        let tabIndex = this.getTabIndex(this.props);
        tabIndex = tabIndex >= 0 ? tabIndex : 0; // чтобы дальше не падало, когда activeTabKey не известный ничего не отрисовывается
        this.state = {
            activeTabIndex: tabIndex,
            activeTabKey: this.props.tabsConfig[tabIndex].key,
        };
        this.handleSwipe = this.handleSwipe.bind(this);
        this.handleClickPrev = this.handleClickPrev.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        util.navigate.scrollUp(150);
    }

    handleSwipe = activeTabIndex => {
        this.pushToTab(activeTabIndex);
    };

    pushToTab(activeTabIndex) {
        util.navigate.goToUrl(this.props.tabsConfig[activeTabIndex].url, this.history);
    }

    handleClickPrev = (e) => {
        this.debounceChangeTab(e, -1);
    };

    handleClickNext = (e) => {
        this.debounceChangeTab(e, 1);
    };

    debounceChangeTab(e, step) {
        this._delayedChangeTab(e, step, this.history);
    };

    _delayedChangeTab = debounce( // для избежания двойного клика
        function (e, step, history) {
            const tabIndex = this.state.activeTabIndex + step;
            let url;
            if (tabIndex === this.props.tabsConfig.length) {
                url = this.props.finalUrl;
            } else {

                console.log('function executed tabIndex:' + tabIndex);
                url = this.props.tabsConfig[tabIndex].url;
            }
            util.navigate.goToUrl(url, history);

        }, 500, {leading: true, trailing: false});

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.activeTabKey !== nextProps.match.params.activeTabKey;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        let tabIndex = this.getTabIndex(nextProps);
        if (tabIndex < 0) { // чтобы дальше не падало, когда activeTabKey не известный ничего не отрисовывается
            return;
        }
        this.setState({
            activeTabIndex: tabIndex,
            activeTabKey: this.props.tabsConfig[tabIndex].key
        });
    }

    componentDidUpdate(prevProps, prevState) {
        util.navigate.scrollUp(150);
    }

    getTabIndex = (props) => {
        return this.props.tabsConfig.map((tab) => tab.key)
            .indexOf(props.match.params.activeTabKey);
    };

    renderPrevButton(classes, tabConfig) {
        const buttonText = tabConfig.prevButtonText;
        if (buttonText === undefined) {
            return null;
        }
        return <Button color={buttonColor} className={classes.cardFooterLeftButton}
                       aria-label={buttonText}
                       aria-haspopup="false"
                       onClick={this.handleClickPrev}
        >
            <AppIcon name="shopping_cart"/>
            {buttonText}
        </Button>;
    };

    renderNextButton(classes, tabConfig) {
        const buttonText = tabConfig.nextButtonText;
        if (buttonText === undefined) {
            return null;
        }
        return <Button color={buttonColor} className={classes.cardFooterRightButton}
                       aria-label={buttonText}
                       aria-haspopup="false"
                       onClick={this.handleClickNext}
        >
            {buttonText}
            <AppIcon name="shopping_cart"/>
        </Button>;
    }

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
                    onChangeIndex={this.handleSwipe}
                >
                    {tabsConfig.map((tabConfig, key) => {
                        return (
                            <div key={key}>
                                {tabConfig.content}

                                <div className={classes.width100}>
                                    {this.renderPrevButton(classes, tabConfig)}
                                    {this.renderNextButton(classes, tabConfig)}
                                </div>
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

    static propTypes = {
        classes: PropTypes.object.isRequired,
        tabsConfig: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                content: PropTypes.node.isRequired,
                prevButtonText: PropTypes.string,
                nextButtonText: PropTypes.string,
            })
        ).isRequired,
        direction: PropTypes.string,
        horizontal: PropTypes.shape({
            contentGrid: PropTypes.object
        }),
        finalUrl: PropTypes.string.isRequired,
    };
}

export default withStyles(wizardStyle)(withRouter(Wizard));
