import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Card from "../../lib/components/Card/Card";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import CardHeader from "../../lib/components/Card/CardHeader";
import Button from "../../lib/components/CustomButtons/Button";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import CardBody from "../../lib/components/Card/CardBody";
import CustomInput from "../../lib/components/CustomInput/CustomInput";
import Close from "@material-ui/icons/Close";
import Mail from "@material-ui/icons/Mail";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Icon from "@material-ui/core/Icon/Icon";
import Slide from "@material-ui/core/Slide";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";

import signinPopupStyle from "./signinPopupStyle";
import {buttonColor, popupHeaderColor} from "../common/styles";
import VkIcon from "../common/icon/VkIcon";
import GooglePlusIcon from "../common/icon/GooglePlusIcon";


function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class SigninPopup extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleSignin = this.handleSignin.bind(this);

    }

    handleClose = (e) => {
        e.stopPropagation();

        const location = this.props.location;
        if (location.state && location.state.modal) {
            this.props.history.goBack();
        } else {
            this.props.history.push("/")
        }
    };
    handleSignin = (e) => {
        // todo ajax sign in
        this.handleClose(e);
    };

    render() {
        const {classes} = this.props;

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
                        className={classes.modalHeader}
                    >
                        <CardHeader
                            plain
                            color={popupHeaderColor}
                            className={`${classes.textCenter} ${classes.cardLoginHeader}`}
                        >
                            <Button
                                simple
                                className={classes.modalCloseButton}
                                key="close"
                                round
                                aria-label="Закрыть"
                                onClick={this.handleClose}
                            >
                                {" "}
                                <Close className={classes.modalClose}/>
                            </Button>
                            <h5 className={classes.cardTitleWhite}>LC Cosmetics</h5>
                            <div className={classes.socialLine}>
                                <Button
                                    justIcon
                                    link
                                    className={classes.socialLineButton}>
                                    <VkIcon/>
                                </Button>
                                <Button
                                    justIcon
                                    link
                                    className={classes.socialLineButton}>
                                    <GooglePlusIcon/>
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
                                        placeholder: "E-mail...",
                                        name: "E-mail",
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
                                    }}
                                />
                            </CardBody>
                        </DialogContent>
                        <DialogActions
                            className={`${classes.modalFooter} ${
                                classes.justifyContentCenter
                                }`}
                        >
                            <Button color={buttonColor}
                                    onClick={this.handleSignin}
                                    type="submit"
                            >
                                Войти
                            </Button>
                        </DialogActions>
                    </form>
                </Card>
            </Dialog>
        )
    }
}

export default withStyles(signinPopupStyle)(SigninPopup);
