import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import userCartStyle from "app/cart/userCartStyle";
import GridContainer from "app/common/grid/GridContainer";
import Price from "app/common/misc/Price";
import {navPillsColor} from "app/common/style/styleConsts";
import NavPills from "app/common/tabs/NavPills";
import Card from "app/common/theme/card/Card.jsx";
import CardBody from "app/common/theme/card/CardBody.jsx";
import CustomCheckbox from "app/common/theme/input/CustomCheckbox";
import CustomInput from "app/common/theme/input/CustomInput";
import SelectInput from "app/common/theme/input/SelectInput";
import util from "app/utils/util";
import {checkboxHandler, prepareHandler} from "app/utils/validateUtil";
import React from "react";

class CartOrderTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleRegionChange = this.handleRegionChange.bind(this);
        this.onDeliveryTypeChange = this.onDeliveryTypeChange.bind(this);
    }

    handleRegionChange(e) {

    }

    onDeliveryTypeChange = (event, activeTabIndex) => {

    };

    onPaymentTypeChange = (event) => {
        this.props.handlePaymentTypeChange();
    };

    render() {
        const {classes, cartStateComponent} = this.props;
        const {
            loading
        } = this.props.userUi;
        const disabled = loading;
        const {
            firstName, email, phone, agreementChecked,
        } = this.props.data.person;
        const {
            firstNameValid, emailValid, phoneValid, agreementCheckedValid,
        } = this.props.ui.person;
        const {
            region,
        } = this.props.data.person.address;
        const {
            regionValid,
        } = this.props.ui.person.address;
        const {
            deliveryAmount,
            deliveryType,
            paymentInfo,
            paymentType,
        } = this.props.data;
        const {
            orderFormValid, message
        } = this.props.ui;
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
                            <Grid xs={12} item>
                                <CustomCheckbox
                                    onClick={prepareHandler(cartStateComponent, 'person.agreementChecked', checkboxHandler)}
                                    checked={agreementChecked}
                                    error={!agreementCheckedValid}
                                    disabled={disabled}
                                    label={
                                        <span className={classes.smallText}>
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
                                             options={util.dictionary.regionDict.values}
                                             value={region}
                                />
                            </Grid>
                            <Grid xs={6} item/>
                            <Grid xs={12} item>
                                <NavPills
                                    color={navPillsColor}
                                    activeTabIndex={util.dictionary.deliveryTypeDict.getByName(deliveryType).id}
                                    onChange={this.onDeliveryTypeChange}
                                    tabs={[
                                        {
                                            pillText: util.dictionary.deliveryTypeDict.getById(0).description,
                                            content: (
                                                <div>
                                                    <GridContainer spacing={16}>
                                                        <Grid item xs={12}>
                                                            <h5>
                                                                Курьерская доставка —{" "}
                                                                <Price value={
                                                                    util.dictionary.deliveryTypeDict.getById(0).coast
                                                                }/>
                                                            </h5>
                                                        </Grid>
                                                    </GridContainer>
                                                    <GridContainer spacing={16}>
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
                                                </div>
                                            )
                                        },
                                        {
                                            pillText: util.dictionary.deliveryTypeDict.getById(1).description,
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
