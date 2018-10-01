import React from "react";
import {Link} from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
// core components
import menuBarStyle from "app/header/menuBarStyle.jsx";

class MenuBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mobileSidebarOpened: false
        };
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.headerColorChange = this.headerColorChange.bind(this);
    }

    handleDrawerToggle() {
        this.setState({mobileSidebarOpened: !this.state.mobileSidebarOpened});
    }

    componentDidMount() {
        if (this.props.changeColorOnScroll) {
            window.addEventListener("scroll", this.headerColorChange);
        }
    }

    componentWillUnmount() {
        if (this.props.changeColorOnScroll) {
            window.removeEventListener("scroll", this.headerColorChange);
        }
    }

    headerColorChange() {
        const {classes, color: topColor, changeColorOnScroll} = this.props;
        const currentOffsetFromTop = window.pageYOffset;
        const classList = document.body.getElementsByTagName("header")[0].classList;
        const {color: afterScrollColor, height: changeColorOffset} = changeColorOnScroll;

        if (currentOffsetFromTop > changeColorOffset) {

            classList.remove(classes[topColor]);
            classList.add(classes[afterScrollColor]);
        } else {
            classList.add(classes[topColor]);
            classList.remove(classes[afterScrollColor]);
        }
    }

    render() {
        const {classes, color, menuLinks, brandName, fixed, absolute} = this.props;
        const menuBarClasses = classNames({
            [classes.appBar]: true,
            [classes[color]]: color,
            [classes.absolute]: absolute,
            [classes.fixed]: fixed
        });
        return (
            <AppBar className={menuBarClasses}>
                <Toolbar className={classes.container}>
                    <Button className={classes.title}>
                        <Link to="/">{brandName}</Link>
                    </Button>

                    {/* для десктопа */}
                    <Hidden smDown implementation="css" className={classes.hidden}>
                        <div className={classes.collapse}>{menuLinks}</div>
                    </Hidden>

                    {/* для мобил */}
                    <Hidden mdUp>
                        <IconButton
                            color="inherit"
                            aria-label="Открыть меню"
                            onClick={this.handleDrawerToggle}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>
                </Toolbar>

                {/* для мобил */}
                <Hidden mdUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={"right"}
                        open={this.state.mobileSidebarOpened}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        onClose={this.handleDrawerToggle}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="Закрыть меню"
                            onClick={this.handleDrawerToggle}
                            className={classes.closeButtonDrawer}
                        >
                            <CloseIcon/>
                        </IconButton>
                        <div className={classes.appResponsive}>{menuLinks}</div>
                    </Drawer>
                </Hidden>
            </AppBar>
        );
    }
}

MenuBar.defaultProp = {
    color: "white"
};

MenuBar.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "transparent",
        "white",
        "rose",
        "dark"
    ]),
    menuLinks: PropTypes.node,
    brandName: PropTypes.string,
    fixed: PropTypes.bool,
    absolute: PropTypes.bool,
    // this will cause the sidebar to change the color from
    // this.props.color (see above) to changeColorOnScroll.color
    // when the window.pageYOffset is heigher or equal to
    // changeColorOnScroll.height and then when it is smaller than
    // changeColorOnScroll.height change it back to
    // this.props.color (see above)
    changeColorOnScroll: PropTypes.shape({
        height: PropTypes.number.isRequired,
        color: PropTypes.oneOf([
            "primary",
            "info",
            "success",
            "warning",
            "danger",
            "transparent",
            "white",
            "rose",
            "dark"
        ]).isRequired
    })
};

export default withStyles(menuBarStyle)(MenuBar);
