import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Card from "app/common/card/Card.jsx";
import CardBody from "app/common/card/CardBody.jsx";
import CardHeader from "app/common/card/CardHeader.jsx";
import {ALL_COLORS} from "app/common/style/styles";
import customTabsStyle from "app/common/tabs/customTabsStyle.jsx";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

class CustomTabs extends React.PureComponent {
    state = {
        value: 0
    };
    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {
            classes,
            headerColor,
            title,
            tabs,
            rtlActive,
            plainTabs
        } = this.props;
        const cardTitle = classNames({
            [classes.cardTitle]: true,
            [classes.cardTitleRTL]: rtlActive
        });
        const tabsContainer = classNames({
            [classes.tabsContainer]: true,
            [classes.tabsContainerRTL]: rtlActive
        });
        return (
            <Card plain={plainTabs}>
                <CardHeader color={headerColor} plain={plainTabs}>
                    {title !== undefined ? (
                        <div className={cardTitle}>{"title"}</div>
                    ) : null}
                    <Tabs
                        classes={{
                            root: classes.customTabsRoot,
                            flexContainer: tabsContainer,
                            indicator: classes.displayNone
                        }}
                        value={this.state.value}
                        onChange={this.handleChange}
                        textColor="inherit"
                    >
                        {tabs.map((prop, key) => {
                            let icon = {};
                            if (prop.tabIcon !== undefined) {
                                icon = {
                                    icon: <prop.tabIcon className={classes.tabIcon}/>
                                };
                            } else {
                                icon = {};
                            }
                            return (
                                <Tab
                                    key={key}
                                    classes={{
                                        root: classes.customTabRoot,
                                        selected: classes.customTabSelected,
                                        labelContainer: classes.customTabLabelContainer,
                                        wrapper: classes.customTabWrapper,
                                        label: classes.customTabLabel
                                    }}
                                    {...icon}
                                    label={prop.tabName}
                                />
                            );
                        })}
                    </Tabs>
                </CardHeader>
                <CardBody>
                    {tabs.map((prop, key) => {
                        if (key === this.state.value) {
                            return <div key={key}>{prop.tabContent}</div>;
                        }
                        return null;
                    })}
                </CardBody>
            </Card>
        );
    }

    static defaultProps = {
        headerColor: "purple"
    };

    static propTypes = {
        classes: PropTypes.object.isRequired,
        headerColor: PropTypes.oneOf(ALL_COLORS),
        title: PropTypes.string,
        tabs: PropTypes.arrayOf(
            PropTypes.shape({
                tabName: PropTypes.string.isRequired,
                tabIcon: PropTypes.func,
                tabContent: PropTypes.node.isRequired
            })
        ),
        rtlActive: PropTypes.bool,
        plainTabs: PropTypes.bool
    };
}

export default withStyles(customTabsStyle)(CustomTabs);
