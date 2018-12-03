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
import CustomCheckbox from "app/common/theme/input/CustomCheckbox";
import userProfileStyle from "app/user/profile/userProfileStyle";
import {USER_DATA, USER_START_LOADING, USER_STOP_LOADING} from "app/user/reducer";
import {ajaxDebounceTimeout, buttonDebounceRule, debounce, updateUiField} from "app/utils/functionUtil";
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
                checkers: {
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
        const {formValid, state} = this.validator.validate();
        if (!formValid) {
            this.setState(state);
            return;
        }
        this._debouncedSave(state);
    };

    _debouncedSave = debounce(
        ((state) => {
            const compRef = this;
            updateUiField(compRef, state, "message", "");
            dispatch(USER_START_LOADING)
                .then(() => {
                    return util.ajax.backendPost(
                        "user/save-settings", {
                            settingsChange: {...compRef.state.data}
                        }
                    );
                })
                .then((response) => {
                    updateUiField(compRef, this.state, "message", response.message);
                    if (response.success) {
                        dispatch(USER_DATA, {
                            ...compRef.props.userData,
                            agreementChecked: compRef.state.data.agreementChecked,
                            editDate: response.personEditDate,
                        });
                        util.notify.dataSaved();
                    } else {
                        dispatch(USER_STOP_LOADING);
                    }
                });
        }), ajaxDebounceTimeout, buttonDebounceRule);

    render() {
        const {classes} = this.props;
        const validator = this.validator;
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
                            <CustomCheckbox
                                checked={agreementChecked}
                                onClick={prepareHandler(validator, 'agreementChecked', checkboxHandler)}
                                disabled={disabled}
                                label="Получать сообщения о распродажах, акциях, скидках и новостях компании"
                            />
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
