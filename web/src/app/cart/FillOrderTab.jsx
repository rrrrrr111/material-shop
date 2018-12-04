import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import userCartStyle from "app/cart/userCartStyle";
import DeliveryAddressRegion from "app/common/address/DeliveryAddressRegion";
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
import CustomRadio from "app/common/theme/input/CustomRadio";
import util from "app/utils/util";
import {checkboxHandler, inputHandler, inputTrimHandler, prepareHandler} from "app/utils/validateUtil";
import React from "react";

class FillOrderTab extends React.PureComponent {

    deliveryTypeHandler = (validator, fieldName, event, tabIndex) => {
        validator.handleChange(fieldName, util.dictionary.deliveryTypeDict.getById(tabIndex).name);
    };

    paymentTypeHandler = (validator, fieldName, event) => {
        this.props.paymentTypeHandler(validator, fieldName, event);
    };

    render() {
        const {classes, validatorRef} = this.props;
        const {
            loading, loaded
        } = this.props.userUi;
        const disabled = loading;
        const {
            address: dataAddress, firstName, email, phone, agreementChecked,
        } = this.props.data.person;
        const {
            address: uiAddress, firstNameValid, emailValid, phoneValid, agreementCheckedValid,
        } = this.props.ui.person;
        const {
            deliveryAmount,
            deliveryType,
            paymentInfo,
            paymentType,
        } = this.props.data;
        const {
            orderFormValid
        } = this.props.ui;
        const courierDelivery = util.dictionary.deliveryTypeDict.getById(0);
        const postDelivery = util.dictionary.deliveryTypeDict.getById(1);

        return (
            <form>
                <Card>
                    <CardBody>
                        <h3>Оформление заказа</h3>
                        <h5 className={classes.title}>
                            Получатель
                            {loaded
                                ? null
                                : <span className={classes.signinOrSignup}>
                                    <LocalLink to="/auth/signin" modal>Вход </LocalLink>
                                    /
                                    <LocalLink to="/auth/signup" modal> Регистрация</LocalLink>
                                </span>}
                        </h5>
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
                                        onChange: prepareHandler(validatorRef, 'person.firstName', inputHandler),
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
                                        onChange: prepareHandler(validatorRef, 'person.phone', inputHandler),
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
                                        onChange: prepareHandler(validatorRef, 'person.email', inputTrimHandler),
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
                                    onClick={prepareHandler(validatorRef, 'person.agreementChecked', checkboxHandler)}
                                    checked={agreementChecked}
                                    error={!agreementCheckedValid}
                                    disabled={disabled}
                                    label={
                                        <span className={classes.smallText}>
                                            Хочу получать персональные предложения о распродажах, акциях, скидках и новостях компании
                                    </span>}
                                />
                            </Grid>
                        </Grid>
                        <h5 className={classes.title}>Доставка</h5>
                        <DeliveryAddressRegion validatorRef={validatorRef}
                                               disabled={disabled}
                                               data={dataAddress} ui={uiAddress}/>
                        <Grid container spacing={8}>
                            <Grid xs={12} item>
                                <NavPills
                                    color={navPillsColor}
                                    activeTabIndex={util.dictionary.deliveryTypeDict.getByName(deliveryType).id}
                                    onChange={prepareHandler(validatorRef, 'deliveryType', this.deliveryTypeHandler)}
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
                                                    <DeliveryAddressStreet validatorRef={validatorRef}
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
                        <CustomRadio label="Наличными курьеру"
                                     value="CASH"
                                     checked={paymentType === "CASH"}
                                     onChange={prepareHandler(validatorRef, 'paymentType', inputHandler)}
                                     disabled={disabled}
                        />
                        <CustomRadio label="По безналичному расчету"
                                     value="CASHLESS"
                                     checked={paymentType === "CASHLESS"}
                                     onChange={prepareHandler(validatorRef, 'paymentType', inputHandler)}
                                     disabled={disabled}
                        />
                    </CardBody>
                </Card>
            </form>
        );
    }
}

export default withStyles(userCartStyle)(FillOrderTab);
