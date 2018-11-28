import withStyles from "@material-ui/core/styles/withStyles";
import Button from "app/common/button/Button";
import Card from "app/common/card/Card";
import CardBody from "app/common/card/CardBody";
import CardFooter from "app/common/card/CardFooter";
import CardHeader from "app/common/card/CardHeader";
import AppIcon from "app/common/icon/AppIcon";
import LocalLink from "app/common/misc/LocalLink";
import Price from "app/common/misc/Price";
import {iconButtonColor} from "app/common/style/styleConsts";
import AppTooltip from "app/common/tooltip/AppTooltip";
import fancyFeedStyle from "app/feed/fancy/fancyFeedStyle";
import util from "app/utils/util";
import classNames from "classnames";
import React from "react";


class FancyProductCard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleAddToShoppingCart = this.handleAddToShoppingCart.bind(this);
    }

    handleAddToShoppingCart() {
        util.notify.addToCart();
    }

    render() {
        const {classes, product} = this.props;
        return (
            <Card product>
                <CardHeader image>
                    <LocalLink to={util.link.productLink(product.link)}>
                        <img src={util.link.productImg(product.image)} alt={product.name}/>
                    </LocalLink>
                </CardHeader>
                <CardBody>
                    <h6
                        className={classNames(
                            classes.cardCategory,
                            classes.textRose
                        )}
                    >
                        В тренде
                    </h6>
                    <LocalLink to={util.link.productLink(product.link)}>
                        <h4 className={classes.cardTitle}>{product.name}</h4>
                    </LocalLink>
                    <div className={classes.cardDescription}>
                        {product.description}
                    </div>
                </CardBody>
                <CardFooter className={classes.justifyContentBetween}>
                    <div className={classes.price}>
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

export default withStyles(fancyFeedStyle)(FancyProductCard);
