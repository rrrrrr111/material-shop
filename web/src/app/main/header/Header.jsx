import withStyles from "@material-ui/core/styles/withStyles";
import {
    dropdownHoverColor,
    headerParallaxFilterColor,
    menuAfterScrollColor,
    menuInitialColor
} from "app/common/style/styleConsts";
import headerStyle from "app/main/header/headerStyle.jsx";
import MainMenu from "app/main/header/MainMenu.jsx";
import MenuBar from "app/main/header/MenuBar.jsx";
import Parallax from "app/common/theme/Parallax/Parallax.jsx";
import React from "react";

class Header extends React.PureComponent {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <MenuBar
                    brandName="LC Cosmetics"
                    menuLinks={<MainMenu dropdownHoverColor={dropdownHoverColor}/>}
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
