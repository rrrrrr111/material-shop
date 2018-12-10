import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";
import LocalLink from "app/common/misc/LocalLink";
import dropdownStyle from "app/common/theme/menu/dropdownStyle";
import PropTypes from "prop-types";
import React from "react";

const MenuItemContent = (props) => {

    const {itemInfo, classes} = props;
    return (
        itemInfo.to ?
            <LocalLink to={itemInfo.to} className={classes.dropdownLink}>
                <AppIcon name={itemInfo.icon} className={classes.dropdownIcons}/>
                {itemInfo.name}
            </LocalLink>
            : (
                <span>
                    <AppIcon name={itemInfo.icon} className={classes.dropdownIcons}/>
                    {itemInfo.name}
                </span>
            )
    );
};


MenuItemContent.propTypes = {
    classes: PropTypes.object.isRequired,
    itemInfo: PropTypes.shape({
        to: PropTypes.string,
        icon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        name: PropTypes.string
    }),
};

export default withStyles(dropdownStyle)(MenuItemContent);