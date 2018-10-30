import withStyles from "@material-ui/core/styles/withStyles";
import feedStyle from "app/feed/feedStyle";
import util from "app/utils/util";
import React from "react";


class SimpleProduct extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                id: 1,
                image: "000/000/product2.jpg",
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
        return (

        );
    }
}

export default withStyles(feedStyle)(SimpleProduct);
