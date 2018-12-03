import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Icon from "@material-ui/core/Icon/Icon";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Slide from "@material-ui/core/Slide";
import withStyles from "@material-ui/core/styles/withStyles";
import {Email, Face} from "@material-ui/icons";
import AppIcon from "app/common/icon/AppIcon";
import ErrorMessage from "app/common/message/ErrorMessage";
import CircularLoading from "app/common/misc/CircularLoading";
import LocalLink from "app/common/misc/LocalLink";
import {buttonColor} from "app/common/style/styleConsts";
import Button from "app/common/theme/button/Button";
import Card from "app/common/theme/card/Card";
import CardBody from "app/common/theme/card/CardBody";
import CustomCheckbox from "app/common/theme/input/CustomCheckbox";
import CustomInput from "app/common/theme/input/CustomInput";
import SignoutComp from "app/user/auth/SignoutComp";
import {mapUserToProps, USER_AUTH, USER_START_LOADING} from "app/user/reducer";
import {ajaxDebounceTimeout, buttonDebounceRule, connect, debounce, updateUiField} from "app/utils/functionUtil";
import util from "app/utils/util"
import {
    checkboxHandler,
    checkEmail,
    inputHandler,
    inputTrimHandler,
    isNotBlank,
    isNotEmpty,
    isTrue,
    prepareEnterHandler,
    prepareHandler
} from "app/utils/validateUtil";
import classNames from "classnames";
import React from "react";
import {dispatch} from "store";
import regPopupStyle from "./regPopupStyle";

function Transition(props) {
    return <Slide direction="down" {...props}/>;
}

