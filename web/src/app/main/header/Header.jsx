import withStyles from "@material-ui/core/styles/withStyles";
import {
    headerParallaxFilterColor,
    mainMenuHoverColor,
    menuAfterScrollColor,
    menuInitialColor
} from "app/common/style/styleConsts";
import Parallax from "app/common/theme/parallax/Parallax.jsx";
import headerStyle from "app/main/header/headerStyle.jsx";
import MainMenuList from "app/main/menu/MainMenuList.jsx";
import MenuBar from "app/main/menu/MenuBar.jsx";
import React from "react";

class Header extends React.PureComponent {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <MenuBar
                    brandName="LC Cosmetics"
                    menuLinks={<MainMenuList dropdownHoverColor={mainMenuHoverColor}/>}
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
