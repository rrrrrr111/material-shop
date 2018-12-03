import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import ErrorMessage from "app/common/message/ErrorMessage";
import NeedLoginMessage from "app/common/message/NeedLoginMessage";
import CircularLoading from "app/common/misc/CircularLoading";
import {buttonColor} from "app/common/style/styleConsts";
import Button from "app/common/theme/button/Button.jsx";
import Card from "app/common/theme/card/Card.jsx";
import CardBody from "app/common/theme/card/CardBody.jsx";
import CardFooter from "app/common/theme/card/CardFooter.jsx";
import CustomInput from "app/common/theme/input/CustomInput";
import userProfileStyle from "app/user/profile/userProfileStyle";
import {USER_DATA, USER_START_LOADING, USER_STOP_LOADING} from "app/user/reducer";
import {ajaxDebounceTimeout, buttonDebounceRule, debounce, updateUiField} from "app/utils/functionUtil";
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
                revalidateAllOnChange: true,
            }
        );
        this.handleChangePassword = this.handleChangePassword.bind(this);
    };

    checkNewPassword1 = (passw, data) => {
        return (isNotEmpty(passw) && passw === data.newPassword2);
    };

    checkNewPassword2 = (passw, data) => {
        return (isNotEmpty(passw) && passw === data.newPassword1);
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
                    personId: compRef.props.userData.id,
                    oldPassword: compRef.state.data.oldPassword,
                    newPassword: compRef.state.data.newPassword1,
                    personEditDate: compRef.props.userData.editDate,
                }
            }).then((response) => {
                updateUiField(compRef, "message", response.message);
                if (response.success) {
                    dispatch(USER_DATA, {
                        ...compRef.props.userData,
                        editDate: response.personEditDate,
                    });
                    util.notify.passwordChanged();
                } else {
                    dispatch(USER_STOP_LOADING);
                }
            });
        }), ajaxDebounceTimeout, buttonDebounceRule);

    render() {
        const {classes} = this.props;
        const {
            loading, loaded
        } = this.props.userUi;
        const disabled = loading || !loaded;
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
                                disabled={disabled}
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
                                disabled={disabled}
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
                                disabled={disabled}
                            />
                        </GridItem>
                    </GridContainer>
                </CardBody>
                <CardFooter>
                    <div className={classes.width100}>
                        <CircularLoading show={loading}>
                            <Button color={buttonColor} className={classes.cardFooterButton}
                                    onClick={this.handleChangePassword}
                                    disabled={disabled || !formValid}>
                                Сменить пароль
                            </Button>
                        </CircularLoading>
                        <ErrorMessage>{message}</ErrorMessage>
                        <NeedLoginMessage show={!loaded && !loading}/>
                    </div>
                </CardFooter>
            </Card>
        );
    }
}

export default withStyles(userProfileStyle)(PasswordTab);
