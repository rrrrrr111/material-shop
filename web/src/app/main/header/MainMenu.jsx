import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";
import {ALL_COLOR_KEYS, PRIMARY_COLOR_KEY} from "app/common/style/styleConsts";
import MenuDropdown from "app/common/theme/menu/MenuDropdown.jsx";
import CartButton from "app/main/header/CartButton";
import menuStyle from "app/main/header/menuStyle.jsx";
import UserButton from "app/main/header/UserButton";
import PropTypes from "prop-types";
import React from "react";
import {withRouter} from "react-router";

class MainMenu extends React.PureComponent {

    static catalogMenuItems = [
        {id: 0, name: "Презентация", to: "/", icon: null, link: true},
        {id: 1, name: "Дазайн", to: "/design", icon: "apps", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 2, name: "Длинное наименовение меню", to: "/long", icon: "account_circle", link: true},
        {id: 3, name: "Еще более длинное наименование меню", to: "/very-long", icon: "fingerprint", link: true},
        {
            id: 4, name: "Совсем, совсем при совсем, очень длинное придлинное наименование " +
                "меню, трали вали трали вали трали вали вали валилилилилии",
            to: "/very-very-very-loooooong",
            icon: "shopping_cart", link: true
        },
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
                        dropdownList={MainMenu.catalogMenuItems}
                    />
                </ListItem>
                <ListItem className={classes.listItem}>
                    <UserButton/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <CartButton/>
                </ListItem>
            </List>
        );
    };

    static defaultProps = {
        dropdownHoverColor: PRIMARY_COLOR_KEY
    };

    static propTypes = {
        dropdownHoverColor: PropTypes.oneOf(ALL_COLOR_KEYS)
    };
}

export default withStyles(menuStyle)(withRouter(MainMenu));
