/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
// core components
import CustomDropdown from "lib/components/CustomDropdown/CustomDropdown.jsx";
import Button from "lib/components/CustomButtons/Button.jsx";

import menuStyle from "app/header/menu/menuStyle.jsx";
import catalogMenuMap from "./catalogMenuMap";
import userMenuMap from "./userMenuMap";
import menuIconsMap from "./menuIconsMap";
import MenuItem from "./MenuItem";

import {Notifications} from "@material-ui/icons";
import Snackbar from "../../common/notification/snackbar/Snackbar";
import {notificationColor, notificationPlace} from "../../common/styles";

class Menu extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showEmptyCartNotification: false,
        };
    }

    showNotification(place) {
        var x = [];
        x[place] = true;
        this.setState(x);
        this.alertTimeout = setTimeout(
            function () {
                x[place] = false;
                this.setState(x);
            }.bind(this),
            3000
        );
    }

    render = () => {
        const {classes, dropdownHoverColor} = this.props;

        return (
            <List className={classes.list + " " + classes.mlAuto}>
                <ListItem className={classes.listItem}>
                    <CustomDropdown
                        noLiPadding
                        navDropdown
                        hoverColor={dropdownHoverColor}
                        buttonText="Каталог"
                        buttonProps={{
                            className: classes.navLink,
                            color: "transparent"
                        }}
                        buttonIcon={menuIconsMap["Apps"]}
                        dropdownList={
                            catalogMenuMap.map(item =>
                                <MenuItem itemInfo={item} iconComponent={menuIconsMap[item.iconComponent]}/>
                            )
                        }
                    />
                </ListItem>
                <ListItem className={classes.listItem}>
                    <CustomDropdown
                        noLiPadding
                        navDropdown
                        hoverColor={dropdownHoverColor}
                        buttonText=""
                        buttonProps={{
                            className: classes.navLink,
                            color: "transparent"
                        }}
                        buttonIcon={menuIconsMap["AccountCircle"]}
                        dropdownList={
                            userMenuMap.map(item =>
                                <MenuItem itemInfo={item} iconComponent={menuIconsMap[item.iconComponent]}/>
                            )}
                    />
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                        to="/user/cart"
                        color="transparent"
                        aria-label="Корзина"
                        aria-haspopup="false"
                        onClick={() => this.showNotification("showEmptyCartNotification")}
                    >
                        <ShoppingCart className={classes.icons}/>
                        Корзина
                    </Button>
                    <Snackbar
                        place={notificationPlace}
                        color={notificationColor}
                        icon={Notifications}
                        message="Ваша корзина пуста"
                        open={this.state.showEmptyCartNotification}
                        closeNotification={() => this.setState({showEmptyCartNotification: false})}
                        close
                    />
                </ListItem>
            </List>
        );
    };

    defaultProps = {
        hoverColor: "primary"
    };

    propTypes = {
        dropdownHoverColor: PropTypes.oneOf([
            "dark",
            "primary",
            "info",
            "success",
            "warning",
            "danger",
            "rose"
        ])
    };
}

export default withStyles(menuStyle)(Menu);
