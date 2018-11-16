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
import LocalLink from "app/common/misc/LocalLink";
import {buttonColor} from "app/common/style/styles";
import {RELOAD_USER_DATA, START_RELOAD_USER_DATA, STOP_RELOAD_USER_DATA} from "app/user/reducer";
import {action} from "app/utils/functionUtil";
import util from "app/utils/util"
import {checkEmail, isNotBlank, isTrue} from "app/utils/validateUtil";
import classNames from "classnames";
import React from "react";
import {connect} from "react-redux";
import regPopupStyle from "./regPopupStyle";

function Transition(props) {
    return <Slide direction="down" {...props} />;
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
                enterButtonActive: true,
            },
        };
        this.validator = util.validate.createValidator(this, {
                fieldsToCheckers: {
                    email: checkEmail,
                    firstName: isNotBlank,
                    password: isNotBlank,
                    aggrChecked: isTrue
                },
                formValidField: 'enterButtonActive',
                disabled: true,
            }
        );
        this.handleClose = this.handleClose.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleAggrToggle = this.handleAggrToggle.bind(this);
    }

    handleEmailChange = (e) => {
        this.validator.handleChange('email', e.target.value.trim());
    };

    handleFirstNameChange = (e) => {
        this.validator.handleChange('firstName', e.target.value.trim());
    };

    handlePasswordChange = (e) => {
        this.validator.handleChange('password', e.target.value);
    };

    handleAggrToggle(e) {
        this.validator.handleChange('aggrChecked', !this.state.data.aggrChecked);
    }

    handleClose = (e) => {
        e.stopPropagation();
        util.navigate.goToPreviousUrl(this.props.history);
    };

    handleSignup = (e) => {
        e.stopPropagation();
        if (!this.validator.isFormValid()) {
            return;
        }
        this.props.dispatch(this.signup);
    };

    signup = (dispatch) => {
        dispatch(action(START_RELOAD_USER_DATA));

        const propsPerson = this.props.data;
        const statePerson = this.state.data;
        util.ajax.backendPost("auth/signup", {person: this.state.data})
            .then(function (response) {
                const authorized = !(response.message);
                let person = response.person;
                if (!authorized) {
                    person = {...propsPerson, ...statePerson}
                }
                dispatch(action(RELOAD_USER_DATA, person));
                dispatch(action(STOP_RELOAD_USER_DATA, {
                    message: response.message,
                    authorized,
                }));
                if (authorized) {
                    //this.handleClose(e);
                }
            });
    };

    render() {
        const {classes, ui} = this.props;
        const {
            email, password, firstName, aggrChecked
        } = this.state.data;
        const {
            emailValid, passwordValid, firstNameValid, aggrCheckedValid, enterButtonActive
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
                                        onChange: this.handleFirstNameChange,
                                        error: !firstNameValid
                                    }}
                                    otherProps={{
                                        maxLength: 100,
                                    }}
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
                                        onChange: this.handleEmailChange,
                                        error: !emailValid
                                    }}
                                    otherProps={{
                                        maxLength: 200,
                                    }}
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
                                        onChange: this.handlePasswordChange,
                                        error: !passwordValid
                                    }}
                                    otherProps={{
                                        maxLength: 100,
                                    }}
                                />
                                <FormControlLabel className={classes.termAndCondAgreementBox}
                                                  classes={{label: classes.label}}
                                                  control={
                                                      <Checkbox tabIndex={-1}
                                                                onClick={this.handleAggrToggle}
                                                                checked={aggrChecked}
                                                                checkedIcon={<Check className={classes.checkedIcon}/>}
                                                                icon={<Check
                                                                    className={
                                                                        classNames({
                                                                            [classes.uncheckedIcon]: true,
                                                                            "redShadow": !aggrCheckedValid
                                                                        })}/>}
                                                                classes={{agreementChecked: classes.agreementChecked}}/>
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
                                    <Button color={buttonColor} onClick={this.handleSignup}
                                            disabled={!enterButtonActive}>
                                        Зарегистрироваться
                                    </Button>
                                </div>
                                <ErrorMessageBox text={ui.error}/>
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

const mapStateToProps = (state) => {
    return state.user;
};

export default connect(mapStateToProps)(withStyles(regPopupStyle)(RegPopup));
