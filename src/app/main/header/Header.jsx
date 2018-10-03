import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import MenuBar from "app/main/header/MenuBar.jsx";
import Menu from "app/main/header/menu/Menu.jsx";
import Parallax from "lib/components/Parallax/Parallax.jsx";

import headerStyle from "app/main/header/headerStyle.jsx";
import {dropdownHoverColor, headerParallaxFilterColor, menuAfterScrollColor, menuInitialColor} from "app/common/styles";

class Header extends React.PureComponent {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <MenuBar
                    brandName="LC Cosmetics"
                    menuLinks={<Menu dropdownHoverColor={dropdownHoverColor}/>}
                    fixed
                    color={menuInitialColor}
                    changeColorOnScroll={{
                        height: 100,
                        color: menuAfterScrollColor,
                    }}
                />
                <Parallax
                    image={require("app/main/header/hero_bg.jpg")}
                    filter={headerParallaxFilterColor}
                    small
                    className={classes.headerImage}
                >
                </Parallax>
            </div>
        );
    }
}

export default withStyles(headerStyle)(Header);
