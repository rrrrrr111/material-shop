import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Header from "app/header/Header.jsx";
import HeaderLinks from "app/header/HeaderLinks.jsx";
import Parallax from "lib/components/Parallax/Parallax.jsx";

import style from "app/header/style.jsx";

class AppHeader extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header
                    brand="LC Cosmetics"
                    links={<HeaderLinks dropdownHoverColor="info"/>}
                    fixed
                    color="transparent"
                    changeColorOnScroll={{
                        height: 50,
                        color: "rose"
                    }}
                />
                <Parallax
                    image={require("app/header/hero_bg.jpg")}
                    filter="rose"
                    className={classes.headerImage}
                >
                </Parallax>
            </div>
        );
    }
}

export default withStyles(style)(AppHeader);
