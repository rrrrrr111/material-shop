import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Favorite from "@material-ui/icons/Favorite";
import Button from "app/common/button/Button.jsx";
import Card from "app/common/card/Card";
import CardBody from "app/common/card/CardBody";
import CardFooter from "app/common/card/CardFooter";
import CardHeader from "app/common/card/CardHeader";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import simpleFeedStyle from "app/feed/simpleFeedStyle";
import util from "app/utils/util";
import classNames from "classnames";
import fill from "lodash/fill";
import React from "react";


class FancyFeed extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            products: fill(Array(12), {
                id: 1,
                image: "000/000/product2.jpg",
                link: "/p/spring_jacasdf_asdf_asdf_aket_p-1",
                name: "Spring JackeSpring JackeSpring Jacket",
                price: 1093232
            }, 0, 12)
        };
        this.handleAddToShoppingCart = this.handleAddToShoppingCart.bind(this);
    }

    handleAddToShoppingCart() {
        util.notify.showNotify(this, "addToShoppingCart");
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classNames(classes.section, classes.sectionGray)}>
                <div className={classes.container}>
                    <div className={classes.relatedProducts}>
                        <h3 className={classNames(classes.title, classes.textCenter)}>
                            You may also be interested in:
                        </h3>
                        <GridContainer>
                            <GridItem sm={6} md={3}>
                                <Card product>
                                    <CardHeader image>
                                        <a href="#pablo">
                                            <img src={cardProduct1} alt="cardProduct"/>
                                        </a>
                                    </CardHeader>
                                    <CardBody>
                                        <h6
                                            className={classNames(
                                                classes.cardCategory,
                                                classes.textRose
                                            )}
                                        >
                                            Trending
                                        </h6>
                                        <h4 className={classes.cardTitle}>Dolce & Gabbana</h4>
                                        <div className={classes.cardDescription}>
                                            Dolce & Gabbana's 'Greta' tote has been crafted in Italy
                                            from hard-wearing red textured-leather.
                                        </div>
                                    </CardBody>
                                    <CardFooter className={classes.justifyContentBetween}>
                                        <div className={classes.price}>
                                            <h4>$1,459</h4>
                                        </div>
                                        <div className={classes.stats}>
                                            <Tooltip
                                                id="tooltip-top"
                                                title="Save to Wishlist"
                                                placement="top"
                                                classes={{tooltip: classes.tooltip}}
                                            >
                                                <Button justIcon color="rose" simple>
                                                    <Favorite/>
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                            <GridItem sm={6} md={3}>
                                <Card product>
                                    <CardHeader image>
                                        <a href="#pablo">
                                            <img src={cardProduct3} alt="cardProduct3"/>
                                        </a>
                                    </CardHeader>
                                    <CardBody>
                                        <h6 className={classes.cardCategory}>Popular</h6>
                                        <h4 className={classes.cardTitle}>Balmain</h4>
                                        <div className={classes.cardDescription}>
                                            Balmain's mid-rise skinny jeans are cut with stretch to
                                            ensure they retain their second-skin fit but move
                                            comfortably.
                                        </div>
                                    </CardBody>
                                    <CardFooter className={classes.justifyContentBetween}>
                                        <div className={classes.price}>
                                            <h4>$459</h4>
                                        </div>
                                        <div className={classes.stats}>
                                            <Tooltip
                                                id="tooltip-top"
                                                title="Save to Wishlist"
                                                placement="top"
                                                classes={{tooltip: classes.tooltip}}
                                            >
                                                <Button justIcon link>
                                                    <Favorite/>
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                            <GridItem sm={6} md={3}>
                                <Card product>
                                    <CardHeader image>
                                        <a href="#pablo">
                                            <img src={cardProduct4} alt="cardProduct4"/>
                                        </a>
                                    </CardHeader>
                                    <CardBody>
                                        <h6 className={classes.cardCategory}>Popular</h6>
                                        <h4 className={classes.cardTitle}>Balenciaga</h4>
                                        <div className={classes.cardDescription}>
                                            Balenciaga's black textured-leather wallet is finished
                                            with the label's iconic 'Giant' studs. This is where you
                                            can...
                                        </div>
                                    </CardBody>
                                    <CardFooter className={classes.justifyContentBetween}>
                                        <div className={classes.price}>
                                            <h4>$590</h4>
                                        </div>
                                        <div className={classes.stats}>
                                            <Tooltip
                                                id="tooltip-top"
                                                title="Save to Wishlist"
                                                placement="top"
                                                classes={{tooltip: classes.tooltip}}
                                            >
                                                <Button justIcon color="rose" simple>
                                                    <Favorite/>
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                            <GridItem sm={6} md={3}>
                                <Card product>
                                    <CardHeader image>
                                        <a href="#pablo">
                                            <img src={cardProduct2} alt="cardProduct2"/>
                                        </a>
                                    </CardHeader>
                                    <CardBody>
                                        <h6
                                            className={classNames(
                                                classes.cardCategory,
                                                classes.textRose
                                            )}
                                        >
                                            Trending
                                        </h6>
                                        <h4 className={classes.cardTitle}>Dolce & Gabbana</h4>
                                        <div className={classes.cardDescription}>
                                            Dolce & Gabbana's 'Greta' tote has been crafted in Italy
                                            from hard-wearing red textured-leather.
                                        </div>
                                    </CardBody>
                                    <CardFooter className={classes.justifyContentBetween}>
                                        <div className={classes.price}>
                                            <h4>$1,459</h4>
                                        </div>
                                        <div className={classes.stats}>
                                            <Tooltip
                                                id="tooltip-top"
                                                title="Save to Wishlist"
                                                placement="top"
                                                classes={{tooltip: classes.tooltip}}
                                            >
                                                <Button justIcon link>
                                                    <Favorite/>
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(simpleFeedStyle)(FancyFeed);
