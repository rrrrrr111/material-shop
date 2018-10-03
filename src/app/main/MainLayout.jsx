import React from "react";

import AppFooter from "../main/footer/AppFooter";
import Header from "./header/Header";
import Feed from "../feed/Feed";
import Route from "react-router/es/Route";
import LoginPopup from "../user/auth/LoginPopup";
import RegPopup from "../user/auth/RegPopup";
import SignoutComponent from "../user/auth/SignoutComponent";
import {Switch} from "react-router";

class MainLayout extends React.PureComponent {
    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }

    render() {
        return (
            <div>
                <Header/>
                <Feed/>
                <Switch>
                    <Route path="/user/signin" component={LoginPopup}/>
                    <Route path="/user/signup" component={RegPopup}/>
                    <Route path="/user/signout" component={SignoutComponent}/>
                </Switch>
                <AppFooter/>
            </div>
        );
    }
}

export default MainLayout;
