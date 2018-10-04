import withStyles from "@material-ui/core/styles/withStyles";

import AccountCircle from "@material-ui/icons/AccountCircle";
import Apps from "@material-ui/icons/Apps";
import Face from "@material-ui/icons/Face";
import Fingerprint from "@material-ui/icons/Fingerprint";
import History from "@material-ui/icons/History";
import SettingsApplications from "@material-ui/icons/SettingsApplications";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

import AppIcon from "app/common/icon/AppIcon";
import menuStyle from "app/main/header/menu/menuStyle.jsx";
import classNames from "classnames";
import React from "react";
import {Link} from "react-router-dom";

class MenuItem extends React.PureComponent {

    menuIconNames = ["Apps", "ShoppingCart", "AccountCircle", "Face", "Fingerprint", "SettingsApplications", "History"];
    menuIcons = [Apps, ShoppingCart, AccountCircle, Face, Fingerprint, SettingsApplications, History];

    checkComponent(name) {
        const i = this.menuIconNames.indexOf(name);
        if (i > -1) {
            return this.menuIcons[i];
        }
        return name;
    }

    render() {
        const {itemInfo, classes} = this.props;
        return (
            <Link to={itemInfo.to} className={classes.dropdownLink}>
                <AppIcon name={this.checkComponent(itemInfo.icon)}
                         className={classNames(classes.icon, classes.dropdownIcons)}/>
                {itemInfo.name}
            </Link>
        );
    }
}

export default withStyles(menuStyle)(MenuItem);