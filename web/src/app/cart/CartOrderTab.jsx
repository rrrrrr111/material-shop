import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Check from "@material-ui/icons/Check";
import userCartStyle from "app/cart/userCartStyle";
import Card from "app/common/card/Card.jsx";
import CardBody from "app/common/card/CardBody.jsx";
import GridContainer from "app/common/grid/GridContainer";
import CustomInput from "app/common/input/CustomInput";
import SelectInput from "app/common/input/SelectInput";
import Price from "app/common/misc/Price";
import {navPillsColor} from "app/common/style/styles";
import NavPills from "app/common/tabs/NavPills";
import util from "app/utils/util";
import classNames from "classnames";
import React from "react";

class CartOrderTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            agreementChecked: true,
            regionList: util.dictionary.regionList,
            delivery: {
                type: 0,
                region: "77",
            }
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleRegionChange = this.handleRegionChange.bind(this);
        this.onDeliveryTypeChange = this.onDeliveryTypeChange.bind(this);
    }

    handleToggle(e) {
        this.setState({
            ...this.state,
            agreementChecked: !this.state.agreementChecked
        });
    }

    handleRegionChange(e) {
        this.setDeliveryProp("region", e.target.value);
    }

    onDeliveryTypeChange = (event, activeTabIndex) => {
        this.setDeliveryProp("type", activeTabIndex);
    };

    setDeliveryProp(name, value) {
        this.setState({
            ...this.state,
            delivery: {
                ...this.state.delivery,
                [name]: value
            }
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <form>
                <Card>
                    <CardBody>
                        <h3>Оформление заказа</h3>
                        <h5 className={classes.title}>Получатель</h5>
                        <Grid container justify="center" spacing={16}>
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
                        <h5 className={classes.title}>Доставка</h5>
                        <Grid container justify="center" spacing={8}>
                            <Grid xs={6} item>
                                <SelectInput id="region"
                                             labelText="Регион"
                                             fakeItemText="Выберите регион"
                                             onChange={this.handleRegionChange}
                                             options={this.state.regionList}
                                             value={this.state.delivery.region}
                                />
                            </Grid>
                            <Grid xs={6} item/>
                            <Grid xs={12} item>
                                <NavPills
                                    color={navPillsColor}
                                    activeTabIndex={this.state.delivery.type}
                                    onChange={this.onDeliveryTypeChange}
                                    tabs={[
                                        {
                                            pillText: util.dictionary.deliveryTypeMap.courier.name,
                                            content: (
                                                <GridContainer spacing={16}>
                                                    <Grid item xs={12}>
                                                        <h5>
                                                            Курьерская доставка —{" "}
                                                            <Price value={
                                                                util.dictionary.deliveryTypeMap.courier.coast
                                                            }/>
                                                        </h5>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <CustomInput
                                                            labelText="Улица"
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                            inputProps={{
                                                                autoComplete: "on",
                                                                name: "Street",
                                                            }}
                                                            otherProps={{
                                                                maxLength: 200,
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={4} sm={2}>
                                                        <CustomInput
                                                            labelText="Дом"
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                            inputProps={{
                                                                autoComplete: "on",
                                                                name: "House",
                                                            }}
                                                            otherProps={{
                                                                maxLength: 10,
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={4} sm={2}>
                                                        <CustomInput
                                                            labelText="Корпус"
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                            inputProps={{
                                                                autoComplete: "on",
                                                                name: "Housing",
                                                            }}
                                                            otherProps={{
                                                                maxLength: 10,
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={4} sm={2}>
                                                        <CustomInput
                                                            labelText="Строение"
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                            inputProps={{
                                                                autoComplete: "on",
                                                                name: "Construction",
                                                            }}
                                                            otherProps={{
                                                                maxLength: 10,
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}/>
                                                    <Grid item xs={4} sm={2}>
                                                        <CustomInput
                                                            labelText="Квартира"
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                            inputProps={{
                                                                autoComplete: "on",
                                                                name: "Apartment",
                                                            }}
                                                            otherProps={{
                                                                maxLength: 10,
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={4} sm={2}>
                                                        <CustomInput
                                                            labelText="Подъезд"
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                            inputProps={{
                                                                autoComplete: "on",
                                                                name: "Entrance",
                                                            }}
                                                            otherProps={{
                                                                maxLength: 10,
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={4} sm={2}>
                                                        <CustomInput
                                                            labelText="Домофон"
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                            inputProps={{
                                                                autoComplete: "on",
                                                                name: "Intercom",
                                                            }}
                                                            otherProps={{
                                                                maxLength: 10,
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <CustomInput
                                                            id="address-comment"
                                                            labelText="Комментарий к доставке"
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                            inputProps={{
                                                                autoComplete: "on",
                                                                multiline: true,
                                                                rows: 3,
                                                            }}
                                                            otherProps={{
                                                                maxLength: 1000,
                                                            }}
                                                        />
                                                    </Grid>
                                                </GridContainer>
                                            )
                                        },
                                        {
                                            pillText: util.dictionary.deliveryTypeMap.russianPost.name,
                                            content: (
                                                <span>
                                                    <h5>Сожалеем, доставка Почтой России временно не доступна.</h5>
                                                </span>
                                            )
                                        }
                                    ]}
                                />

                            </Grid>
                        </Grid>
                    </CardBody>
                </Card>
            </form>
        );
    }
}

export default withStyles(userCartStyle)(CartOrderTab);
