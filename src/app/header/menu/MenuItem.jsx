/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
// react components for routing our app without refresh
import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import menuStyle from "app/header/menu/menuStyle.jsx";

class MenuItem extends React.PureComponent {
    render() {
        const {itemInfo, classes} = this.props;
        return (
            <Link to={itemInfo.to} className={classes.dropdownLink}>
                {this.props.iconComponent ? <this.props.iconComponent className={classes.dropdownIcons}/> : null}
                {itemInfo.name}
            </Link>
        );
    }
}

export default withStyles(menuStyle)(MenuItem);
