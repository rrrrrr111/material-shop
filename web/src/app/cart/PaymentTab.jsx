import withStyles from "@material-ui/core/styles/withStyles";
import userCartStyle from "app/cart/userCartStyle";
import Card from "app/common/theme/card/Card.jsx";
import CardBody from "app/common/theme/card/CardBody.jsx";
import React from "react";

class PaymentTab extends React.PureComponent {

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

export default withStyles(userCartStyle)(PaymentTab);
