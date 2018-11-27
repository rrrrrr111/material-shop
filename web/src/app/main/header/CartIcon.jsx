import Badge from '@material-ui/core/Badge';
import {mapCartToProps} from "app/cart/reducer";
import AppIcon from "app/common/icon/AppIcon";
import {connect, withStyles} from "app/utils/functionUtil";
import {roseColor} from "lib/assets/jss/material-kit-pro-react";
import React from "react";

const styles = theme => ({
    badge: {
        top: -17,
        right: -12,
        backgroundColor: "white",
        color: roseColor,
        height: 18,
        width: "auto",
        minWidth: 18,
    },
});

const CartIcon = (props) => {

    const {ui, data, classes} = props;
    return (
        <Badge color="primary" badgeContent={data.totalQuantity} classes={{badge: classes.badge}}>
            <AppIcon name="shopping_cart"/>
        </Badge>
    );
};

export default connect(mapCartToProps)(withStyles(styles)(CartIcon));