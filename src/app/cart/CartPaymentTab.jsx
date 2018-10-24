import withStyles from "@material-ui/core/styles/withStyles";
import userCartStyle from "app/cart/userCartStyle";
import Card from "app/common/card/Card.jsx";
import CardBody from "app/common/card/CardBody.jsx";
import React from "react";

class CartPaymentTab extends React.PureComponent {

    render() {
        //const {classes} = this.props;
        return (
            <Card>
                <CardBody>
                </CardBody>
            </Card>
        );
    }
}

export default withStyles(userCartStyle)(CartPaymentTab);
