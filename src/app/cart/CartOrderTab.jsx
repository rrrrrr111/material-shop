import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Check from "@material-ui/icons/Check";
import userCartStyle from "app/cart/userCartStyle";
import CustomInput from "app/common/input/CustomInput";
import SelectInput from "app/common/input/SelectInput";
import util from "app/utils/util";
import classNames from "classnames";
import Card from "lib/components/Card/Card.jsx";
import CardBody from "lib/components/Card/CardBody.jsx";
import React from "react";

class CartOrderTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            agreementChecked: true,
            region: null,
            regionList: util.dictionary.regionList,
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleRegionChange = this.handleRegionChange.bind(this);
    }

    handleToggle(e) {
        const state = this.state;
        this.setState({
            ...state,
            agreementChecked: !state.agreementChecked
        });
    }

    handleRegionChange(e) {
        const state = this.state;
        this.setState({
            ...state,
            region: !e.target.value
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <form>
                <Card>
                    <CardBody>
                        <h3>Оформление заказа</h3>
                        <h5>Получатель</h5>
                        <Grid container justify="center" spacing={8}>
                            <Grid xs={12} sm item>
                                <CustomInput
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
                            </Grid>
                            <Grid xs={12} sm item>
                                <CustomInput
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
                            </Grid>
                            <Grid xs={12} sm item>
                                <CustomInput
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
                            </Grid>
                        </Grid>
                        <Grid container spacing={8}>
                            <Grid xs={12} item
                                  className={classNames(classes.checkboxAndRadio, classes.checkboxAndRadioHorizontal)}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            tabIndex={-1}
                                            onClick={this.handleToggle}
                                            checked={this.state.agreementChecked}
                                            checkedIcon={<Check className={classes.checkedIcon}/>}
                                            icon={<Check className={classes.uncheckedIcon}/>}
                                            classes={{checked: classes.checked}}
                                        />}
                                    classes={{label: classes.label}}
                                    label={<span className={classes.agreementCheckboxLabel}>
                                         Я хочу получать персональные предложения о распродажах, акциях, скидках и новостях компании
                                    </span>}
                                />
                            </Grid>
                        </Grid>
                        <h5>Доставка</h5>
                        <Grid container justify="center" spacing={8}>
                            <Grid xs={12} sm item>
                                <SelectInput id="region"
                                             labelText="Регион"
                                             fakeItemText="Выберите регион"
                                             onChange={this.handleRegionChange}
                                             options={this.state.regionList}
                                             value={this.state.region}
                                />
                            </Grid>
                            <Grid xs={12} sm item>

                            </Grid>
                        </Grid>
                    </CardBody>
                </Card>
            </form>
        );
    }
}

export default withStyles(userCartStyle)(CartOrderTab);
