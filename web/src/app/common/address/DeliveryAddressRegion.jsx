import Grid from "@material-ui/core/Grid";
import CustomInput from "app/common/theme/input/CustomInput";
import SelectInput from "app/common/theme/input/SelectInput";
import util from "app/utils/util";
import {inputHandler, prepareHandler} from "app/utils/validateUtil";
import React from "react";


class DeliveryAddressRegion extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isTownEditable: false,
        };
        this.regionHandler = this.regionHandler.bind(this);
    }

    regionHandler = (compRef, fieldName, event) => {
        const value = event.target.value;
        let isTownEditable;
        if (value === '77' || value === '78') {
            inputHandler(compRef, 'person.address.town', {target: {value: ""}});
            isTownEditable = false;
        } else {
            isTownEditable = true;
        }
        this.setState({isTownEditable});
        inputHandler(compRef, fieldName, event);
    };

    render() {
        const {stateComponent, disabled} = this.props;
        const {
            region, town,
        } = this.props.data;
        const {
            regionValid, townValid,
        } = this.props.ui;

        return (
            <Grid container spacing={16}>
                <Grid xs={6} item>
                    <SelectInput
                        id="region"
                        labelText="Регион"
                        fakeItemText="Выберите регион"
                        value={region}
                        onChange={prepareHandler(stateComponent, 'person.address.region', this.regionHandler)}
                        error={!regionValid}
                        options={util.dictionary.regionDict.values}
                        disabled={disabled}
                    />
                </Grid>
                <Grid xs={6} item>
                    <CustomInput
                        labelText="Населенный пункт"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            autoComplete: "on",
                            name: "Town",
                            value: town,
                            onChange: prepareHandler(stateComponent, 'person.address.town', inputHandler),
                            error: !townValid
                        }}
                        otherProps={{
                            maxLength: 100,
                        }}
                        disabled={disabled || !this.state.isTownEditable}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default DeliveryAddressRegion;
