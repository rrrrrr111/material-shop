import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";
import dropdownStyle from "app/common/menu/dropdownStyle";
import LocalLink from "app/common/misc/LocalLink";
import PropTypes from "prop-types";
import React from "react";

const MenuItemContent = (props) => {

    const {itemInfo, classes} = props;
    return (
        itemInfo.link ?
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
        name: PropTypes.string,
        link: PropTypes.bool
    }),
};

export default withStyles(dropdownStyle)(MenuItemContent);