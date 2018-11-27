import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";
import MenuButton from "app/common/menu/MenuButton";
import MenuDropdown from "app/common/menu/MenuDropdown.jsx";
import {ALL_COLORS, PRIMARY_COLOR} from "app/common/style/styles";
import CartIcon from "app/main/header/CartIcon";
import menuStyle from "app/main/header/menuStyle.jsx";
import util from "app/utils/util";
import PropTypes from "prop-types";
import React from "react";
import {withRouter} from "react-router";

class MainMenu extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            emptyCartNotification: false,
        };
        this.handleClickCart = this.handleClickCart.bind(this);
    }

    handleClickCart() {
        util.navigate.goToUrl("/cart/goods");
    }

    catalogMenuItems = [
        {id: 0, name: "Презентация", to: "/", icon: null, link: true},
        {id: 1, name: "Дазайн", to: "/design", icon: "apps", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 3, name: "Еще более длинное наименование меню", to: "/very-long", icon: "fingerprint", link: true},
        {
            id: 4, name: "Совсем, совсем при совсем, очень длинное придлинное наименование " +
                "меню, трали вали трали вали трали вали вали валилилилилии",
            to: "/very-very-very-loooooong",
            icon: "shopping_cart", link: true
        },
    ];

    userMenuItems = [
        {id: 0, name: "Профиль пользователя", to: "/user/profile", icon: "face", link: true},
        {id: 2, name: "История заказов", to: "/user/orders", icon: "history", link: true},
        {id: 3, name: "Настройки", to: "/user/settings", icon: "settings", link: true},
        {id: 4, name: "Смена пароля", to: "/user/password", icon: "fingerprint", link: true},
        {id: 5, name: "Выход", to: "/auth/signout", icon: "fas fa-sign-out-alt", link: true},
    ];

    render = () => {
        const {classes, dropdownHoverColor} = this.props;

        return (
            <List className={classes.list + " " + classes.mlAuto}>
                <ListItem className={classes.listItem}>
                    <MenuDropdown
                        noLiPadding
                        navDropdown
                        hoverColor={dropdownHoverColor}
                        buttonText="Каталог"
                        buttonProps={{
                            className: classes.rootMenuItemButton,
                            color: "transparent"
                        }}
                        buttonIcon={<AppIcon name="apps"/>}
                        dropdownList={this.catalogMenuItems}
                    />
                </ListItem>
                <ListItem className={classes.listItem}>
                    <MenuDropdown
                        noLiPadding
                        navDropdown
                        hoverColor={dropdownHoverColor}
                        buttonProps={{
                            className: classes.rootMenuItemButton,
                            color: "transparent"
                        }}
                        buttonIcon={<AppIcon name="account_circle"/>}
                        dropdownList={this.userMenuItems}
                    />
                </ListItem>
                <ListItem className={classes.listItem}>
                    <MenuButton
                        buttonProps={{
                            className: classes.rootMenuItemButton,
                            color: "transparent"
                        }}
                        buttonIcon={<CartIcon/>}
                        caret={false}
                        onClick={this.handleClickCart}
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

export default withStyles(menuStyle)(withRouter(MainMenu));
