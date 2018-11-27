import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "app/common/button/Button.jsx";
import MenuDropdown from "app/common/dropdown/MenuDropdown.jsx";
import AppIcon from "app/common/icon/AppIcon";
import {ALL_COLORS, PRIMARY_COLOR} from "app/common/style/styles";
import menuStyle from "app/main/header/menu/menuStyle.jsx";
import util from "app/utils/util";
import PropTypes from "prop-types";
import React from "react";
import {withRouter} from "react-router";
import MenuItem from "./MenuItem";

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

    catalogMenuMap = [
        {id: 0, name: "Презентация", to: "/", icon: null},
        {id: 1, name: "Дазайн", to: "/design", icon: "apps"},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle"},
        {id: 3, name: "Еще более длинное наименование меню", to: "/very-long", icon: "fingerprint"},
        {
            id: 4, name: "Совсем, совсем при совсем, очень длинное придлинное наименование " +
                "меню, трали вали трали вали трали вали вали валилилилилии",
            to: "/very-very-very-loooooong",
            icon: "shopping_cart"
        },
    ];

    userMenuMap = [
        {id: 0, name: "Профиль пользователя", to: "/user/profile", icon: "face"},
        {id: 2, name: "История заказов", to: "/user/orders", icon: "history"},
        {id: 3, name: "Настройки", to: "/user/settings", icon: "settings"},
        {id: 4, name: "Смена пароля", to: "/user/password", icon: "fingerprint"},
        {id: 5, name: "Выход", to: "/auth/signout", icon: "fas fa-sign-out-alt"},
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
                        dropdownList={
                            this.catalogMenuMap.map(item =>
                                <MenuItem itemInfo={item} icon={item.icon}/>
                            )
                        }
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
                        buttonIcon={<AppIcon name="shopping_cart"/>}
                        dropdownList={
                            this.userMenuMap.map(item =>
                                <MenuItem itemInfo={item} icon={item.icon}/>
                            )}
                    />
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                        color="transparent"
                        className={classes.rootMenuItemButton}
                        aria-label="Корзина"
                        aria-haspopup="false"
                        onClick={this.handleClickCart}
                    >
                        <AppIcon name="shopping_cart"/>
                        Корзина
                    </Button>
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
