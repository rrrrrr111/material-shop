import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import MenuBar from "app/header/MenuBar.jsx";
import MenuLinks from "app/header/MenuLinks.jsx";
import Parallax from "lib/components/Parallax/Parallax.jsx";

import headerStyle from "app/header/headerStyle.jsx";

class Header extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <MenuBar
                    brandName="LC Cosmetics"
                    menuLinks={<MenuLinks dropdownHoverColor="info"/>}
                    fixed
                    color="transparent"
                    changeColorOnScroll={{
                        height: 100,
                        color: "rose"
                    }}
                />
                <Parallax
                    image={require("app/header/hero_bg.jpg")}
                    filter="rose"
                    small
                    className={classes.headerImage}
                >
                </Parallax>
            </div>
        );
    }
}

export default withStyles(headerStyle)(Header);
