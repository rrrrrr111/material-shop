import withStyles from "@material-ui/core/styles/withStyles";

import {Face, Fingerprint, History, SettingsApplications} from "@material-ui/icons";
import {navPillsColor} from "app/common/styles";
import OrdersTab from "app/user/profile/OrdersTab";
import PasswordTab from "app/user/profile/PasswordTab";
import ProfileTab from "app/user/profile/ProfileTab";
import SettingsTab from "app/user/profile/SettingsTab";
import userProfileStyle from "app/user/profile/userProfileStyle";
import util from "app/utils/util";
import classNames from "classnames";
import Clearfix from "lib/components/Clearfix/Clearfix";
import NavPills from "lib/components/NavPills/NavPills";

import React from "react";
import {Redirect} from "react-router";

class UserProfile extends React.Component {
    history = null;

    constructor(props) {
        super(props);
        this.history = props.history;
        this.state = {
            activeTabKey: this.tabsConfig[0].key,
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
        util.navigate.goToUrl('/user/' + this.tabsConfig[activeTabIndex].key, this.history);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const tabIndex = this.getTabIndex(nextProps);
        if (tabIndex < 0) {
            return false;
        }
        return this.state.activeTabKey !== nextProps.match.params.activeTabKey;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        const tabIndex = this.getTabIndex(nextProps);
        this.setState({activeTabKey: this.tabsConfig[tabIndex].key,});
    }

    componentDidUpdate(prevProps, prevState) {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 150) { // не скролим если не далеко от верхушки
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
        }
    }

    getTabIndex = (props) => {
        return this.tabsConfig.map((tab) => tab.key)
            .indexOf(props.match.params.activeTabKey);
    };

    tabsConfig = [
        {key: "profile", name: "Профиль пользователя", icon: Face, content: <ProfileTab/>},
        {key: "orders", name: "История Заказов", icon: History, content: <OrdersTab/>},
        {key: "settings", name: "Настройки", icon: SettingsApplications, content: <SettingsTab/>},
        {key: "password", name: "Смена пароля", icon: Fingerprint, content: <PasswordTab/>},
    ];

    render() {
        const {classes} = this.props;
        let tabIndex = this.getTabIndex(this.props);

        if (tabIndex < 0) {
            return <Redirect to="/page-not-found"/>;
        }
        return <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
                <Clearfix/>
                <div className={classes.profileTabs}>
                    <NavPills
                        alignCenter
                        activeTabIndex={tabIndex}
                        onSwipe={this.handleSwipe}
                        onChange={this.handleChange}
                        color={navPillsColor}
                        tabs={this.tabsConfig.map((tab) => {
                            return {
                                tabButton: tab.name,
                                pillClasses: classes.profileTabPill,
                                tabIcon: tab.icon,
                                tabContent: tab.content
                            }
                        })}
                    />
                </div>
                <Clearfix/>
            </div>
        </div>;
    }
}

export default withStyles(userProfileStyle)(UserProfile);
