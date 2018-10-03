import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
// nodejs library that concatenates classes
import classNames from "classnames";

import navPillsStyle from "lib/assets/jss/material-kit-pro-react/components/navPillsStyle.jsx";


import GridContainer from "lib/components/Grid/GridContainer.jsx";
import GridItem from "lib/components/Grid/GridItem.jsx";

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
                    if (prop.tabIcon !== undefined) {
                        icon["icon"] = <prop.tabIcon className={classes.tabIcon}/>;
                    }
                    const pillsClasses = classNames({
                        [classes.pills]: true,
                        [classes.horizontalPills]: horizontal !== undefined,
                        [classes.pillsWithIcons]: prop.tabIcon !== undefined,
                        [prop.pillClasses]: prop.pillClasses !== undefined
                    });
                    return (
                        <Tab
                            label={prop.tabButton}
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
                            <div className={classes.tabContent} key={key}>
                                {prop.tabContent}
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
        color: "primary"
    };

    static propTypes = {
        classes: PropTypes.object.isRequired,
        activeTabIndex: PropTypes.number,
        tabs: PropTypes.arrayOf(
            PropTypes.shape({
                tabButton: PropTypes.string,
                tabIcon: PropTypes.func,
                tabContent: PropTypes.node,
                pillClasses: PropTypes.string,
            })
        ).isRequired,
        color: PropTypes.oneOf([
            "primary",
            "warning",
            "danger",
            "success",
            "info",
            "rose"
        ]),
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
