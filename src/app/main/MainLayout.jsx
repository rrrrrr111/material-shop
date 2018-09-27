import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import style from "app/main/style.jsx";
import AppFooter from "../footer/AppFooter";
import AppHeader from "../header/AppHeader";
import Feed from "../feed/Feed";

class MainLayout extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <AppHeader/>
                <Feed/>
                <AppFooter/>
            </div>
        );
    }
}

export default withStyles(style)(MainLayout);
