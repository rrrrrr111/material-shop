import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import AppIcon from "app/common/icon/AppIcon";
import {ALL_COLOR_KEYS, PRIMARY_COLOR_KEY} from "app/common/style/styleConsts";
import navPillsStyle from "app/common/tabs/navPillsStyle.jsx";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import SwipeableViews from "react-swipeable-views";

class NavPills extends React.PureComponent {

    render() {
        const {
            classes,
            tabs,
            direction,
            color,
            activeTabIndex,
            horizontal,
            alignCenter,
            onChange, onSwipe,
        } = this.props;
        const flexContainerClasses = classNames({
            [classes.flexContainer]: true,
            [classes.horizontalDisplay]: horizontal !== undefined
        });
        const tabButtons = (
            <Tabs
                classes={{
                    root: classes.root,
                    fixed: classes.fixed,
                    flexContainer: flexContainerClasses,
                    indicator: classes.displayNone
                }}
                value={activeTabIndex}
                onChange={onChange}
                centered={alignCenter}
            >
                {tabs.map((prop, key) => {
                    var icon = {};
                    if (prop.pillIcon !== undefined) {
                        icon["icon"] = <AppIcon name={prop.pillIcon} className={classes.pillIcon}/>;
                    }
                    const pillsClasses = classNames({
                        [classes.pills]: true,
                        [classes.horizontalPills]: horizontal !== undefined,
                        [classes.pillsWithIcons]: prop.pillIcon !== undefined,
                        [prop.pillClasses]: prop.pillClasses !== undefined
                    });
                    return (
                        <Tab
                            label={prop.pillText}
                            key={key}
                            {...icon}
                            selected={key === activeTabIndex}
                            classes={{
                                root: pillsClasses,
                                labelContainer: classes.labelContainer,
                                label: classes.label,
                                selected: classes[color]
                            }}
                        />
                    );
                })}
            </Tabs>
        );
        const tabContent = (
            <div className={classes.contentWrapper}>
                <SwipeableViews
                    axis={direction === "rtl" ? "x-reverse" : "x"}
                    index={activeTabIndex}
                    onChangeIndex={onSwipe}
                >
                    {tabs.map((prop, key) => {
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
                <GridItem {...horizontal.tabsGrid}>{tabButtons}</GridItem>
                <GridItem {...horizontal.contentGrid}>{tabContent}</GridItem>
            </GridContainer>
        ) : (
            <div>
                {tabButtons}
                {tabContent}
            </div>
        );
    }

    static defaultProps = {
        activeTabIndex: 0,
        color: PRIMARY_COLOR_KEY
    };

    static propTypes = {
        classes: PropTypes.object.isRequired,
        activeTabIndex: PropTypes.number,
        tabs: PropTypes.arrayOf(
            PropTypes.shape({
                pillText: PropTypes.string,
                pillIcon: PropTypes.string,
                content: PropTypes.node,
                pillClasses: PropTypes.string,
            })
        ).isRequired,
        color: PropTypes.oneOf(ALL_COLOR_KEYS),
        direction: PropTypes.string,
        horizontal: PropTypes.shape({
            tabsGrid: PropTypes.object,
            contentGrid: PropTypes.object
        }),
        alignCenter: PropTypes.bool,
        onChange: PropTypes.func,
        onSwipe: PropTypes.func,
    };
}

export default withStyles(navPillsStyle)(NavPills);
