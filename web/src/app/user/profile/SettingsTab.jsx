import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import Check from "@material-ui/icons/Check";
import Button from "app/common/button/Button.jsx";
import Card from "app/common/card/Card.jsx";
import CardBody from "app/common/card/CardBody.jsx";
import CardFooter from "app/common/card/CardFooter.jsx";
import GridContainer from "app/common/grid/GridContainer.jsx";
import GridItem from "app/common/grid/GridItem.jsx";
import ErrorMessage from "app/common/message/ErrorMessage";
import NeedLoginMessage from "app/common/message/NeedLoginMessage";
import CircularLoading from "app/common/misc/CircularLoading";
import {buttonColor} from "app/common/style/styles";
import userProfileStyle from "app/user/profile/userProfileStyle";
import {USER_DATA, USER_START_LOADING, USER_STOP_LOADING} from "app/user/reducer";
import {ajaxDebounceTimeout, buttonDebounceRule, classNames, debounce, updateUiField} from "app/utils/functionUtil";
import util from "app/utils/util";
import {checkboxHandler, isBoolean, prepareHandler} from "app/utils/validateUtil";
import React from "react";
import {dispatch} from "store";

class SettingsTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: SettingsTab.getStateDataFromProps(props),
            ui: {
                agreementCheckedValid: true,
                formValid: true,
                message: "",
            },
        };
        this.validator = util.validate.createValidator(this, {
                fieldsToCheckers: {
                    agreementChecked: isBoolean,
                },
            }
        );
        this.handleSave = this.handleSave.bind(this);
    };

    static getDerivedStateFromProps(props, state) {
        if (state.data.personEditDate !== props.userData.editDate) {
            return {
                ...state,
                data: SettingsTab.getStateDataFromProps(props)
            };
        }
        return null;
    };

    static getStateDataFromProps = (props) => {
        const userData = props.userData;
        return {
            personId: userData.id,
            agreementChecked: userData.agreementChecked,
            personEditDate: userData.editDate
        };
    };

    handleSave = (e) => {
        e.stopPropagation();
        if (!this.validator.isFormValid()) {
            return;
        }
        this._debouncedSave();
    };

    _debouncedSave = debounce(
        (() => {
            const compRef = this;
            updateUiField(compRef, "message", "");
            dispatch(USER_START_LOADING);

            util.ajax.backendPost("user/save-settings", {settingsChange: {...compRef.state.data}})
                .then(function (response) {
                    updateUiField(compRef, "message", response.message);
                    dispatch(USER_STOP_LOADING);

                    if (response.success) {
                        dispatch(USER_DATA, {
                            ...compRef.props.userData,
                            agreementChecked: compRef.state.data.agreementChecked,
                            editDate: response.personEditDate,
                        });
                        util.notify.dataSaved();
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
            agreementChecked
        } = this.state.data;
        const {
            agreementCheckedValid, formValid, message
        } = this.state.ui;
        return (
            <Card className={classes.settingsTab}>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            tabIndex={-1}
                                            checked={agreementChecked}
                                            onClick={prepareHandler(this, 'agreementChecked', checkboxHandler)}
                                            checkedIcon={<Check className={classes.checkedIcon}/>}
                                            icon={<Check
                                                className={
                                                    classNames({
                                                        [classes.uncheckedIcon]: true,
                                                        "redShadow": !agreementCheckedValid
                                                    })}/>}
                                            disabled={disabled}
                                        />

                                    }
                                    classes={{label: classes.label}}
                                    label="Получать сообщения о распродажах, акциях, скидках и новостях компании"
                                />
                            </div>
                        </GridItem>
                    </GridContainer>
                </CardBody>
                <CardFooter>
                    <div className={classes.width100}>
                        <CircularLoading>
                            <Button color={buttonColor} className={classes.cardFooterButton}
                                    onClick={this.handleSave}
                                    disabled={disabled || !formValid}>
                                Сохранить
                            </Button>
                        </CircularLoading>
                        <ErrorMessage>{message}</ErrorMessage>
                        <NeedLoginMessage show={!loaded && !loading}/>
                    </div>
                </CardFooter>
            </Card>
        );
    };
}

export default withStyles(userProfileStyle)(SettingsTab);
