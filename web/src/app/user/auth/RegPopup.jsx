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
import LocalLink from "app/common/misc/LocalLink";
import {buttonColor} from "app/common/style/styles";

import util from "app/utils/util"
import classNames from "classnames";
import React from "react";
import regPopupStyle from "./regPopupStyle";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class RegPopup extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            password: "",
            aggrChecked: false,

            emailValid: true,
            firstNameValid: true,
            passwordValid: true,
            enterButtonActive: true,
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleAggrToggle = this.handleAggrToggle.bind(this);
    }

    handleEmailChange = (e) => {
        const email = e.target.value;
        let {firstNameValid, passwordValid, emailValid, aggrChecked} = this.state;
        if (!emailValid) {
            emailValid = util.validate.checkEmail(email);
        }
        const enterButtonActive = emailValid && passwordValid && firstNameValid && aggrChecked;
        this.setState({...this.state, email, emailValid, enterButtonActive})
    };

    handleFirstNameChange = (e) => {
        const firstName = e.target.value;
        let {firstNameValid, passwordValid, emailValid, aggrChecked} = this.state;
        if (!firstNameValid) {
            firstNameValid = util.validate.isNotBlank(firstName);
        }
        const enterButtonActive = emailValid && passwordValid && firstNameValid && aggrChecked;
        this.setState({...this.state, firstName, firstNameValid, enterButtonActive})
    };

    handlePasswordChange = (e) => {
        const password = e.target.value;
        let {firstNameValid, passwordValid, emailValid, aggrChecked} = this.state;
        if (!passwordValid) {
            passwordValid = util.validate.isNotBlank(password);
        }
        const enterButtonActive = emailValid && passwordValid && firstNameValid && aggrChecked;
        this.setState({...this.state, password, passwordValid, enterButtonActive})
    };

    handleAggrToggle(e) {
        let {firstNameValid, passwordValid, emailValid, aggrChecked} = this.state;
        aggrChecked = !aggrChecked;
        const enterButtonActive = emailValid && passwordValid && firstNameValid && aggrChecked;
        this.setState({...this.state, aggrChecked, enterButtonActive})
    }

    checkIsFormValid = (state) => {
        const {firstName, password, email, aggrChecked} = state;
        const emailValid = util.validate.checkEmail(email);
        const firstNameValid = util.validate.isNotBlank(firstName);
        const passwordValid = util.validate.isNotBlank(password);
        const formValid = emailValid && passwordValid && firstNameValid && aggrChecked;
        this.setState({...this.state, emailValid, passwordValid, firstNameValid, enterButtonActive: formValid})
        return formValid;
    };

    handleClose = (e) => {
        e.stopPropagation();
        util.navigate.goToPreviousUrl(this.props.history);
    };

    handleSignup = (e) => {
        e.stopPropagation();
        if (!this.checkIsFormValid(this.state)) {
            return;
        }
        this.handleClose(e);
    };

    render() {
        const {classes} = this.props;
        const {
            email, password, firstName, aggrChecked,
            emailValid, passwordValid, firstNameValid, enterButtonActive
        } = this.state;
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
                                                                icon={<Check className={classes.uncheckedIcon}/>}
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

export default withStyles(regPopupStyle)(RegPopup);
