import withStyles from "@material-ui/core/styles/withStyles";
import Button from "app/common/button/Button.jsx";
import CustomInput from "app/common/input/CustomInput.jsx";
import {buttonColor} from "app/common/styles";
import userProfileStyle from "app/user/profile/userProfileStyle";
import Card from "lib/components/Card/Card.jsx";
import CardBody from "lib/components/Card/CardBody.jsx";
import CardFooter from "lib/components/Card/CardFooter.jsx";
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
                                id="first-name"
                                labelText="Имя"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    autoComplete: "on",
                                    name: "First name",
                                }}
                                otherProps={{
                                    maxLength: 100,
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                id="last-name"
                                labelText="Фамилия"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    autoComplete: "on",
                                    name: "Last name",
                                }}
                                otherProps={{
                                    maxLength: 100,
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                id="phone"
                                labelText="Телефон"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    autoComplete: "on",
                                    name: "Phone",
                                }}
                                numberProps={{
                                    format: "+7 (###) ###-####",
                                    mask: "_",
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                id="email"
                                labelText="Email"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    autoComplete: "on",
                                    name: "Email",
                                }}
                                otherProps={{
                                    maxLength: 200,
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                </CardBody>
                <CardFooter>
                    <div className={classes.width100}>
                        <Button color={buttonColor} className={classes.cardFooterButton}>
                            Обновить профиль
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        );
    }
}

export default withStyles(userProfileStyle)(ProfileTab);
