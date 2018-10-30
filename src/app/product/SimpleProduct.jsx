import withStyles from "@material-ui/core/styles/withStyles";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Button from "app/common/button/Button.jsx";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import Clearfix from "app/common/misc/Clearfix";
import productStyle from "app/product/productStyle";
import util from "app/utils/util";
import classNames from "classnames";
import Accordion from "lib/components/Accordion/Accordion.jsx";
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
                ],
                link: "/p/spring_jacasdf_asdf_asdf_aket_p-1",
                name: "Spring JackeSpring JackeSpring Jacket",
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
        const {images, name} = this.state.product;
        return (

            <div className={classNames(classes.sectionGray, classes.productPage)}>

                <div className={classes.container}>
                    <Clearfix/>
                    <div className={classNames(classes.main, classes.mainRaised)}>

                        <GridContainer>
                            <GridItem md={6} sm={6}>
                                <ImageGallery
                                    showFullscreenButton={false}
                                    showPlayButton={false}
                                    startIndex={3}
                                    items={util.link.productImgs(images)}
                                />
                            </GridItem>
                            <GridItem md={6} sm={6}>
                                <h2 className={classes.title}>{name}</h2>
                                <h3 className={classes.mainPrice}>$335</h3>
                                <Accordion
                                    active={0}
                                    activeColor="rose"
                                    collapses={[
                                        {
                                            title: "Description",
                                            content: (
                                                <p>
                                                    Eres' daring 'Grigri Fortune' swimsuit has the fit
                                                    and coverage of a bikini in a one-piece silhouette.
                                                    This fuchsia style is crafted from the label's
                                                    sculpting peau douce fabric and has flattering
                                                    cutouts through the torso and back. Wear yours with
                                                    mirrored sunglasses on vacation.
                                                </p>
                                            )
                                        },
                                        {
                                            title: "Designer Information",
                                            content: (
                                                <p>
                                                    An infusion of West Coast cool and New York
                                                    attitude, Rebecca Minkoff is synonymous with It girl
                                                    style. Minkoff burst on the fashion scene with her
                                                    best-selling 'Morning After Bag' and later expanded
                                                    her offering with the Rebecca Minkoff Collection - a
                                                    range of luxe city staples with a \"downtown
                                                    romantic\" theme.
                                                </p>
                                            )
                                        },
                                        {
                                            title: "Details and Care",
                                            content: (
                                                <ul>
                                                    <li>
                                                        Storm and midnight-blue stretch cotton-blend
                                                    </li>
                                                    <li>
                                                        Notch lapels, functioning buttoned cuffs, two
                                                        front flap pockets, single vent, internal pocket
                                                    </li>
                                                    <li>Two button fastening</li>
                                                    <li>84% cotton, 14% nylon, 2% elastane</li>
                                                    <li>Dry clean</li>
                                                </ul>
                                            )
                                        }
                                    ]}
                                />
                                <GridContainer className={classes.pullRight}>
                                    <Button round color="rose">
                                        Add to Cart &nbsp; <ShoppingCart/>
                                    </Button>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(productStyle)(SimpleProduct);
