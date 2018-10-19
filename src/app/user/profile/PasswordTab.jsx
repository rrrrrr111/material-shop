import withStyles from "@material-ui/core/styles/withStyles";
import {buttonColor} from "app/common/styles";
import userProfileStyle from "app/user/profile/userProfileStyle";
import Card from "app/common/card/Card.jsx";
import CardBody from "app/common/card/CardBody.jsx";
import CardFooter from "app/common/card/CardFooter.jsx";
import Button from "app/common/button/Button.jsx";
import CustomInput from "app/common/input/CustomInput";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import React from "react";

class PasswordTab extends React.PureComponent {

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.passwordTab}>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Старый пароль"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    autoComplete: "new-password",
                                    type: "password",
                                    name: "old-password",
                                }}
                                otherProps={{
                                    maxLength: 100,
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Новый пароль"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    autoComplete: "new-password",
                                    type: "password",
                                    name: "new-password-1",
                                }}
                                otherProps={{
                                    maxLength: 100,
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Повторите новый пароль"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    autoComplete: "new-password",
                                    type: "password",
                                    name: "new-password-2",
                                }}
                                otherProps={{
                                    maxLength: 100,
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                </CardBody>
                <CardFooter>
                    <div className={classes.width100}>
                        <Button color={buttonColor} className={classes.cardFooterButton}>
                            Сменить пароль
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        );
    }
}

export default withStyles(userProfileStyle)(PasswordTab);
