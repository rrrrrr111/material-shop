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
import ErrorMessageBox from "app/common/message/ErrorMessageBox";
import CircularLoading from "app/common/misc/CircularLoading";
import {buttonColor} from "app/common/style/styles";
import ProfileTab from "app/user/profile/ProfileTab";
import userProfileStyle from "app/user/profile/userProfileStyle";
import {mapUserToProps, USER_DATA, USER_START_LOADING, USER_STOP_LOADING} from "app/user/reducer";
import {buttonDebounceRule, classNames, connect, debounce, updateUiField} from "app/utils/functionUtil";
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
                loading: false,
                message: "",
            },
        };
        this.validator = util.validate.createValidator(this, {
                fieldsToCheckers: {
                    agreementChecked: isBoolean,
                },
                formValidField: 'formValid',
            }
        );
        this.handleSave = this.handleSave.bind(this);
    };

    static getDerivedStateFromProps(props, state) {
        if (state.data.editDate !== props.data.editDate) {
            return {
                ...state,
                data: SettingsTab.getStateDataFromProps(props)
            };
        }
        return null;
    };

    static getStateDataFromProps = (props) => {
        return {
            personId: props.data.id,
            agreementChecked: props.data.agreementChecked,
            personEditDate: props.data.editDate
        };
    };

    componentDidMount() {
        if (!this.props.ui.loaded) {
            ProfileTab.reloadUser();
        }
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

            util.ajax.backendPost("user/save-settings", {...compRef.state.data})
                .then(function (response) {
                    updateUiField(compRef, "message", response.message);
                    dispatch(USER_STOP_LOADING);

                    if (response.success) {
                        dispatch(USER_DATA, {
                            ...compRef.props.data,
                            agreementChecked: compRef.state.data.agreementChecked,
                            editDate: response.editDate,
                        });
                        util.notify.dataSaved();
                    }
                });
        }), 1000, buttonDebounceRule);

    render() {
        const {classes} = this.props;
        const {
            loading
        } = this.props.ui;
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
                                            classes={{agreementChecked: classes.agreementChecked}}
                                            disabled={loading}
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
                        {loading
                            ? <CircularLoading/>
                            : <Button color={buttonColor} className={classes.cardFooterButton}
                                      onClick={this.handleSave}
                                      disabled={!formValid || loading}>
                                Сохранить
                            </Button>
                        }
                        <ErrorMessageBox text={message}/>
                    </div>
                </CardFooter>
            </Card>
        );
    };
}

export default connect(mapUserToProps)(withStyles(userProfileStyle)(SettingsTab));
