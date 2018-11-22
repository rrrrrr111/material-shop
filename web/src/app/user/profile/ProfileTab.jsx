import withStyles from "@material-ui/core/styles/withStyles";
import Button from "app/common/button/Button.jsx";
import Card from "app/common/card/Card.jsx";
import CardBody from "app/common/card/CardBody.jsx";
import CardFooter from "app/common/card/CardFooter.jsx";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import CustomInput from "app/common/input/CustomInput.jsx";
import ErrorMessageBox from "app/common/message/ErrorMessageBox";
import CircularLoading from "app/common/misc/CircularLoading";
import {buttonColor} from "app/common/style/styles";
import userProfileStyle from "app/user/profile/userProfileStyle";
import {mapUserToProps, USER_DATA, USER_START_LOADING, USER_STOP_LOADING} from "app/user/reducer";
import {buttonDebounceRule, connect, debounce, updateUiField} from "app/utils/functionUtil";
import util from "app/utils/util";
import {checkEmail, inputHandler, inputTrimHandler, isNotBlank, prepareHandler} from "app/utils/validateUtil";
import React from "react";
import {dispatch} from "store";

class ProfileTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: {...props.data},
            ui: {
                firstNameValid: true,
                lastNameValid: true,
                phoneValid: true,
                emailValid: true,
                formValid: true,
                loading: false,
                message: "",
            },
        };
        this.validator = util.validate.createValidator(this, {
                fieldsToCheckers: {
                    firstName: isNotBlank,
                    lastName: isNotBlank,
                    email: checkEmail,
                    phone: isNotBlank,
                },
                formValidField: 'formValid',
            }
        );
        this.handleSave = this.handleSave.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (state.data.editDate !== props.data.editDate) {
            return {...state, data: {...props.data}};
        }
        return null;
    }

    componentDidMount() {
        if (!this.props.ui.loaded) {
            ProfileTab.reloadUser();
        }
    }

    static reloadUser = () => {
        dispatch(USER_START_LOADING);
        util.ajax.backendPost("user/load")
            .then(function (response) {
                dispatch(USER_STOP_LOADING);
                const success = response.success;
                if (success) {
                    dispatch(USER_DATA, response.person);
                }
            });
    };

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
        }, 1000, buttonDebounceRule);

    render() {
        const {classes} = this.props;
        const {
            loading
        } = this.props.ui;
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
                                    disabled={loading}
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
                                    disabled={loading}
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
                                    disabled={loading}
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
                                    disabled={loading}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                    <CardFooter>
                        <div className={classes.width100}>
                            {loading
                                ? <CircularLoading/>
                                : <Button color={buttonColor} className={classes.cardFooterButton}
                                          onClick={this.handleSave}
                                          disabled={!formValid || loading}>
                                    Обновить профиль
                                </Button>
                            }
                            <ErrorMessageBox text={message}/>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        );
    }
}

export default connect(mapUserToProps)(withStyles(userProfileStyle)(ProfileTab));