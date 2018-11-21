import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Icon from "@material-ui/core/Icon/Icon";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Slide from "@material-ui/core/Slide";
import withStyles from "@material-ui/core/styles/withStyles";
import {Check, Email, Face} from "@material-ui/icons";
import Button from "app/common/button/Button";
import Card from "app/common/card/Card";
import CardBody from "app/common/card/CardBody";
import AppIcon from "app/common/icon/AppIcon";
import CustomInput from "app/common/input/CustomInput";
import ErrorMessageBox from "app/common/message/ErrorMessageBox";
import CircularLoading from "app/common/misc/CircularLoading";
import LocalLink from "app/common/misc/LocalLink";
import {buttonColor} from "app/common/style/styles";
import SignoutComp from "app/user/auth/SignoutComp";
import {mapUserToProps, USER_AUTH_RESULT, USER_DATA} from "app/user/reducer";
import {action, buttonDebounceRule, connect, update2UiFields} from "app/utils/functionUtil";
import util from "app/utils/util"
import {
    checkboxHandler,
    checkEmail,
    inputHandler,
    inputTrimHandler,
    isNotBlank,
    isTrue,
    prepareHandler
} from "app/utils/validateUtil";
import classNames from "classnames";
import debounce from 'lodash/debounce'
import React from "react";
import {store} from "store";
import regPopupStyle from "./regPopupStyle";

function Transition(props) {
    return <Slide direction="down" {...props}/>;
}

class RegPopup extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: props.ui.authorized ? {
                email: "",
                firstName: "",
                password: "",
                aggrChecked: false,
            } : props.data,
            ui: {
                emailValid: true,
                firstNameValid: true,
                passwordValid: true,
                aggrCheckedValid: true,
                formValid: true,
                loading: false,
                message: "",
            },
        };
        this.validator = util.validate.createValidator(this, {
                fieldsToCheckers: {
                    email: checkEmail,
                    firstName: isNotBlank,
                    password: isNotBlank,
                    aggrChecked: isTrue
                },
                formValidField: 'formValid',
            }
        );
        this.handleClose = this.handleClose.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    componentDidMount() {
        if (this.props.ui.authorized) {
            SignoutComp.signout(false);
        }
    }

    handleClose = (e) => {
        if (e) e.stopPropagation();
        util.navigate.goToPreviousUrl();
    };

    handleSignup = (e) => {
        e.stopPropagation();
        if (!this.validator.isFormValid()) {
            return;
        }
        this._debouncedSignup();
    };

    _debouncedSignup = debounce( // для избежания двойного клика
        () => {
            const compRef = this;
            update2UiFields(compRef, "loading", true, "message", "");

            const propsPerson = compRef.props.data;
            const statePerson = compRef.state.data;
            util.ajax.backendPost("auth/signup", {person: compRef.state.data})
                .then(function (response) {
                    const success = response.success;
                    let person = response.person;
                    if (!success) {
                        person = {...propsPerson, ...statePerson}
                    }
                    store.dispatch(action(USER_DATA, person));
                    store.dispatch(action(USER_AUTH_RESULT, success));
                    update2UiFields(compRef, "loading", false, "message", response.message);
                    if (success) {
                        compRef.handleClose();
                        util.notify.signIn();
                    }
                });
        }, 500, buttonDebounceRule);

    render() {
        const {classes, ui} = this.props;
        const {
            email, password, firstName, aggrChecked
        } = this.state.data;
        const {
            emailValid, passwordValid, firstNameValid, aggrCheckedValid, formValid, message, loading
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
                                        onChange: prepareHandler(this, 'firstName', inputTrimHandler),
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
                                        onChange: prepareHandler(this, 'email', inputTrimHandler),
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
                                        onChange: prepareHandler(this, 'password', inputHandler),
                                        error: !passwordValid
                                    }}
                                    otherProps={{
                                        maxLength: 100,
                                    }}
                                    disabled={loading}
                                />
                                <FormControlLabel className={classes.termAndCondAgreementBox}
                                                  classes={{label: classes.label}}
                                                  control={
                                                      <Checkbox tabIndex={-1}
                                                                checked={aggrChecked}
                                                                onClick={prepareHandler(this, 'aggrChecked', checkboxHandler)}
                                                                checkedIcon={<Check className={classes.checkedIcon}/>}
                                                                icon={<Check
                                                                    className={
                                                                        classNames({
                                                                            [classes.uncheckedIcon]: true,
                                                                            "redShadow": !aggrCheckedValid
                                                                        })}/>}
                                                                classes={{agreementChecked: classes.agreementChecked}}
                                                                disabled={loading}/>
                                                  }
                                                  label={<span className={classes.termAndCondAgreementLabel}>
                                                            Я принимаю условия
                                                            <LocalLink to="/info/privacy-policy"
                                                                       className={classes.aClasses}> политики конфиденциальности </LocalLink>{" "}
                                                      и
                                                            <LocalLink to="/info/user-agreement"
                                                                       className={classes.aClasses}> пользовательского соглашения </LocalLink>{" "}
                                                      .
                                                        </span>}
                                />
                                <div className={classes.textCenter}>
                                    {loading
                                        ? <CircularLoading/>
                                        : <Button color={buttonColor} onClick={this.handleSignup}
                                                  disabled={!formValid || loading}>
                                            Зарегистрироваться
                                        </Button>
                                    }
                                </div>
                                <ErrorMessageBox text={message}/>
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
