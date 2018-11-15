import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Icon from "@material-ui/core/Icon/Icon";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Slide from "@material-ui/core/Slide";
import withStyles from "@material-ui/core/styles/withStyles";
import Mail from "@material-ui/icons/Mail";
import Button from "app/common/button/Button";
import Card from "app/common/card/Card";
import CardBody from "app/common/card/CardBody";
import CardHeader from "app/common/card/CardHeader";
import AppIcon from "app/common/icon/AppIcon";
import CustomInput from "app/common/input/CustomInput";
import LocalLink from "app/common/misc/LocalLink";
import {buttonColor, popupHeaderColor} from "app/common/style/styles";

import util from "app/utils/util"
import React from "react";

import loginPopupStyle from "./loginPopupStyle";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class LoginPopup extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            emailValid: true,
            passwordValid: true,
            enterButtonActive: true,
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleSignin = this.handleSignin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleEmailChange = (e) => {
        const email = e.target.value;
        let {passwordValid, emailValid} = this.state;
        if (!emailValid) {
            emailValid = util.validate.checkEmail(email);
        }
        const enterButtonActive = emailValid && passwordValid;
        this.setState({...this.state, email, emailValid, enterButtonActive})
    };

    handlePasswordChange = (e) => {
        const password = e.target.value;
        let {passwordValid, emailValid} = this.state;
        if (!passwordValid) {
            passwordValid = util.validate.isNotBlank(password);
        }
        const enterButtonActive = emailValid && passwordValid;
        this.setState({...this.state, password, passwordValid, enterButtonActive})
    };
    checkIsFormValid = (state) => {
        const emailValid = util.validate.checkEmail(state.email);
        const passwordValid = util.validate.isNotBlank(state.password);
        const formValid = emailValid && passwordValid;
        this.setState({...this.state, emailValid, passwordValid, enterButtonActive: formValid})
        return formValid;
    };
    handleClose = (e) => {
        e.stopPropagation();
        util.navigate.goToPreviousUrl(this.props.history);
    };
    handleSignin = (e) => {
        e.stopPropagation();
        if (!this.checkIsFormValid(this.state)) {
            return;
        }
        this.handleClose(e);
    };

    render() {
        const {classes} = this.props;
        const {
            email, password,
            emailValid, passwordValid, enterButtonActive
        } = this.state;

        return (
            <Dialog
                classes={{
                    root: classes.modalRoot,
                    paper: classes.modal + " " + classes.modalLogin
                }}
                open={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="login-modal-slide-title"
                aria-describedby="login-modal-slide-description">
                <Card plain className={classes.modalLoginCard}>
                    <DialogTitle
                        id="login-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}>
                        <CardHeader
                            plain
                            color={popupHeaderColor}
                            className={`${classes.textCenter} ${classes.cardLoginHeader}`}>
                            <Button
                                simple
                                className={classes.modalCloseButton}
                                key="close"
                                round
                                aria-label="Закрыть"
                                onClick={this.handleClose}>
                                {" "}
                                <AppIcon name="close" className={classes.modalClose}/>
                            </Button>
                            <h5 className={classes.cardTitleWhite}>LC Cosmetics</h5>
                            <div className={classes.socialLine}>
                                <Button
                                    justIcon link className={classes.socialLineButton}>
                                    <AppIcon name="fab fa-vk"/>
                                </Button>
                                <Button
                                    justIcon link className={classes.socialLineButton}>
                                    <AppIcon name="fab fa-facebook-square"/>
                                </Button>
                                <Button
                                    justIcon link className={classes.socialLineButton}>
                                    <AppIcon name="fab fa-google-plus-g"/>
                                </Button>
                            </div>
                        </CardHeader>
                    </DialogTitle>
                    <form>
                        <DialogContent
                            id="login-modal-slide-description"
                            className={classes.modalBody}>
                            <CardBody className={classes.cardLoginBody}>
                                <CustomInput
                                    id="login-modal-email"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Mail className={classes.icon}/>
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
                                    id="login-modal-pass"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Icon className={classes.icon}>
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
                            </CardBody>
                        </DialogContent>
                        <DialogActions className={`${classes.modalFooter} ${classes.justifyContentCenter}`}>
                            <Button color={buttonColor} onClick={this.handleSignin}
                                    disabled={!enterButtonActive}>
                                Войти
                            </Button>
                        </DialogActions>
                        <div className={classes.textCenter}>
                            <LocalLink to="/auth/signup" modal replace>Зарегистрироваться</LocalLink>
                        </div>
                    </form>
                </Card>
            </Dialog>
        )
    }
}

export default withStyles(loginPopupStyle)(LoginPopup);
