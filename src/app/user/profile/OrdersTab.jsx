import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";
import userProfileStyle from "app/user/profile/userProfileStyle";
import Card from "lib/components/Card/Card.jsx";
import CardBody from "lib/components/Card/CardBody.jsx";
import Button from "lib/components/CustomButtons/Button";
import Table from "lib/components/Table/Table";
import React from "react";

class OrdersTab extends React.Component {
    constructor(props) {
        super(props);
    }

    rowActionButtons = [
        {color: "primary"},
    ].map((prop, key) => {
        return (
            <Button simple justIcon size="sm" color={prop.color} key={key}>
                {/*<Icon name={AddShoppingCart}/>*/}
                {/*<Icon name="fas fa-cart-plus"/>*/}
                <AppIcon name="add_shopping_cart"/>
            </Button>
        );
    });

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.ordersTab}>
                <CardBody>
                    <Table
                        tableHead={[
                            "#", "Name", "Job Position", "Since", "Salary", "Actions"
                        ]}
                        tableData={[
                            ["1", "Andrew Mike", "Develop", "2013", "99,00", this.rowActionButtons],
                            ["2", "John Doe", "Design", "2012", "89,001", this.rowActionButtons],
                            ["3", "Alex Mike", "Design", "2010", "92,00", this.rowActionButtons],
                            ["4", "Mike Monday", "Marketing", "2013", "49,00", this.rowActionButtons],
                            ["5", "Paul Dickens", "Communication", "2015", "69,00", this.rowActionButtons]
                        ]}
                        customCellClasses={[classes.textCenter, classes.textRight, classes.textRight]}
                        customClassesForCells={[0, 4, 5]}
                        customHeadCellClasses={[classes.textCenter, classes.textRight, classes.textRight]}
                        customHeadClassesForCells={[0, 4, 5]}
                    />
                </CardBody>
            </Card>
        );
    }
}

export default withStyles(userProfileStyle)(OrdersTab);
