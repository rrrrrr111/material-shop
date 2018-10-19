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
import AppIcon from "app/common/icon/AppIcon";
import CustomInput from "app/common/input/CustomInput";
import LocalLink from "app/common/misc/LocalLink";
import {buttonColor} from "app/common/styles";

import util from "app/utils/util"
import classNames from "classnames";
import Card from "lib/components/Card/Card";
import CardBody from "lib/components/Card/CardBody";
import React from "react";
import regPopupStyle from "./regPopupStyle";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class RegPopup extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            aggrCheckboxChecked: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleAggrCheckboxToggle = this.handleAggrCheckboxToggle.bind(this);
    }

    handleClose = (e) => {
        e.stopPropagation();
        util.navigate.goToPreviousUrl(this.props.location, this.props.history);
    };
    handleSignup = (e) => {
        e.stopPropagation();
        // todo ajax sign up
        this.handleClose(e);
    };

    handleAggrCheckboxToggle(e) {
        this.setState({
            aggrCheckboxChecked: !this.state.aggrCheckboxChecked
        });
    }

    render() {
        const {classes} = this.props;
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
                                    }}
                                    otherProps={{
                                        maxLength: 100,
                                    }}
                                />
                                <FormControlLabel className={classes.termAndCondAgreementBox}
                                                  classes={{label: classes.label}}
                                                  control={
                                                      <Checkbox tabIndex={-1}
                                                                onClick={this.handleAggrCheckboxToggle}
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
                                            disabled={!this.state.aggrCheckboxChecked}>
                                        Зарегистрироваться
                                    </Button>
                                </div>
                            </CardBody>
                        </DialogContent>
                        <div className={classes.textCenter}>
                            <LocalLink to="/auth/signin"> Войти </LocalLink>
                        </div>
                    </form>
                </Card>
            </Dialog>
        )
    }
}

export default withStyles(regPopupStyle)(RegPopup);
