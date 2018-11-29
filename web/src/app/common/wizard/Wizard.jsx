import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import AppIcon from "app/common/icon/AppIcon";
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
                goFinal = newIndex >= compRef.props.tabsConfig.length || currTabConfig.isFinalStep;

            if (goNext && currTabConfig.nextButton.canGo
                && !currTabConfig.nextButton.canGo()) {
                return;
            }
            if (goPrev && currTabConfig.prevButton.canGo
                && !currTabConfig.prevButton.canGo()) {
                return;
            }
            if (goBack) {
                // todo учитывать возврат с других шагов
                util.navigate.goToPreviousUrl();
                return;
            }
            let url;
            if (goFinal) {
                url = compRef.props.finalUrl;
            } else {
                url = compRef.getTabConfig(newIndex).url;
            }
            util.navigate.goToUrl(url);
            util.navigate.scrollUp();
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
        return <Button color={buttonColor} className={classNames(classes.cardFooterButton, "right")}
                       aria-label={button.text}
                       aria-haspopup="false"
                       disabled={button.disabled}
                       onClick={this.handleClickNext}
        >
            {button.text}
            {this.getTabConfig(this.props.tabsConfig.length - 1).key === tabConfig.key
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
                    canGo: PropTypes.func,
                }).isRequired,
                nextButton: PropTypes.shape({
                    text: PropTypes.string.isRequired,
                    disabled: PropTypes.bool,
                    canGo: PropTypes.func,
                }).isRequired,
                isFinalStep: PropTypes.bool,
            })
        ).isRequired,
        direction: PropTypes.string,
        horizontal: PropTypes.shape({
            contentGrid: PropTypes.object
        }),
        finalUrl: PropTypes.string.isRequired,
    };
}

export default withRouter(withStyles(wizardStyle)(Wizard));
