import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "app/common/grid/GridContainer";
import feedStyle from "app/feed/feedStyle.jsx";
import ProductCard from "app/feed/ProductCard";
import util from "app/utils/util";
import classNames from 'classnames';
import fill from 'lodash/fill';
import React from "react";

class Feed extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            products: fill(Array(12), {
                id: 1,
                image: "000/000/product2.jpg",
                link: "/p/spring_jacasdf_asdf_asdf_aket_p-1",
                name: "Spring Jacket",
                price: 1093232
            }, 0, 12)
        };
        util.navigate.scrollUp(150);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classNames(classes.main, classes.mainRaised)}>
                <GridContainer spacing={16}>
                    {this.state.products.map((product, index) => {
                        return (
                            <Grid item xs={2} key={index}>
                                <ProductCard product={product}/>
                            </Grid>
                        );
                    })}
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(feedStyle)(Feed);
