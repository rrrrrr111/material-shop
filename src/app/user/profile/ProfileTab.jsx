import withStyles from "@material-ui/core/styles/withStyles";
import {buttonColor} from "app/common/styles";
import userProfileStyle from "app/user/profile/userProfileStyle";
import Card from "lib/components/Card/Card.jsx";
import CardBody from "lib/components/Card/CardBody.jsx";
import CardFooter from "lib/components/Card/CardFooter.jsx";
import Button from "lib/components/CustomButtons/Button.jsx";
import CustomInput from "lib/components/CustomInput/CustomInput.jsx";
import GridContainer from "lib/components/Grid/GridContainer.jsx";
import GridItem from "lib/components/Grid/GridItem.jsx";
import React from "react";

class ProfileTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.profileTab}>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Имя"
                                id="first-name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    autoComplete: "on",
                                    name: "First name",
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Фамилия"
                                id="last-name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    autoComplete: "on",
                                    name: "Last name",
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Телефон"
                                id="phone"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    autoComplete: "on",
                                    name: "Phone",
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Email"
                                id="email"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    autoComplete: "on",
                                    name: "Email",
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                </CardBody>
                <CardFooter>
                    <div className={classes.width100}>
                        <Button color={buttonColor} className={classes.cardFooterRightButton}>
                            Обновить профиль
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        );
    }
}

export default withStyles(userProfileStyle)(ProfileTab);
