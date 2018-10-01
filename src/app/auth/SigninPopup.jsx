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
import Face from "@material-ui/icons/Face";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Icon from "@material-ui/core/Icon/Icon";
import Slide from "@material-ui/core/Slide";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";

import signinPopupStyle from "./signinPopupStyle";


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
                onClose={(e) => this.handleClose(e)}
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
                            color="primary"
                            className={`${classes.textCenter} ${
                                classes.cardLoginHeader
                                }`}
                        >
                            <Button
                                simple
                                className={classes.modalCloseButton}
                                key="close"
                                aria-label="Close"
                                onClick={(e) => this.handleClose(e)}
                            >
                                {" "}
                                <Close className={classes.modalClose}/>
                            </Button>
                            <h5 className={classes.cardTitleWhite}>Log in</h5>
                            <div className={classes.socialLine}>
                                <Button
                                    justIcon
                                    link
                                    className={classes.socialLineButton}
                                >
                                    <i className="fab fa-facebook-square"/>
                                </Button>
                                <Button
                                    justIcon
                                    link
                                    className={classes.socialLineButton}
                                >
                                    <i className="fab fa-twitter"/>
                                </Button>
                                <Button
                                    justIcon
                                    link
                                    className={classes.socialLineButton}
                                >
                                    <i className="fab fa-google-plus-g"/>
                                </Button>
                            </div>
                        </CardHeader>
                    </DialogTitle>
                    <DialogContent
                        id="login-modal-slide-description"
                        className={classes.modalBody}
                    >
                        <form>
                            <p
                                className={`${classes.description} ${
                                    classes.textCenter
                                    }`}
                            >
                                Or Be Classical
                            </p>
                            <CardBody className={classes.cardLoginBody}>
                                <CustomInput
                                    id="login-modal-first"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Face className={classes.icon}/>
                                            </InputAdornment>
                                        ),
                                        placeholder: "First Name..."
                                    }}
                                />
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
                                        placeholder: "Email..."
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
                                        placeholder: "Password..."
                                    }}
                                />
                            </CardBody>
                        </form>
                    </DialogContent>
                    <DialogActions
                        className={`${classes.modalFooter} ${
                            classes.justifyContentCenter
                            }`}
                    >
                        <Button color="primary"
                                onClick={(e) => this.handleSignin(e)}>
                            Войти
                        </Button>
                    </DialogActions>
                </Card>
            </Dialog>
        )
    }
}

export default withStyles(signinPopupStyle)(SigninPopup);
