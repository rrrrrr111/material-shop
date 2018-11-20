import UserCart from "app/cart/UserCart";
import Notify from "app/common/message/notify/Notify";
import Feed from "app/feed/simple/SimpleFeed";

import AppFooter from "app/main/footer/AppFooter";
import Header from "app/main/header/Header";
import SimpleProduct from "app/product/SimpleProduct";
import LoginPopup from "app/user/auth/LoginPopup";
import RegPopup from "app/user/auth/RegPopup";
import SignoutComponent from "app/user/auth/SignoutComponent";
import UserProfile from "app/user/profile/UserProfile";
import util from "app/utils/util";
import React from "react";
import {Switch} from "react-router";
import Route from "react-router/es/Route";

class MainLayout extends React.PureComponent {
    state = {
        mainSwitchLocation: { // для модальных окон сохраняем на фоне предыдущий location
            pathname: "/",
            state: {
                local: true
            }
        }
    };

    static getDerivedStateFromProps(props, state) {
        const newLocation = props.location;
        //console.log("msl updated", state.mainSwitchLocation, newLocation, MainLayout.isModal(newLocation), props.history.action);

        if (state.mainSwitchLocation.pathname !== newLocation.pathname
            && (!MainLayout.isModal(newLocation))) {
            return {mainSwitchLocation: newLocation};
        }
        return null; // Return null to indicate no change to state.
    }

    componentDidMount() {
        util.navigate.scrollUp();
    }

    static isModal = (location) => {
        return MainLayout.modalRegistry.hasOwnProperty(location.pathname);
    };

    static modalRegistry = {
        "/auth/signin": LoginPopup,
        "/auth/signup": RegPopup,
        "/auth/signout": SignoutComponent,
    };

    render() {
        const {location} = this.props;
        const {mainSwitchLocation} = this.state;
        const isModal = MainLayout.isModal(location);

        return (
            <div>
                <Route component={Header}/>
                <Switch location={isModal ? mainSwitchLocation : location}>
                    <Route path="/user/:activeTabKey" component={UserProfile}/>
                    <Route path="/cart/:activeTabKey" component={UserCart}/>
                    <Route path="/p/:productLink" component={SimpleProduct}/>
                    <Route path="/" component={Feed}/>
                </Switch>
                <Route component={AppFooter}/>

                {isModal /* Попапы */
                    ? <Switch>
                        {Object.keys(MainLayout.modalRegistry).map(function (path, index) {
                            return <Route key={index}
                                          path={path}
                                          component={MainLayout.modalRegistry[path]}/>
                        })}
                    </Switch>
                    : null}

                <Notify/>
            </div>
        );
    }
}

export default MainLayout;
