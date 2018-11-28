import withStyles from "@material-ui/core/styles/withStyles";
import Button from "app/common/button/Button.jsx";
import Card from "app/common/card/Card.jsx";
import CardBody from "app/common/card/CardBody.jsx";
import CardFooter from "app/common/card/CardFooter.jsx";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import CustomInput from "app/common/input/CustomInput.jsx";
import ErrorMessage from "app/common/message/ErrorMessage";
import NeedLoginMessage from "app/common/message/NeedLoginMessage";
import CircularLoading from "app/common/misc/CircularLoading";
import {buttonColor} from "app/common/style/styleConsts";
import userProfileStyle from "app/user/profile/userProfileStyle";
import {USER_DATA, USER_START_LOADING, USER_STOP_LOADING} from "app/user/reducer";
import {ajaxDebounceTimeout, buttonDebounceRule, debounce, updateUiField} from "app/utils/functionUtil";
import util from "app/utils/util";
import {
    checkEmail,
    checkPhone,
    inputHandler,
    inputTrimHandler,
    isNotBlank,
    prepareHandler
} from "app/utils/validateUtil";
import React from "react";
import {dispatch} from "store";

class ProfileTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: {...props.userData},
            ui: {
                firstNameValid: true,
                lastNameValid: true,
                phoneValid: true,
                emailValid: true,
                formValid: true,
                message: "",
            },
        };
        this.validator = util.validate.createValidator(this, {
                fieldsToCheckers: {
                    firstName: isNotBlank,
                    lastName: isNotBlank,
                    email: checkEmail,
                    phone: checkPhone,
                },
            }
        );
        this.handleSave = this.handleSave.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (state.data.editDate !== props.userData.editDate) {
            return {...state, data: {...props.userData}};
        }
        return null;
    }

    handleSave = (e) => {
        e.stopPropagation();
        if (!this.validator.isFormValid()) {
            return;
        }
        this._debouncedSave();
    };

    _debouncedSave = debounce(
        () => {
            const compRef = this;
            updateUiField(compRef, "message", "");

            dispatch(USER_START_LOADING);
            util.ajax.backendPost("user/save", {person: compRef.state.data})
                .then(function (response) {
                    dispatch(USER_STOP_LOADING);
                    updateUiField(compRef, "message", response.message);
                    const success = response.success;
                    if (success) {
                        dispatch(USER_DATA, response.person);
                        util.notify.dataSaved();
                    }
                });
        }, ajaxDebounceTimeout, buttonDebounceRule);

    render() {
        const {classes} = this.props;
        const {
            loading, loaded
        } = this.props.userUi;
        const disabled = loading || !loaded;
        const {
            firstName, lastName, email, phone
        } = this.state.data;
        const {
            firstNameValid, lastNameValid, emailValid, phoneValid, formValid, message
        } = this.state.ui;
        return (
            <form>
                <Card className={classes.profileTab}>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Имя"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        autoComplete: "on",
                                        name: "First name",
                                        value: firstName,
                                        onChange: prepareHandler(this, 'firstName', inputTrimHandler),
                                        error: !firstNameValid
                                    }}
                                    otherProps={{
                                        maxLength: 100,
                                    }}
                                    disabled={disabled}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Фамилия"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        autoComplete: "on",
                                        name: "Last name",
                                        value: lastName,
                                        onChange: prepareHandler(this, 'lastName', inputTrimHandler),
                                        error: !lastNameValid
                                    }}
                                    otherProps={{
                                        maxLength: 100,
                                    }}
                                    disabled={disabled}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Телефон"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        autoComplete: "on",
                                        name: "Phone",
                                        value: phone,
                                        onChange: prepareHandler(this, 'phone', inputHandler),
                                        error: !phoneValid
                                    }}
                                    numberProps={{
                                        format: "+7 (###) ###-####",
                                        mask: "_",
                                    }}
                                    disabled={disabled}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Email"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        autoComplete: "on",
                                        name: "Email",
                                        value: email,
                                        onChange: prepareHandler(this, 'email', inputTrimHandler),
                                        error: !emailValid
                                    }}
                                    otherProps={{
                                        maxLength: 200,
                                    }}
                                    disabled={disabled}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                    <CardFooter>
                        <div className={classes.width100}>
                            <CircularLoading show={loading}>
                                <Button color={buttonColor} className={classes.cardFooterButton}
                                        onClick={this.handleSave}
                                        disabled={disabled || !formValid}>
                                    Обновить профиль
                                </Button>
                            </CircularLoading>
                            <ErrorMessage show={message}/>
                            <NeedLoginMessage show={!loaded && !loading}/>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        );
    }
}

export default withStyles(userProfileStyle)(ProfileTab);