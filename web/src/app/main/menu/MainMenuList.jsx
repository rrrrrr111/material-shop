import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";
import {ALL_COLOR_KEYS, PRIMARY_COLOR_KEY} from "app/common/style/styleConsts";
import MenuDropdown from "app/common/theme/menu/MenuDropdown.jsx";
import CartButton from "app/main/menu/CartButton";
import mainMenuListStyle from "app/main/menu/mainMenuListStyle.jsx";
import MenuDataLoader from "app/main/menu/MenuDataLoader";
import UserButton from "app/main/menu/UserButton";
import {classNames} from "app/utils/functionUtil";
import PropTypes from "prop-types";
import React from "react";
import {withRouter} from "react-router";

const MainMenuList = (props) => {

    const {classes, dropdownHoverColor, menuData, menuUi} = props,
        rootItem = menuData.getById("catalogRoot"),
        menuItems = rootItem ? rootItem.childs : [];

    return (
        <List className={classNames({
            [classes.list]: true,
            [classes.mlAuto]: true
        })}>
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
                    dropdownList={menuItems}
                />
            </ListItem>
            <ListItem className={classes.listItem}>
                <UserButton menuData={menuData} menuUi={menuUi}/>
            </ListItem>
            <ListItem className={classes.listItem}>
                <CartButton/>
            </ListItem>
        </List>
    )
};

MainMenuList.defaultProps = {
    dropdownHoverColor: PRIMARY_COLOR_KEY
};

MainMenuList.propTypes = {
    dropdownHoverColor: PropTypes.oneOf(ALL_COLOR_KEYS)
};

const MainMenuListWithMenuLoader = (props) => (
    <MenuDataLoader>
        <MainMenuList {...props}/>
    </MenuDataLoader>
);

export default withStyles(mainMenuListStyle)(withRouter(MainMenuListWithMenuLoader));