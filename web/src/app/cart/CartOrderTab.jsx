import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import userCartStyle from "app/cart/userCartStyle";
import DeliveryAddressStreet from "app/common/address/DeliveryAddressStreet";
import GridContainer from "app/common/grid/GridContainer";
import LocalLink from "app/common/misc/LocalLink";
import Price from "app/common/misc/Price";
import {navPillsColor} from "app/common/style/styleConsts";
import NavPills from "app/common/tabs/NavPills";
import Card from "app/common/theme/card/Card.jsx";
import CardBody from "app/common/theme/card/CardBody.jsx";
import CustomCheckbox from "app/common/theme/input/CustomCheckbox";
import CustomInput from "app/common/theme/input/CustomInput";
import SelectInput from "app/common/theme/input/SelectInput";
import util from "app/utils/util";
import {checkboxHandler, inputHandler, inputTrimHandler, prepareHandler} from "app/utils/validateUtil";
import React from "react";

class CartOrderTab extends React.PureComponent {

    deliveryTypeHandler = (compRef, fieldName, event, tabIndex) => {
        compRef.validator.handleChange(fieldName, util.dictionary.deliveryTypeDict.getById(tabIndex).name);
    };

    paymentTypeHandler = (event) => {
        this.props.paymentTypeHandler();
    };

    render() {
        const {classes, stateComponent} = this.props;
        const {
            loading
        } = this.props.userUi;
        const disabled = loading;
        const {
            address: dataAddress, firstName, email, phone, agreementChecked,
        } = this.props.data.person;
        const {
            address: uiAddress, firstNameValid, emailValid, phoneValid, agreementCheckedValid,
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
            orderFormValid, orderFormMessage
        } = this.props.ui;
        const courierDelivery = util.dictionary.deliveryTypeDict.getById(0);
        const postDelivery = util.dictionary.deliveryTypeDict.getById(1);

        return (
            <form>
                <Card>
                    <CardBody>
                        <h3>Оформление заказа</h3>
                        <Grid container spacing={8}>
                            <Grid xs={6} sm item>
                                <h5 className={classes.title}>Получатель</h5>
                            </Grid>
                            <Grid xs={6} sm item>
                                <span className={classes.smallText}>
                                    <LocalLink to="/auth/signin" modal>Вход</LocalLink>
                                        /
                                    <LocalLink to="/auth/signup" modal>Регистрация</LocalLink>
                                </span>
                            </Grid>
                        </Grid>
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
                                        value: firstName,
                                        onChange: prepareHandler(stateComponent, 'person.firstName', inputHandler),
                                        error: !firstNameValid
                                    }}
                                    otherProps={{
                                        maxLength: 100,
                                    }}
                                    disabled={disabled}
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
                                        value: phone,
                                        onChange: prepareHandler(stateComponent, 'person.phone', inputHandler),
                                        error: !phoneValid
                                    }}
                                    numberProps={{
                                        format: "+7 (###) ###-####",
                                        mask: "_",
                                    }}
                                    disabled={disabled}
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
                                        value: email,
                                        onChange: prepareHandler(stateComponent, 'person.email', inputTrimHandler),
                                        error: !emailValid
                                    }}
                                    otherProps={{
                                        maxLength: 200,
                                    }}
                                    disabled={disabled}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8}>
                            <Grid xs={12} item>
                                <CustomCheckbox
                                    onClick={prepareHandler(stateComponent, 'person.agreementChecked', checkboxHandler)}
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
                                <SelectInput
                                    id="region"
                                    labelText="Регион"
                                    fakeItemText="Выберите регион"
                                    value={region}
                                    onChange={prepareHandler(stateComponent, 'person.address.region', inputHandler)}
                                    error={!regionValid}
                                    options={util.dictionary.regionDict.values}
                                    disabled={disabled}
                                />
                            </Grid>
                            <Grid xs={6} item/>
                            <Grid xs={12} item>
                                <NavPills
                                    color={navPillsColor}
                                    activeTabIndex={util.dictionary.deliveryTypeDict.getByName(deliveryType).id}
                                    onChange={prepareHandler(stateComponent, 'deliveryType', this.deliveryTypeHandler)}
                                    tabs={[
                                        {
                                            pillText: courierDelivery.description,
                                            content: (
                                                <div>
                                                    <GridContainer spacing={16}>
                                                        <Grid item xs={12}>
                                                            <h5>
                                                                Курьерская доставка —{" "}
                                                                <Price value={
                                                                    courierDelivery.coast
                                                                }/>
                                                            </h5>
                                                        </Grid>
                                                    </GridContainer>
                                                    <DeliveryAddressStreet stateComponent={stateComponent}
                                                                           disabled={disabled}
                                                                           data={dataAddress} ui={uiAddress}/>
                                                </div>
                                            )
                                        },
                                        {
                                            pillText: postDelivery.description,
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
                        <h5 className={classes.title}>Оплата</h5>
                    </CardBody>
                </Card>
            </form>
        );
    }
}

export default withStyles(userCartStyle)(CartOrderTab);
