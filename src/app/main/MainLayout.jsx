import React from "react";

import AppFooter from "../footer/AppFooter";
import Header from "../header/Header";
import Feed from "../feed/Feed";
import Route from "react-router/es/Route";
import SigninPopup from "../auth/SigninPopup";
import SignupPopup from "../auth/SignupPopup";

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
                <Route path="/user/signin" exact component={SigninPopup}/>
                <Route path="/user/signup" exact component={SignupPopup}/>
                <AppFooter/>
            </div>
        );
    }
}

export default MainLayout;
