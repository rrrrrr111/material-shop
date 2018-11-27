import withStyles from "@material-ui/core/styles/withStyles";
import menuItemStyle from "app/common/menu/menuItemStyle";
import AppIcon from "app/common/icon/AppIcon";
import LocalLink from "app/common/misc/LocalLink";
import React from "react";

class MenuItem extends React.PureComponent {

    render() {
        const {itemInfo, classes} = this.props;
        return (
            <LocalLink to={itemInfo.to} className={classes.dropdownLink}>
                <AppIcon name={itemInfo.icon} className={classes.dropdownIcons}/>
                {itemInfo.name}
            </LocalLink>
        );
    }
}

export default withStyles(menuItemStyle)(MenuItem);