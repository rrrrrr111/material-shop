import withStyles from "@material-ui/core/styles/withStyles";
import Accordion from "app/common/accordion/Accordion.jsx";
import Button from "app/common/button/Button.jsx";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import AppIcon from "app/common/icon/AppIcon";
import Clearfix from "app/common/misc/Clearfix";
import Price from "app/common/misc/Price";
import {accordionActiveColor, buttonColor} from "app/common/style/styles";
import FancyFeed from "app/feed/FancyFeed";
import productStyle from "app/product/productStyle";
import util from "app/utils/util";
import classNames from "classnames";
import React from "react";
import ImageGallery from "react-image-gallery";


class SimpleProduct extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                id: 1,
                images: [
                    {
                        original: "000/000/product1.jpg",
                        thumbnail: "000/000/product1.jpg"
                    },
                    {
                        original: "000/000/product2.jpg",
                        thumbnail: "000/000/product2.jpg"
                    },
                    {
                        original: "000/000/product3.jpg",
                        thumbnail: "000/000/product3.jpg"
                    },
                    {
                        original: "000/000/product3.jpg",
                        thumbnail: "000/000/product3.jpg"
                    },
                    {
                        original: "000/000/product3.jpg",
                        thumbnail: "000/000/product3.jpg"
                    },
                    {
                        original: "000/000/product3.jpg",
                        thumbnail: "000/000/product3.jpg"
                    },
                ],
                link: "/p/spring_jacasdf_asdf_asdf_aket_p-1",
                name: "Жакет JackeSpring ",
                description: "Dolce & Gabbana's 'Greta' лакшери джакет лакшери джакет лакшери джакет лакшери джакет лакшери джакет лакшери джакет ",
                price: 10932
            }
        };
        util.navigate.scrollUp(150);
        this.handleAddToShoppingCart = this.handleAddToShoppingCart.bind(this);
    }

    handleAddToShoppingCart() {
        util.notify.showNotify(this, "addToShoppingCart");
    }

    render() {
        const {classes} = this.props;
        const product = this.state.product;

        return (

            <div className={classes.productPage}>
                <div className={classes.container}>
                    <Clearfix/>
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        <GridContainer>
                            <GridItem md={6} sm={6}>
                                <ImageGallery
                                    lazyLoad={true}
                                    startIndex={0}
                                    autoPlay={false}
                                    showPlayButton={false}
                                    showFullscreenButton={true}
                                    useBrowserFullscreen={false}
                                    showNav={false}
                                    showIndex={false}
                                    showBullets={false}
                                    showThumbnails={true}
                                    infinite={true}
                                    items={util.link.productImgs(product.images)}
                                />
                            </GridItem>
                            <GridItem md={6} sm={6}>
                                <h2 className={classes.title}>{product.name}</h2>
                                <Price className={classes.price} value={product.price}/>
                                <Accordion className={classes.productAccordion}
                                           expandedPanelClassName={classes.productAccordionPanel}
                                           active={0}
                                           activeColor={accordionActiveColor}
                                           collapses={[
                                               {
                                                   title: "Описание",
                                                   content: (
                                                       <p>{product.description}</p>
                                                   )
                                               },
                                               {
                                                   title: "Характеристики",
                                                   content: (
                                                       <p>{product.description}</p>
                                                   )
                                               },
                                               {
                                                   title: "Отзывы",
                                                   content: (
                                                       <p>
                                                           Dolce & Gabbana's 'Greta' лакшери джакет лакшери джакет
                                                           лакшери джакет лакшери джакет лакшери джакет лакшери джакет
                                                           лакшери джакет лакшери джакет лакшери джакет лакшери джакет
                                                           лакшери джакет лакшери джакет лакшери джакет лакшери джакет
                                                           лакшери джакет лакшери джакет лакшери джакет лакшери джакет
                                                           лакшери джакети джакет лакшери джакет лакшери джакет лакшери
                                                           джакет лакшери джакет лакшери джакет лакшери джакет лакшери
                                                           джакет лакшери джакет лакшери джакет лакшери джакет лакшери
                                                           джакет лакшери джакет лакшери джакет лакшери джакет лакшери
                                                           джакет лакшери джакет лакшери джакет лакшери джакети джакет
                                                           лакшери джакет лакшери джакет лакшери джакет лакшери джакет
                                                           лакшери джакет лакшери джакет лакшери джакет лакшери джакет
                                                           лакшери джакет лакшери джакет лакшери джакет лакшери джакет
                                                           лакшери джакет лакшери джакет лакшери джакет лакшери джакет
                                                           лакшери джакет лакшери джакет
                                                       </p>
                                                   )
                                               }
                                           ]}
                                />
                                <GridContainer className={classes.right}>
                                    <Button round color={buttonColor}>
                                        Добавить в корзину &nbsp;
                                        <AppIcon name="add_shopping_cart" className={classes.buttonRightIcon}/>
                                    </Button>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                    </div>

                    <FancyFeed/>
                </div>
            </div>
        );
    }
}

export default withStyles(productStyle)(SimpleProduct);
