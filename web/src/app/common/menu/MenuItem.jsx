import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";
import dropdownStyle from "app/common/menu/dropdownStyle";
import LocalLink from "app/common/misc/LocalLink";
import React from "react";

const MenuItem = (props) => {

    const {itemInfo, classes} = props;
    return (
        <LocalLink to={itemInfo.to} className={classes.dropdownLink}>
            <AppIcon name={itemInfo.icon} className={classes.dropdownIcons}/>
            {itemInfo.name}
        </LocalLink>
    );
};

export default withStyles(dropdownStyle)(MenuItem);