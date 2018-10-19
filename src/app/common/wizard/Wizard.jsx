import withStyles from "@material-ui/core/styles/withStyles";
import Button from "app/common/button/Button";
import AppIcon from "app/common/icon/AppIcon";
import {buttonColor} from "app/common/styles";
import wizardStyle from "app/common/wizard/wizardStyle";
import util from "app/utils/util";
import classNames from "classnames";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import debounce from 'lodash/debounce'
import PropTypes from "prop-types";
import React from "react";
import {Redirect, withRouter} from "react-router";
import SwipeableViews from "react-swipeable-views";

class Wizard extends React.Component {
    constructor(props) {
        super(props);

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
        util.navigate.goToUrl(this.props.tabsConfig[activeTabIndex].url, this.props.history);
    }

    handleClickPrev = (e) => {
        this.debounceChangeTab(e, -1);
    };

    handleClickNext = (e) => {
        this.debounceChangeTab(e, 1);
    };

    debounceChangeTab(e, step) {
        this._delayedChangeTab(e, step, this.props);
    };

    _delayedChangeTab = debounce( // для избежания двойного клика
        function (e, step, props) {
            const tabIndex = this.state.activeTabIndex + step;
            if (tabIndex === -1) {
                 // todo учитывать возврат с других шагов
                util.navigate.goToPreviousUrl(props.location, props.history);
                return
            }
            let url;
            if (tabIndex === this.props.tabsConfig.length) {
                url = this.props.finalUrl;
            } else {
                url = this.props.tabsConfig[tabIndex].url;
            }
            util.navigate.goToUrl(url, props.history);
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
        return <Button color={buttonColor} className={classNames(classes.cardFooterButton, "left")}
                       aria-label={buttonText}
                       aria-haspopup="false"
                       onClick={this.handleClickPrev}
        >
            <AppIcon name="fas fa-arrow-left" className={classes.buttonLeftIcon}/>
            {buttonText}
        </Button>;
    };

    renderNextButton(classes, tabConfig) {
        const buttonText = tabConfig.nextButtonText;
        if (buttonText === undefined) {
            return null;
        }
        return <Button color={buttonColor} className={classNames(classes.cardFooterButton, "right")}
                       aria-label={buttonText}
                       aria-haspopup="false"
                       onClick={this.handleClickNext}
        >
            {buttonText}
            {this.props.tabsConfig[this.props.tabsConfig.length - 1].key === tabConfig.key
                ? null
                : <AppIcon name="fas fa-arrow-right" className={classes.buttonRightIcon}/>
            }

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
                            <div key={key} className={
                                classNames({
                                    [tabConfig.containerClassName]: tabConfig.containerClassName,
                                })}>
                                {tabConfig.content}
                                <div className={classes.width100}>
                                    {this.renderNextButton(classes, tabConfig)}
                                    {this.renderPrevButton(classes, tabConfig)}
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
                containerClassName: PropTypes.string,
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
