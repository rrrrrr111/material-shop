/* eslint-disable */
import React from "react";

import PropTypes from "prop-types";


import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ShoppingCart from "@material-ui/icons/ShoppingCart";

import CustomDropdown from "lib/components/CustomDropdown/CustomDropdown.jsx";
import Button from "lib/components/CustomButtons/Button.jsx";

import menuStyle from "app/header/menu/menuStyle.jsx";
import catalogMenuMap from "./catalogMenuMap";
import userMenuMap from "./userMenuMap";
import menuIconsMap from "./menuIconsMap";
import MenuItem from "./MenuItem";
import {ALL_COLORS, PRIMARY_COLOR} from "../../common/styles";
import util from "../../utils/util";
import Notify from "../../common/notification/Notify";

class Menu extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            emptyCartNotification: false,
        };
        this.handleShowEmptyCartNotification = this.handleShowEmptyCartNotification.bind(this);
        this.handleCloseEmptyCartNotification = this.handleCloseEmptyCartNotification.bind(this);
    }

    handleShowEmptyCartNotification() {
        util.notify.showNotify(this, "emptyCartNotification");
    }

    handleCloseEmptyCartNotification() {
        util.notify.closeNotify(this, "emptyCartNotification");
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
                        onClick={this.handleShowEmptyCartNotification}
                    >
                        <ShoppingCart className={classes.icons}/>
                        Корзина
                    </Button>
                    <Notify text="Ваша корзина пуста"
                            isOpen={this.state.emptyCartNotification}
                            onClose={this.handleCloseEmptyCartNotification}
                    />
                </ListItem>
            </List>
        );
    };

    static defaultProps = {
        hoverColor: PRIMARY_COLOR
    };

    static propTypes = {
        dropdownHoverColor: PropTypes.oneOf(ALL_COLORS)
    };
}

export default withStyles(menuStyle)(Menu);
