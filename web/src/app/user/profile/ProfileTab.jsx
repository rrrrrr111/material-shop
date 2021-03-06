import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import ErrorMessage from "app/common/message/ErrorMessage";
import NeedLoginMessage from "app/common/message/NeedLoginMessage";
import CircularLoading from "app/common/misc/CircularLoading";
import {buttonColor} from "app/common/style/styleConsts";
import Button from "app/common/theme/button/Button.jsx";
import Card from "app/common/theme/card/Card.jsx";
import CardBody from "app/common/theme/card/CardBody.jsx";
import CardFooter from "app/common/theme/card/CardFooter.jsx";
import CustomInput from "app/common/theme/input/CustomInput.jsx";
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
                checkers: {
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
        const {formValid, state} = this.validator.validate();
        if (!formValid) {
            this.setState(state);
            return;
        }
        this._debouncedSave(state);
    };

    _debouncedSave = debounce(
        (state) => {
            const compRef = this;

            updateUiField(compRef, state, "message", "");
            dispatch(USER_START_LOADING)
                .then(() => {
                    return util.ajax.backendPost("user/save", {person: compRef.state.data});
                })
                .then((response) => {
                    updateUiField(compRef, this.state, "message", response.message);
                    if (response.success) {
                        dispatch(USER_DATA, response.person);
                        util.notify.dataSaved();
                    } else {
                        dispatch(USER_STOP_LOADING);
                    }
                });
        }, ajaxDebounceTimeout, buttonDebounceRule);

    render() {
        const {classes} = this.props;
        const validator = this.validator;
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
                                        onChange: prepareHandler(validator, 'firstName', inputHandler),
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
                                        onChange: prepareHandler(validator, 'lastName', inputHandler),
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
                                        onChange: prepareHandler(validator, 'phone', inputHandler),
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
                                        onChange: prepareHandler(validator, 'email', inputTrimHandler),
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