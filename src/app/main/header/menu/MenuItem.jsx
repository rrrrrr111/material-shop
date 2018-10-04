import withStyles from "@material-ui/core/styles/withStyles";
import Apps from "@material-ui/icons/Apps";

import AppIcon from "app/common/icon/AppIcon";
import menuStyle from "app/main/header/menu/menuStyle.jsx";
import classNames from "classnames";
import React from "react";
import {Link} from "react-router-dom";

class MenuItem extends React.PureComponent {

    menuIconNames = ["Apps"];
    menuIcons = [Apps];

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