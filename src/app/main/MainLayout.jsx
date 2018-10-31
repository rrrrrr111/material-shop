import UserCart from "app/cart/UserCart";
import Feed from "app/feed/simple/SimpleFeed";

import AppFooter from "app/main/footer/AppFooter";
import Header from "app/main/header/Header";
import SimpleProduct from "app/product/SimpleProduct";
import LoginPopup from "app/user/auth/LoginPopup";
import RegPopup from "app/user/auth/RegPopup";
import SignoutComponent from "app/user/auth/SignoutComponent";
import UserProfile from "app/user/profile/UserProfile";
import React from "react";
import {Switch} from "react-router";
import Route from "react-router/es/Route";

class MainLayout extends React.PureComponent {
    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    {/* контент главного окна */}
                    <Route path={"/user/:activeTabKey"} component={UserProfile}/>
                    <Route path={"/cart/:activeTabKey"} component={UserCart}/>
                    <Route path="/p/:productLink" component={SimpleProduct}/>
                    <Route path="/" component={Feed}/>
                </Switch>
                <Switch>
                    {/* Попапы */}
                    <Route path="/auth/signin" component={LoginPopup}/>
                    <Route path="/auth/signup" component={RegPopup}/>
                    <Route path="/auth/signout" component={SignoutComponent}/>
                </Switch>
                <AppFooter/>
            </div>
        );
    }
}

export default MainLayout;
