import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import Check from "@material-ui/icons/Check";
import {buttonColor} from "app/common/style/styles";
import userProfileStyle from "app/user/profile/userProfileStyle";
import Card from "app/common/card/Card.jsx";
import CardBody from "app/common/card/CardBody.jsx";
import CardFooter from "app/common/card/CardFooter.jsx";
import Button from "app/common/button/Button.jsx";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import React from "react";

class SettingsTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(e) {
        this.setState({
            agreementChecked: !this.state.agreementChecked
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.settingsTab}>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            tabIndex={-1}
                                            onClick={this.handleToggle}
                                            checked={this.state.agreementChecked}
                                            checkedIcon={<Check className={classes.checkedIcon}/>}
                                            icon={<Check className={classes.uncheckedIcon}/>}
                                            classes={{agreementChecked: classes.agreementChecked}}
                                        />
                                    }
                                    classes={{label: classes.label}}
                                    label="Получать сообщения о распродажах, акциях, скидках и новостях компании"
                                />
                            </div>
                        </GridItem>
                    </GridContainer>
                </CardBody>
                <CardFooter>
                    <div className={classes.width100}>
                        <Button color={buttonColor} className={classes.cardFooterButton}>
                            Сохранить
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        );
    }
}

export default withStyles(userProfileStyle)(SettingsTab);
