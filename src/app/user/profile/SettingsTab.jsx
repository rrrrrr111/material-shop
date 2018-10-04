import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import Check from "@material-ui/icons/Check";
import {buttonColor} from "app/common/styles";
import userProfileStyle from "app/user/profile/userProfileStyle";
import Card from "lib/components/Card/Card.jsx";
import CardBody from "lib/components/Card/CardBody.jsx";
import CardFooter from "lib/components/Card/CardFooter.jsx";
import Button from "lib/components/CustomButtons/Button.jsx";
import GridContainer from "lib/components/Grid/GridContainer.jsx";
import GridItem from "lib/components/Grid/GridItem.jsx";
import React from "react";

class SettingsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(e) {
        this.setState({
            checked: !this.state.checked
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.settingsTab}>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <div
                                className={
                                    classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal
                                }
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            tabIndex={-1}
                                            onClick={this.handleToggle}
                                            checked={this.state.checked}
                                            checkedIcon={<Check className={classes.checkedIcon}/>}
                                            icon={<Check className={classes.uncheckedIcon}/>}
                                            classes={{checked: classes.checked}}
                                        />
                                    }
                                    classes={{label: classes.label}}
                                    label="Получать сообщения о распроажах, акциях, скидках и новостях компании."
                                />
                            </div>
                        </GridItem>
                    </GridContainer>
                </CardBody>
                <CardFooter>
                    <div className={classes.footerContainer}>
                        <Button color={buttonColor} className={classes.footerButton}>
                            Сохранить
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        );
    }
}

export default withStyles(userProfileStyle)(SettingsTab);
