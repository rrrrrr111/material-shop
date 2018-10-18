import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";

import MenuIcon from "@material-ui/icons/Menu";
import LocalLink from "app/common/misc/LocalLink";
import {ALL_COLORS, WHITE_COLOR} from "app/common/styles";

import menuBarStyle from "app/main/header/menuBarStyle.jsx";
// nodejs library that concatenates classes
import classNames from "classnames";

import PropTypes from "prop-types";
import React from "react";

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
                        <LocalLink to="/">{brandName}</LocalLink>
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

    static defaultProp = {
        color: WHITE_COLOR
    };

    static propTypes = {
        classes: PropTypes.object.isRequired,
        color: PropTypes.oneOf(ALL_COLORS),
        menuLinks: PropTypes.node,
        brandName: PropTypes.string,
        fixed: PropTypes.bool,
        absolute: PropTypes.bool,
        changeColorOnScroll: PropTypes.shape({
            height: PropTypes.number.isRequired,
            color: PropTypes.oneOf(ALL_COLORS).isRequired
        })
    };
}


export default withStyles(menuBarStyle)(MenuBar);
