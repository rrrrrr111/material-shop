import withStyles from "@material-ui/core/styles/withStyles";
import Button from "app/common/button/Button.jsx";
import Card from "app/common/card/Card.jsx";
import CardBody from "app/common/card/CardBody.jsx";
import CardFooter from "app/common/card/CardFooter.jsx";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import CustomInput from "app/common/input/CustomInput";
import ErrorMessageBox from "app/common/message/ErrorMessageBox";
import CircularLoading from "app/common/misc/CircularLoading";
import {buttonColor} from "app/common/style/styles";
import userProfileStyle from "app/user/profile/userProfileStyle";
import {mapUserToProps, USER_DATA, USER_START_LOADING, USER_STOP_LOADING} from "app/user/reducer";
import {ajaxDebounceTimeout, buttonDebounceRule, connect, debounce, updateUiField} from "app/utils/functionUtil";
import util from "app/utils/util";
import {inputHandler, isNotEmpty, prepareEnterHandler, prepareHandler} from "app/utils/validateUtil";
import React from "react";
import {dispatch} from "store";

class PasswordTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                oldPassword: "",
                newPassword1: "",
                newPassword2: ""
            },
            ui: {
                oldPasswordValid: true,
                newPassword1Valid: true,
                newPassword2Valid: true,
                formValid: true,
                message: "",
            },
        };
        this.validator = util.validate.createValidator(this, {
                fieldsToCheckers: {
                    oldPassword: isNotEmpty,
                    newPassword1: this.checkNewPassword1,
                    newPassword2: this.checkNewPassword2,
                },
                formValidField: 'formValid',
            }
        );
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.checkNewPassword1 = this.checkNewPassword1.bind(this);
        this.checkNewPassword2 = this.checkNewPassword2.bind(this);
    };

    checkNewPassword1 = (str) => {
        return (isNotEmpty(str) && str === this.state.data.newPassword2);
    };

    checkNewPassword2 = (str) => {
        return (isNotEmpty(str) && str === this.state.data.newPassword1);
    };

    handleChangePassword = (e) => {
        e.stopPropagation();
        if (!this.validator.isFormValid()) {
            return;
        }
        this._debouncedChangePassword();
    };

    _debouncedChangePassword = debounce(
        (() => {
            const compRef = this;
            updateUiField(compRef, "message", "");
            dispatch(USER_START_LOADING);

            util.ajax.backendPost("user/change-password", {
                passwordChange: {
                    personId: compRef.props.data.id,
                    oldPassword: compRef.state.data.oldPassword,
                    newPassword: compRef.state.data.newPassword1,
                    personEditDate: compRef.props.data.editDate,
                }
            }).then((response) => {
                updateUiField(compRef, "message", response.message);
                dispatch(USER_STOP_LOADING);
                if (response.success) {
                    dispatch(USER_DATA, {
                        ...compRef.props.data,
                        editDate: response.personEditDate,
                    });
                    util.notify.passwordChanged();
                }
            });
        }), ajaxDebounceTimeout, buttonDebounceRule);

    render() {
        const {classes} = this.props;
        const {
            loading
        } = this.props.ui;
        const {
            oldPassword, newPassword1, newPassword2
        } = this.state.data;
        const {
            oldPasswordValid, newPassword1Valid, newPassword2Valid, formValid, message
        } = this.state.ui;
        return (
            <Card className={classes.passwordTab}>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Старый пароль"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    autoComplete: "new-password",
                                    type: "password",
                                    name: "old-password",
                                    value: oldPassword,
                                    onChange: prepareHandler(this, 'oldPassword', inputHandler),
                                    error: !oldPasswordValid,
                                }}
                                otherProps={{
                                    maxLength: 100,
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Новый пароль"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    autoComplete: "new-password",
                                    type: "password",
                                    name: "new-password-1",
                                    value: newPassword1,
                                    onChange: prepareHandler(this, 'newPassword1', inputHandler),
                                    error: !newPassword1Valid,
                                }}
                                otherProps={{
                                    maxLength: 100,
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Повторите новый пароль"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    autoComplete: "new-password",
                                    type: "password",
                                    name: "new-password-2",
                                    value: newPassword2,
                                    onChange: prepareHandler(this, 'newPassword2', inputHandler),
                                    error: !newPassword2Valid,
                                    onKeyPress: prepareEnterHandler(this, this.handleChangePassword),
                                }}
                                otherProps={{
                                    maxLength: 100,
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                </CardBody>
                <CardFooter>
                    <div className={classes.width100}>
                        {loading
                            ? <CircularLoading/>
                            : <Button color={buttonColor} className={classes.cardFooterButton}
                                      onClick={this.handleChangePassword}
                                      disabled={!formValid || loading}>
                                Сменить пароль
                            </Button>
                        }
                        <ErrorMessageBox text={message}/>
                    </div>
                </CardFooter>
            </Card>
        );
    }
}

export default connect(mapUserToProps)(withStyles(userProfileStyle)(PasswordTab));
