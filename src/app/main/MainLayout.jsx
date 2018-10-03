import React from "react";

import AppFooter from "../footer/AppFooter";
import Header from "../header/Header";
import Feed from "../feed/Feed";
import Route from "react-router/es/Route";
import LoginPopup from "../auth/LoginPopup";
import RegPopup from "../auth/RegPopup";
import SignoutComponent from "../auth/SignoutComponent";

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
                <Route path="/user/signin" exact component={LoginPopup}/>
                <Route path="/user/signup" exact component={RegPopup}/>
                <Route path="/user/signout" exact component={SignoutComponent}/>
                <AppFooter/>
            </div>
        );
    }
}

export default MainLayout;
