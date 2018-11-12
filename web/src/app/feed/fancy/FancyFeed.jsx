import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import fancyFeedStyle from "app/feed/fancy/fancyFeedStyle";
import FancyProductCard from "app/feed/fancy/FancyProductCard";
import util from "app/utils/util";
import classNames from "classnames";
import fill from "lodash/fill";
import React from "react";


class FancyFeed extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            products: fill(Array(4), {
                id: 1,
                image: "000/000[2:jpg, 3]",
                link: "spring_jacasdf_asdf_asdf_aket_p-1",
                name: "Spring JackeSpring JackeSpring Jacket",
                price: 1093232
            }, 0, 4)
        };
        this.handleAddToShoppingCart = this.handleAddToShoppingCart.bind(this);
    }

    handleAddToShoppingCart() {
        util.notify.showNotify(this, "addToShoppingCart");
    }

    render() {
        const {classes} = this.props;

        return (

            <div className={classes.relatedProducts}>
                <h3 className={classNames(classes.title, classes.textCenter)}>
                    Вам также могут быть интересны:
                </h3>
                <GridContainer>
                    {this.state.products.map((product, index) => {
                        return (
                            <GridItem sm={6} md={3} key={index}>
                                <FancyProductCard product={product}/>
                            </GridItem>
                        );
                    })}
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(fancyFeedStyle)(FancyFeed);
