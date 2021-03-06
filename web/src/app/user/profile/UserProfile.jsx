import withStyles from "@material-ui/core/styles/withStyles";
import Clearfix from "app/common/misc/Clearfix";
import {navPillsColor} from "app/common/style/styleConsts";
import NavPills from "app/common/tabs/NavPills";
import OrdersTab from "app/user/profile/OrdersTab";
import PasswordTab from "app/user/profile/PasswordTab";
import ProfileTab from "app/user/profile/ProfileTab";
import SettingsTab from "app/user/profile/SettingsTab";
import UserDataLoader from "app/user/profile/UserDataLoader";
import userProfileStyle from "app/user/profile/userProfileStyle";
import util from "app/utils/util";
import classNames from "classnames";

import React from "react";
import {Redirect} from "react-router";

class UserProfile extends React.Component {
    history = null;

    constructor(props) {
        super(props);
        this.history = props.history;
        let tabIndex = this.getTabIndex(this.props);
        tabIndex = tabIndex >= 0 ? tabIndex : 0; // чтобы дальше не падало, когда activeTabKey не известный ничего не отрисовывается
        this.state = {
            activeTabKey: this.tabsConfig[tabIndex].key,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSwipe = this.handleSwipe.bind(this);
        util.navigate.scrollUp();
    }

    handleChange = (event, activeTabIndex) => {
        this.pushToTab(activeTabIndex);
    };
    handleSwipe = activeTabIndex => {
        this.pushToTab(activeTabIndex);
    };

    pushToTab(activeTabIndex) {
        util.navigate.goToUrl('/user/' + this.tabsConfig[activeTabIndex].key);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.activeTabKey !== nextProps.match.params.activeTabKey;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        const tabIndex = this.getTabIndex(nextProps);
        if (tabIndex < 0) { // чтобы дальше не падало, когда activeTabKey не известный ничего не отрисовывается
            return;
        }
        this.setState({activeTabKey: this.tabsConfig[tabIndex].key,});
    }

    componentDidUpdate(prevProps, prevState, ss) {
        util.navigate.scrollUp();
    }

    getTabIndex = (props) => {
        return this.tabsConfig.map((tab) => tab.key)
            .indexOf(props.match.params.activeTabKey);
    };

    tabsConfig = [
        {key: "profile", name: "Профиль пользователя", icon: "face", content: ProfileTab},
        {key: "orders", name: "История Заказов", icon: "history", content: OrdersTab},
        {key: "settings", name: "Настройки", icon: "settings", content: SettingsTab},
        {key: "password", name: "Смена пароля", icon: "fingerprint", content: PasswordTab},
    ];

    render() {
        const {classes} = this.props;
        let tabIndex = this.getTabIndex(this.props);

        if (tabIndex < 0) {
            return <Redirect to="/page-not-found"/>;
        }
        return (

            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <Clearfix/>
                    <div className={classes.profileTabs}>
                        <NavPills
                            alignCenter
                            activeTabIndex={tabIndex}
                            onSwipe={this.handleSwipe}
                            onChange={this.handleChange}
                            color={navPillsColor}
                            tabs={this.tabsConfig.map((tab, index) => {
                                return {
                                    pillText: tab.name,
                                    pillClasses: classes.profileTabPill,
                                    pillIcon: tab.icon,
                                    content: (
                                        <UserDataLoader showLogin={true}>
                                            <tab.content/>
                                        </UserDataLoader>
                                    )
                                }
                            })}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(userProfileStyle)(UserProfile);
