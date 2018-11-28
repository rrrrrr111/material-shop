import Badge from '@material-ui/core/Badge';
import {mapCartToProps} from "app/cart/reducer";
import AppIcon from "app/common/icon/AppIcon";
import {roseColor} from "app/common/style/styleConsts";
import {connect, withStyles} from "app/utils/functionUtil";
import React from "react";

const styles = theme => ({
    badge: {
        top: -14,
        right: -8,
        backgroundColor: "white",
        color: roseColor,
        fontSize: "10px",
        height: 14,
        width: "auto",
        minWidth: 14,
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