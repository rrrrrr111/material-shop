import Grid from "@material-ui/core/Grid";
import GridContainer from "app/common/grid/GridContainer";
import CustomInput from "app/common/theme/input/CustomInput";
import {inputHandler, prepareHandler} from "app/utils/validateUtil";
import React from "react";


function DeliveryAddressStreet(props) {
    const {stateComponent, disabled} = props;
    const {
        street, house, housing, construction, apartment, entrance, intercom, addressComment,
    } = props.data;
    const {
        streetValid, houseValid, housingValid, constructionValid, apartmentValid, entranceValid, intercomValid, addressCommentValid,
    } = props.ui;

    return (
        <GridContainer spacing={16}>
            <Grid item xs={12} sm={6}>
                <CustomInput
                    labelText="Улица"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        autoComplete: "on",
                        name: "Street",
                        value: street,
                        onChange: prepareHandler(
                            stateComponent,
                            'person.address.street',
                            inputHandler),
                        error: !streetValid
                    }}
                    otherProps={{
                        maxLength: 200,
                    }}
                    disabled={disabled}
                />
            </Grid>
            <Grid item xs={4} sm={2}>
                <CustomInput
                    labelText="Дом"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        autoComplete: "on",
                        name: "House",
                        value: house,
                        onChange: prepareHandler(
                            stateComponent,
                            'person.address.house',
                            inputHandler),
                        error: !houseValid
                    }}
                    otherProps={{
                        maxLength: 10,
                    }}
                    disabled={disabled}
                />
            </Grid>
            <Grid item xs={4} sm={2}>
                <CustomInput
                    labelText="Корпус"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        autoComplete: "on",
                        name: "Housing",
                        value: housing,
                        onChange: prepareHandler(
                            stateComponent,
                            'person.address.housing',
                            inputHandler),
                        error: !housingValid
                    }}
                    otherProps={{
                        maxLength: 10,
                    }}
                    disabled={disabled}
                />
            </Grid>
            <Grid item xs={4} sm={2}>
                <CustomInput
                    labelText="Строение"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        autoComplete: "on",
                        name: "Construction",
                        value: construction,
                        onChange: prepareHandler(
                            stateComponent,
                            'person.address.construction',
                            inputHandler),
                        error: !constructionValid
                    }}
                    otherProps={{
                        maxLength: 10,
                    }}
                    disabled={disabled}
                />
            </Grid>
            <Grid item xs={12} sm={6}/>
            <Grid item xs={4} sm={2}>
                <CustomInput
                    labelText="Квартира"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        autoComplete: "on",
                        name: "Apartment",
                        value: apartment,
                        onChange: prepareHandler(
                            stateComponent,
                            'person.address.apartment',
                            inputHandler),
                        error: !apartmentValid
                    }}
                    otherProps={{
                        maxLength: 10,
                    }}
                    disabled={disabled}
                />
            </Grid>
            <Grid item xs={4} sm={2}>
                <CustomInput
                    labelText="Подъезд"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        autoComplete: "on",
                        name: "Entrance",
                        value: entrance,
                        onChange: prepareHandler(
                            stateComponent,
                            'person.address.entrance',
                            inputHandler),
                        error: !entranceValid
                    }}
                    otherProps={{
                        maxLength: 10,
                    }}
                    disabled={disabled}
                />
            </Grid>
            <Grid item xs={4} sm={2}>
                <CustomInput
                    labelText="Домофон"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        autoComplete: "on",
                        name: "Intercom",
                        value: intercom,
                        onChange: prepareHandler(
                            stateComponent,
                            'person.address.intercom',
                            inputHandler),
                        error: !intercomValid
                    }}
                    otherProps={{
                        maxLength: 10,
                    }}
                    disabled={disabled}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomInput
                    id="address-comment"
                    labelText="Комментарий к доставке"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        autoComplete: "on",
                        multiline: true,
                        rows: 3,
                        value: addressComment,
                        onChange: prepareHandler(
                            stateComponent,
                            'person.address.addressComment',
                            inputHandler),
                        error: !addressCommentValid
                    }}
                    otherProps={{
                        maxLength: 1000,
                    }}
                    disabled={disabled}
                />
            </Grid>
        </GridContainer>
    );
}

export default DeliveryAddressStreet;
