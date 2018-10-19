import withStyles from "@material-ui/core/styles/withStyles";
import {buttonColor} from "app/common/styles";
import userProfileStyle from "app/user/profile/userProfileStyle";
import Card from "lib/components/Card/Card.jsx";
import CardBody from "lib/components/Card/CardBody.jsx";
import CardFooter from "lib/components/Card/CardFooter.jsx";
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
                                    autoComplete: "off",
                                    type: "password",
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
                                    autoComplete: "off",
                                    type: "password",
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
                                    autoComplete: "off",
                                    type: "password",
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
