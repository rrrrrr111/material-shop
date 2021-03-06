import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import AppIcon from "app/common/icon/AppIcon";
import ErrorMessage from "app/common/message/ErrorMessage";
import Clearfix from "app/common/misc/Clearfix";
import {buttonColor} from "app/common/style/styleConsts";
import Button from "app/common/theme/button/Button";
import wizardStyle from "app/common/wizard/wizardStyle";
import {buttonDebounceRule, buttonDebounceTimeout, classNames, debounce, PropTypes} from "app/utils/functionUtil";
import util from "app/utils/util";
import React from "react";
import {Redirect, withRouter} from "react-router";
import SwipeableViews from "react-swipeable-views";

class Wizard extends React.Component {
    constructor(props) {
        super(props);
        this.handleSwipe = this.handleSwipe.bind(this);
        this.handleClickPrev = this.handleClickPrev.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        util.navigate.scrollUp();
    }

    handleSwipe = tabIndex => {
        this.pushToTab(tabIndex);
    };

    getTabConfig(index) {
        return this.props.tabsConfig[index];
    }

    pushToTab(tabIndex) {
        util.navigate.goToUrl(this.getTabConfig(tabIndex).url);
    }

    handleClickPrev = (e) => {
        this.changeTab(e, -1);
    };

    handleClickNext = (e) => {
        this.changeTab(e, 1);
    };

    changeTab(e, step) {
        this._delayedChangeTab(e, step);
    };

    _delayedChangeTab = debounce( // для избежания двойного клика
        (e, step) => {
            const compRef = this,
                currIndex = compRef.getTabIndex(compRef.props),
                currTabConfig = compRef.getTabConfig(currIndex),
                newIndex = currIndex + step,
                goBack = newIndex < 0,
                goPrev = newIndex < currIndex,
                goNext = newIndex > currIndex,
                goFinal = newIndex >= compRef.props.tabsConfig.length || (currTabConfig.isFinalStep && goNext);

            let url;
            if (goFinal || goBack) {
                url = compRef.props.finalUrl;
            } else {
                url = compRef.getTabConfig(newIndex).url;
            }
            const goCallback = () => {
                util.navigate.goToUrl(url);
                util.navigate.scrollUp();
            };

            if ((goNext || goFinal) && currTabConfig.nextButton.onClick) {
                currTabConfig.nextButton.onClick(goCallback);
                return;
            }
            if ((goBack || goPrev) && currTabConfig.prevButton.onClick) {
                currTabConfig.prevButton.onClick(goCallback);
                return;
            }
            goCallback();
        }, buttonDebounceTimeout, buttonDebounceRule);

    getTabIndex = (props) => {
        return props.tabsConfig.map((tab) => tab.key)
            .indexOf(props.match.params.activeTabKey);
    };

    renderPrevButton(classes, tabConfig) {
        const button = tabConfig.prevButton;
        return <Button color={buttonColor} className={classNames(classes.cardFooterButton, "left")}
                       aria-label={button.text}
                       aria-haspopup="false"
                       disabled={button.disabled}
                       onClick={this.handleClickPrev}
        >
            <AppIcon name="fas fa-arrow-left" className={classes.buttonLeftIcon}/>
            {button.text}
        </Button>;
    };

    renderNextButton(classes, tabConfig) {
        const button = tabConfig.nextButton;
        let isFinalStep = (
            this.getTabConfig(this.props.tabsConfig.length - 1).key === tabConfig.key
            || tabConfig.isFinalStep);
        return <Button color={buttonColor} className={classNames(classes.cardFooterButton, "right")}
                       aria-label={button.text}
                       aria-haspopup="false"
                       disabled={button.disabled}
                       onClick={this.handleClickNext}
        >
            {button.text}
            {isFinalStep
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
            message,
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
                    {tabsConfig.map((tab, index) => {
                        return (
                            <div key={index} className={
                                classNames({
                                    [tab.containerClassName]: tab.containerClassName,
                                })}>
                                {typeof tab.content === 'function' ? <tab.content/> : tab.content}
                                <div className={classes.width100}>
                                    {this.renderNextButton(classes, tab)}
                                    {this.renderPrevButton(classes, tab)}
                                </div>
                                <Clearfix/>
                                <ErrorMessage>{message}</ErrorMessage>
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
                content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
                containerClassName: PropTypes.string,
                prevButton: PropTypes.shape({
                    text: PropTypes.string.isRequired,
                    disabled: PropTypes.bool,
                    onClick: PropTypes.func,
                }).isRequired,
                nextButton: PropTypes.shape({
                    text: PropTypes.string.isRequired,
                    disabled: PropTypes.bool,
                    onClick: PropTypes.func,
                }).isRequired,
                isFinalStep: PropTypes.bool,
            })
        ).isRequired,
        direction: PropTypes.string,
        horizontal: PropTypes.shape({
            contentGrid: PropTypes.object
        }),
        finalUrl: PropTypes.string.isRequired,
        message: PropTypes.string,
    };
}

export default withRouter(withStyles(wizardStyle)(Wizard));
