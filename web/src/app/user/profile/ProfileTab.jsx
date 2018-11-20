import withStyles from "@material-ui/core/styles/withStyles";
import Button from "app/common/button/Button.jsx";
import Card from "app/common/card/Card.jsx";
import CardBody from "app/common/card/CardBody.jsx";
import CardFooter from "app/common/card/CardFooter.jsx";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import CustomInput from "app/common/input/CustomInput.jsx";
import {buttonColor} from "app/common/style/styles";
import userProfileStyle from "app/user/profile/userProfileStyle";
import {USER_DATA} from "app/user/reducer";
import {action, buttonDebounceRule, update2UiFields} from "app/utils/functionUtil";
import util from "app/utils/util";
import {checkEmail, isNotBlank} from "app/utils/validateUtil";
import debounce from 'lodash/debounce'
import React from "react";
import {store} from "store";

class ProfileTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            ui: {
                firstNameValid: true,
                lastNameValid: true,
                phoneValid: true,
                emailValid: true,
                enterButtonActive: true,
                loading: false,
                message: "",
            },
        };
        this.validator = util.validate.createValidator(this, {
                fieldsToCheckers: {
                    firstName: isNotBlank,
                    lastName: isNotBlank,
                    email: checkEmail,
                    phone: isNotBlank,
                },
                formValidField: 'enterButtonActive',
                disabled: false,
            }
        );
        this.handleSave = this.handleSave.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
    }

    handleFirstNameChange = (e) => {
        this.validator.handleChange('firstName', e.target.value.trim());
    };

    handleLastNameChange = (e) => {
        this.validator.handleChange('lastName', e.target.value.trim());
    };

    handleEmailChange = (e) => {
        this.validator.handleChange('email', e.target.value.trim());
    };

    handlePhoneChange = (e) => {
        this.validator.handleChange('phone', e.target.value.trim());
    };

    handleSave = (e) => {
        e.stopPropagation();
        if (!this.validator.isFormValid()) {
            return;
        }
        this._debouncedSave();
    };

    _debouncedSave = debounce( // для избежания двойного клика
        () => {
            const compRef = this;
            update2UiFields(compRef, "loading", true, "message", "");

            util.ajax.backendPost("user/save", {person: compRef.state.data})
                .then(function (response) {
                    update2UiFields(compRef, "loading", false, "message", response.message);
                    const isError = !!(response.message);

                    if (!isError) {
                        store.dispatch(action(USER_DATA, response.person));
                        util.notify.dataSaved();
                    }
                });
        }, 500, buttonDebounceRule);

    render() {
        const {classes} = this.props;
        return (
            <form>
                <Card className={classes.profileTab}>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Имя"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        autoComplete: "on",
                                        name: "First name",
                                    }}
                                    otherProps={{
                                        maxLength: 100,
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Фамилия"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        autoComplete: "on",
                                        name: "Last name",
                                    }}
                                    otherProps={{
                                        maxLength: 100,
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Телефон"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        autoComplete: "on",
                                        name: "Phone",
                                    }}
                                    numberProps={{
                                        format: "+7 (###) ###-####",
                                        mask: "_",
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Email"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        autoComplete: "on",
                                        name: "Email",
                                    }}
                                    otherProps={{
                                        maxLength: 200,
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                    <CardFooter>
                        <div className={classes.width100}>
                            <Button color={buttonColor} className={classes.cardFooterButton}>
                                Обновить профиль
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        );
    }
}

export default withStyles(userProfileStyle)(ProfileTab);
