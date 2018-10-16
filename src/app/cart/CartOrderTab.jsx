import withStyles from "@material-ui/core/styles/withStyles";
import userCartStyle from "app/cart/userCartStyle";
import Card from "lib/components/Card/Card.jsx";
import CardBody from "lib/components/Card/CardBody.jsx";
import React from "react";

class CartOrderTab extends React.PureComponent {

    render() {
        const {classes} = this.props;
        return (
            <Card>
                <CardBody>
                </CardBody>
            </Card>
        );
    }
}

export default withStyles(userCartStyle)(CartOrderTab);
