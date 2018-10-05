import withStyles from "@material-ui/core/styles/withStyles";
import userCartStyle from "app/cart/userCartStyle";
import {navPillsColor} from "app/common/styles";
import OrdersTab from "app/user/profile/OrdersTab";
import PasswordTab from "app/user/profile/PasswordTab";
import ProfileTab from "app/user/profile/ProfileTab";
import classNames from "classnames";
import Clearfix from "lib/components/Clearfix/Clearfix";
import NavPills from "lib/components/NavPills/NavPills";
import React from "react";


class UserCart extends React.PureComponent {

    tabsConfig = [
        {key: "goods", content: <ProfileTab/>},
        {key: "order", content: <OrdersTab/>},
        {key: "payment", content: <PasswordTab/>},
    ];

    render() {
        const {classes} = this.props;

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

export default withStyles(userCartStyle)(UserCart);