class RegPopup extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: props.ui.loaded ? {
                email: "",
                firstName: "",
                password: "",
                agreementChecked: false,
            } : {...props.data},
            ui: {
                emailValid: true,
                firstNameValid: true,
                passwordValid: true,
                agreementCheckedValid: true,
                formValid: true,
                message: "",
            },
        };
        this.validator = util.validate.createValidator(this, {
                checkers: {
                    email: checkEmail,
                    firstName: isNotBlank,
                    password: isNotEmpty,
                    agreementChecked: isTrue
                },
            }
        );
        this.handleClose = this.handleClose.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    componentDidMount() {
        if (this.props.ui.loaded) {
            SignoutComp.signout(false);
        }
    }

    handleClose = (e) => {
        if (e) e.stopPropagation();
        util.navigate.goToPreviousUrl();
    };

    handleSignup = (e) => {
        e.stopPropagation();
        const {formValid, state} = this.validator.validate();
        if (!formValid) {
            this.setState(state);
            return;
        }
        this._debouncedSignup(state);
    };

    _debouncedSignup = debounce( // для избежания двойного клика
        (state) => {
            const compRef = this;
            updateUiField(compRef, state, "message", "");

            const propsPerson = compRef.props.data;
            const statePerson = compRef.state.data;
            dispatch(USER_START_LOADING)
                .then(() => {
                    return util.ajax.backendPost("auth/signup", {person: statePerson});
                })
                .then((response) => {
                    const success = response.success;
                    let person = response.person;
                    if (!success) {
                        person = {...propsPerson, ...statePerson}
                    }
                    dispatch(USER_AUTH, {person, success});
                    updateUiField(compRef, this.state, "message", response.message);
                    if (success) {
                        compRef.handleClose();
                        util.notify.signIn();
                    }
                });
        }, ajaxDebounceTimeout, buttonDebounceRule);

    render() {
        const {classes} = this.props;
        const validator = this.validator;
        const {
            loading
        } = this.props.ui;
        const {
            email, password, firstName, agreementChecked
        } = this.state.data;
        const {
            emailValid, passwordValid, firstNameValid, agreementCheckedValid, formValid, message
        } = this.state.ui;
        return (
            <Dialog
                classes={{root: classes.modalRoot, paper: classes.modal + " " + classes.modalSignup}}
                open={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="signup-modal-slide-title"
                aria-describedby="signup-modal-slide-description">
                <Card plain className={classes.modalSignupCard}>
                    <DialogTitle
                        id="signup-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}>
                        <Button simple className={classNames(classes.modalCloseButton, classes.right)}
                                round key="close" aria-label="Закрыть" onClick={this.handleClose}>
                            {" "}
                            <AppIcon name="close" className={classes.modalCloseDark}/>
                        </Button>
                        <h3 className={`${classes.cardTitle} ${classes.modalTitle}`}>
                            Регистрация
                        </h3>
                    </DialogTitle>
                    <form className={classes.form}>
                        <DialogContent
                            id="signup-modal-slide-description"
                            className={classes.modalBody}>
                            <div className={classes.textCenter}>
                                <Button justIcon round color="vk">
                                    <AppIcon name="fab fa-vk"/>
                                </Button>
                                {` `}
                                <Button justIcon round color="facebook">
                                    <AppIcon name="fab fa-facebook-f"/>
                                </Button>
                                {` `}
                                <Button justIcon round color="google">
                                    <AppIcon name="fab fa-google"/>
                                </Button>
                                {` `}
                            </div>
                            <CardBody className={classes.cardSignupBody}>
                                <CustomInput
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position="start"
                                                className={classes.inputAdornment}>
                                                <Face className={classes.inputAdornmentIcon}/>
                                            </InputAdornment>
                                        ),
                                        autoComplete: "on",
                                        placeholder: "Имя...",
                                        name: "First name",
                                        value: firstName,
                                        onChange: prepareHandler(validator, 'firstName', inputHandler),
                                        error: !firstNameValid
                                    }}
                                    otherProps={{
                                        maxLength: 100,
                                    }}
                                    disabled={loading}
                                />
                                <CustomInput
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position="start"
                                                className={classes.inputAdornment}>
                                                <Email className={classes.inputAdornmentIcon}/>
                                            </InputAdornment>
                                        ),
                                        autoComplete: "on",
                                        placeholder: "Email...",
                                        name: "Email",
                                        value: email,
                                        onChange: prepareHandler(validator, 'email', inputTrimHandler),
                                        error: !emailValid
                                    }}
                                    otherProps={{
                                        maxLength: 200,
                                    }}
                                    disabled={loading}
                                />
                                <CustomInput
                                    formControlProps={{fullWidth: true,}}
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" className={classes.inputAdornment}>
                                                <Icon className={classes.inputAdornmentIcon}>
                                                    lock_outline
                                                </Icon>
                                            </InputAdornment>
                                        ),
                                        autoComplete: "on",
                                        placeholder: "Пароль...",
                                        type: "password",
                                        name: "password",
                                        value: password,
                                        onChange: prepareHandler(validator, 'password', inputHandler),
                                        error: !passwordValid,
                                        onKeyPress: prepareEnterHandler(validator, this.handleSignup),
                                    }}
                                    otherProps={{
                                        maxLength: 100,
                                    }}
                                    disabled={loading}
                                />
                                <CustomCheckbox
                                    boxClass={classes.termAndCondAgreementBox}
                                    checked={agreementChecked}
                                    onClick={prepareHandler(validator, 'agreementChecked', checkboxHandler)}
                                    disabled={loading}
                                    error={!agreementCheckedValid}
                                    label={
                                        <span className={classes.smallText}>
                                            Я принимаю условия
                                            <LocalLink
                                                to="/info/privacy-policy"> политики конфиденциальности </LocalLink> и
                                            <LocalLink
                                                to="/info/user-agreement"> пользовательского соглашения </LocalLink>.
                                        </span>
                                    }
                                />
                                <div className={classes.textCenter}>
                                    <CircularLoading show={loading}>
                                        <Button color={buttonColor} onClick={this.handleSignup}
                                                disabled={!formValid || loading}>
                                            Зарегистрироваться
                                        </Button>
                                    </CircularLoading>
                                </div>
                                <ErrorMessage>{message}</ErrorMessage>
                            </CardBody>
                        </DialogContent>
                        <div className={classes.textCenter}>
                            <LocalLink to="/auth/signin" modal replace>Войти</LocalLink>
                        </div>
                    </form>
                </Card>
            </Dialog>
        )
    }
}

export default connect(mapUserToProps)(withStyles(regPopupStyle)(RegPopup));
