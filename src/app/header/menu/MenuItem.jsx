/* eslint-disable */
import classNames from "classnames";
import React from "react";
import {Link} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";


import menuStyle from "app/header/menu/menuStyle.jsx";
import Icon from "@material-ui/core/Icon/Icon";

class MenuItem extends React.PureComponent {

    determineIcon() {
        const {itemInfo, classes, iconComponent} = this.props;

        if (iconComponent) {// as Component
            return (
                <this.props.iconComponent className={classes.dropdownIcons}/>
            );

        } else if (itemInfo.iconName) {

            if (itemInfo.iconName.indexOf(" fa-") > 0) { // as Font Awesome https://fontawesome.com/icons
                const parts = itemInfo.iconName.split(' ');

                return ( // fas fa-.../fab fa-.../fal fa-.../far fa-...
                    <i className={classNames(parts[0], parts[1], classes.icon, classes.dropdownIcons)}/>
                );
            } else { // as Material UI icon https://material.io/tools/icons
                return (
                    <Icon className={classNames(classes.icon, classes.dropdownIcons)}>
                        {itemInfo.iconName}
                    </Icon>
                )
            }
        }
        return null;
    }

    render() {
        const {itemInfo, classes} = this.props;
        return (
            <Link to={itemInfo.to} className={classes.dropdownLink}>
                {this.determineIcon()}
                {itemInfo.name}
            </Link>
        );
    }
}

export default withStyles(menuStyle)(MenuItem);