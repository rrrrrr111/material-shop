import Badge from '@material-ui/core/Badge';
import Zoom from "@material-ui/core/Zoom/Zoom";
import {mapCartToProps} from "app/cart/reducer";
import AppIcon from "app/common/icon/AppIcon";
import {roseColor} from "app/common/style/styleConsts";
import MenuButton from "app/common/theme/menu/MenuButton";
import mainMenuListStyle from "app/main/menu/mainMenuListStyle";
import {connect, NumberFormat, withStyles} from "app/utils/functionUtil";
import util from "app/utils/util";
import React from "react";

const styles = theme => ({
    rootMenuItemButton: mainMenuListStyle(theme).rootMenuItemButton,
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
    amount: {
        fontSize: "12px",
        padding: "5px 0 0 5px",
        textTransform: "initial",
    }
});

class CartButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleClickCart = this.handleClickCart.bind(this);
    }

    handleClickCart() {
        if (this.isCartEmpty()) {
            util.notify.cartEmpty();
            return;
        }
        util.navigate.goToUrl("/cart/goods");
    }

    isCartEmpty() {
        return this.props.data.order.goodsQuantity === 0;
    }

    render = () => {
        const {classes} = this.props;
        const {
            goodsQuantity, goodsAmount
        } = this.props.data.order;


        let icon;
        let amount;
        if (this.isCartEmpty()) {
            icon = <AppIcon name="shopping_cart"/>;
            amount = null;
        } else {
            icon = (
                <Badge color="primary" badgeContent={goodsQuantity} classes={{badge: classes.badge}}>
                    <AppIcon name="shopping_cart"/>
                </Badge>);
            amount = (
                <span className={classes.amount}>
                    <NumberFormat displayType='text' thousandSeparator=' '
                                  value={goodsAmount}/>р
                </span>
            );
        }
        return (
            <Zoom in={true} timeout={1000}>
                <div>
                    <MenuButton
                        buttonProps={{className: classes.rootMenuItemButton, color: "transparent"}}
                        buttonText={amount}
                        buttonIcon={icon}
                        caret={false}
                        onClick={this.handleClickCart}
                    />
                </div>
            </Zoom>
        );
    };
}

export default connect(mapCartToProps)(withStyles(styles)(CartButton));