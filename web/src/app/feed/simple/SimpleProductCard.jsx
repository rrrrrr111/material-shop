import withStyles from "@material-ui/core/styles/withStyles";
import Button from "app/common/button/Button";
import Card from "app/common/card/Card";
import CardBody from "app/common/card/CardBody";
import CardFooter from "app/common/card/CardFooter";
import CardHeader from "app/common/card/CardHeader";
import AppIcon from "app/common/icon/AppIcon";
import LocalLink from "app/common/misc/LocalLink";
import Price from "app/common/misc/Price";
import {iconButtonColor} from "app/common/style/styles";
import AppTooltip from "app/common/tooltip/AppTooltip";
import simpleFeedStyle from "app/feed/simple/simpleFeedStyle";
import util from "app/utils/util";
import classNames from "classnames";
import React from "react";


class SimpleProductCard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleAddToShoppingCart = this.handleAddToShoppingCart.bind(this);
    }

    handleAddToShoppingCart() {
        util.notify.showNotify(this, "addToShoppingCart");
    }

    render() {
        const {classes, product} = this.props;
        return (
            <Card plain className={classes.productCard}>
                <CardHeader noShadow image className={classes.productHeader}>
                    <LocalLink to={product.link}>
                        <img src={util.link.productImg(product.image)} alt={product.name}/>
                    </LocalLink>
                </CardHeader>
                <CardBody className={classes.productBody}>
                    <LocalLink to={product.link}>
                        <h4 className={classes.productTitle}>{product.name}</h4>
                    </LocalLink>
                </CardBody>
                <CardFooter plain className={classes.justifyContentBetween}>
                    <div className={classes.priceContainer}>
                        <Price value={product.price}/>
                    </div>
                    <div className={classNames(classes.stats, classes.right)}>
                        <AppTooltip title="Добавить в корзину"
                                    placement="top" arrow>
                            <Button justIcon simple round onClick={this.handleAddToShoppingCart}
                                    color={iconButtonColor}>
                                <AppIcon name="add_shopping_cart"/>
                            </Button>
                        </AppTooltip>
                    </div>
                </CardFooter>
            </Card>
        );
    }
}

export default withStyles(simpleFeedStyle)(SimpleProductCard);
