import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import mainLayoutStyle from "app/main/mainLayoutStyle.jsx";
import AppFooter from "../footer/AppFooter";
import Header from "../header/Header";
import Feed from "../feed/Feed";

class MainLayout extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }

    render() {
        const {classes} = this.props; // eslint-disable-next-line
        return (
            <div>
                <Header/>
                <Feed/>
                <AppFooter/>
            </div>
        );
    }
}

export default withStyles(mainLayoutStyle)(MainLayout);
