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
import ErrorMessageBox from "app/common/message/ErrorMessageBox";
import CircularLoading from "app/common/misc/CircularLoading";
import LocalLink from "app/common/misc/LocalLink";
import {buttonColor, popupHeaderColor} from "app/common/style/styles";
import SignoutComp from "app/user/auth/SignoutComp";
import {mapUserToProps, USER_AUTH_RESULT, USER_DATA, USER_START_LOADING, USER_STOP_LOADING} from "app/user/reducer";
import {action, buttonDebounceRule, connect, updateUiField} from "app/utils/functionUtil";

import util from "app/utils/util"
import {
    checkEmail,
    inputHandler,
    inputTrimHandler,
    isNotBlank,
    prepareEnterHandler,
    prepareHandler
} from "app/utils/validateUtil";
import debounce from 'lodash/debounce'
import React from "react";
import {store} from "store";

import loginPopupStyle from "./loginPopupStyle";

function Transition(props) {
    return <Slide direction="down" {...props}/>;
}

class LoginPopup extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: props.ui.loaded ? {
                email: "",
                password: "",
            } : {...props.data},
            ui: {
                emailValid: true,
                passwordValid: true,
                formValid: true,
                message: "",
            },
        };
        this.validator = util.validate.createValidator(this, {
                fieldsToCheckers: {
                    email: checkEmail,
                    password: isNotBlank,
                },
                formValidField: 'formValid',
            }
        );
        this.handleClose = this.handleClose.bind(this);
        this.handleSignin = this.handleSignin.bind(this);
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

    handleSignin = (e) => {
        e.stopPropagation();
        if (!this.validator.isFormValid()) {
            return;
        }
        this._debouncedSignin();
    };

    _debouncedSignin = debounce( // для избежания двойного клика
        () => {
            const compRef = this;
            updateUiField(compRef, "message", "");

            const propsPerson = compRef.props.data;
            const statePerson = compRef.state.data;
            store.dispatch(action(USER_START_LOADING));
            util.ajax.backendSignin(statePerson)
                .then((response) => {
                    store.dispatch(action(USER_STOP_LOADING));
                    const success = response.success;
                    let person = response.person;
                    if (!success) {
                        person = {...propsPerson, ...statePerson} // прокинем в глобальный стор, чтобы было уже введено на форме регистрации
                    }
                    store.dispatch(action(USER_DATA, person));
                    store.dispatch(action(USER_AUTH_RESULT, success));
                    updateUiField(compRef, "message", response.message);
                    if (success) {
                        compRef.handleClose();
                        util.notify.signIn();
                    }
                });
        }, 500, buttonDebounceRule);

    static show = () => {
        util.navigate.goToUrl("/auth/signin", {modal: true});
    };

    render() {
        const {classes} = this.props;
        const {
            loading
        } = this.props.ui;
        const {
            email, password
        } = this.state.data;
        const {
            emailValid, passwordValid, formValid, message
        } = this.state.ui;

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
                                        onChange: prepareHandler(this, 'email', inputTrimHandler),
                                        error: !emailValid
                                    }}
                                    otherProps={{
                                        maxLength: 200,
                                    }}
                                    disabled={loading}
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
                                        onChange: prepareHandler(this, 'password', inputHandler),
                                        error: !passwordValid,
                                        onKeyPress: prepareEnterHandler(this, this.handleSignin),
                                    }}
                                    otherProps={{
                                        maxLength: 100,
                                    }}
                                    disabled={loading}
                                />
                            </CardBody>
                        </DialogContent>
                        <DialogActions className={`${classes.modalFooter} ${classes.justifyContentCenter}`}>
                            {loading
                                ? <CircularLoading/>
                                : <Button color={buttonColor} onClick={this.handleSignin}
                                          disabled={!formValid || loading}>
                                    Войти
                                </Button>
                            }
                        </DialogActions>
                        <ErrorMessageBox text={message}/>
                        <div className={classes.textCenter}>
                            <LocalLink to="/auth/signup" modal replace>Зарегистрироваться</LocalLink>
                        </div>
                    </form>
                </Card>
            </Dialog>
        )
    }
}

export default connect(mapUserToProps)(withStyles(loginPopupStyle)(LoginPopup));
