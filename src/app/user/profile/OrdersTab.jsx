import withStyles from "@material-ui/core/styles/withStyles";
import userProfileStyle from "app/user/profile/userProfileStyle";
import Card from "lib/components/Card/Card.jsx";
import CardBody from "lib/components/Card/CardBody.jsx";
import GridContainer from "lib/components/Grid/GridContainer.jsx";
import GridItem from "lib/components/Grid/GridItem.jsx";
import React from "react";

class OrdersTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.ordersTab}>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>

                        </GridItem>
                    </GridContainer>
                </CardBody>
            </Card>
        );
    }
}

export default withStyles(userProfileStyle)(OrdersTab);
