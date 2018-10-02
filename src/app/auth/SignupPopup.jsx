import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Card from "../../lib/components/Card/Card";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Button from "../../lib/components/CustomButtons/Button";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import CustomInput from "../../lib/components/CustomInput/CustomInput";
import Close from "@material-ui/icons/Close";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Icon from "@material-ui/core/Icon/Icon";
import Slide from "@material-ui/core/Slide";

import util from "../utils/util"
import classNames from "classnames";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {Check, Email, Face} from "@material-ui/icons";
import signupPopupStyle from "./signupPopupStyle";
import {buttonColor} from "../common/styles";

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class SignupPopup extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            aggrCheckboxChecked: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleSignin = this.handleSignin.bind(this);
        this.handleAggrCheckboxToggle = this.handleAggrCheckboxToggle.bind(this);
    }

    handleClose = (e) => {
        e.stopPropagation();
        util.navigate.goToPreviousUrl(this.props.location, this.props.history);
    };
    handleSignin = (e) => {
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
                classes={{
                    root: classes.modalRoot,
                    paper: classes.modal + " " + classes.modalSignup
                }}
                open={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="signup-modal-slide-title"
                aria-describedby="signup-modal-slide-description"
            >
                <Card plain className={classes.modalSignupCard}>
                    <DialogTitle
                        id="signup-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}
                    >
                        <Button
                            simple
                            className={classNames(classes.modalCloseButton, classes.right)}
                            round
                            key="close"
                            aria-label="Закрыть"
                            onClick={this.handleClose}
                        >
                            {" "}
                            <Close className={classes.modalClose}/>
                        </Button>
                        <h3
                            className={`${classes.cardTitle} ${
                                classes.modalTitle
                                }`}
                        >
                            Регистрация
                        </h3>
                    </DialogTitle>
                    <DialogContent
                        id="signup-modal-slide-description"
                        className={classes.modalBody}
                    >
                        <div className={classes.textCenter}>
                            <Button justIcon round color="vk">
                                <i className="fab fa-vk"/>
                            </Button>
                            {` `}
                            <Button justIcon round color="facebook">
                                <i className="fab fa-facebook-f"/>
                            </Button>
                            {` `}
                            <Button justIcon round color="google">
                                <i className="fab fa-google"/>
                            </Button>
                            {` `}
                        </div>
                        <form className={classes.form}>
                            <CustomInput
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    startAdornment: (
                                        <InputAdornment
                                            position="start"
                                            className={classes.inputAdornment}
                                        >
                                            <Face
                                                className={classes.inputAdornmentIcon}
                                            />
                                        </InputAdornment>
                                    ),
                                    autoComplete: "on",
                                    placeholder: "Имя...",
                                    name: "Name",
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
                                            className={classes.inputAdornment}
                                        >
                                            <Email
                                                className={classes.inputAdornmentIcon}
                                            />
                                        </InputAdornment>
                                    ),
                                    autoComplete: "on",
                                    placeholder: "Email...",
                                    name: "Email",
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
                                            className={classes.inputAdornment}
                                        >
                                            <Icon
                                                className={classes.inputAdornmentIcon}
                                            >
                                                lock_outline
                                            </Icon>
                                        </InputAdornment>
                                    ),
                                    autoComplete: "on",
                                    placeholder: "Пароль...",
                                    type: "password",
                                    name: "password",
                                }}
                            />
                            <FormControlLabel
                                classes={{
                                    label: classes.label
                                }}
                                control={
                                    <Checkbox
                                        tabIndex={-1}
                                        onClick={this.handleAggrCheckboxToggle}
                                        checkedIcon={
                                            <Check className={classes.checkedIcon}/>
                                        }
                                        icon={
                                            <Check
                                                className={classes.uncheckedIcon}
                                            />
                                        }
                                        classes={{
                                            checked: classes.checked
                                        }}
                                    />
                                }
                                label={
                                    <span>
                                                I agree to the{" "}
                                        <a href="#pablo">terms and conditions</a>
                                                .
                                            </span>
                                }
                            />
                            <div className={classes.textCenter}>
                                <Button color={buttonColor}
                                        type="submit"
                                >
                                    Зарегистрироваться
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Card>
            </Dialog>
        )
    }
}

export default withStyles(signupPopupStyle)(SignupPopup);
