import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";


import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";


import Notify from "app/common/notify/Notify";
import {ALL_COLORS, PRIMARY_COLOR} from "app/common/styles";

import menuStyle from "app/main/header/menu/menuStyle.jsx";
import util from "app/utils/util";
import Button from "lib/components/CustomButtons/Button.jsx";

import CustomDropdown from "lib/components/CustomDropdown/CustomDropdown.jsx";

import PropTypes from "prop-types";
/* eslint-disable */
import React from "react";
import catalogMenuMap from "./catalogMenuMap";
import MenuItem from "./MenuItem";
import userMenuMap from "./userMenuMap";

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
                        buttonIcon={<AppIcon name="apps"/>}
                        dropdownList={
                            catalogMenuMap.map(item =>
                                <MenuItem itemInfo={item} icon={item.icon}/>
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
                        buttonIcon={<AppIcon name="account_circle"/>}
                        dropdownList={
                            userMenuMap.map(item =>
                                <MenuItem itemInfo={item} icon={item.icon}/>
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
                        <AppIcon name="shopping_cart" className={classes.icons}/>
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
