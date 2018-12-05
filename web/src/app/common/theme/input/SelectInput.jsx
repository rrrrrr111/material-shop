import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import customSelectStyle from "app/common/theme/input/customSelectStyle";
import PropTypes from "prop-types";
import React from "react";

class SelectInput extends React.PureComponent {
    render() {
        const {
            id,
            labelText,
            fakeItemText,
            value,
            valueField,
            displayField,
            onChange,
            options,
            classes
        } = this.props;
        return (
            <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel htmlFor={id} className={classes.selectLabel}>
                    {labelText}
                </InputLabel>
                <Select
                    MenuProps={{
                        className: classes.selectMenu
                    }}
                    classes={{
                        select: classes.select
                    }}
                    value={value ? value : ""}
                    onChange={onChange}
                    inputProps={{name: id, id: id}}
                >
                    <MenuItem key={-1}
                              disabled
                              classes={{
                                  root: classes.selectMenuItem
                              }}>
                        {fakeItemText}
                    </MenuItem>

                    {options.map((item, index) => {
                        return (
                            <MenuItem key={index}
                                      classes={{
                                          root: classes.selectMenuItem,
                                          selected: classes.selectMenuItemSelected
                                      }}
                                      value={item[valueField]}
                            >
                                {item[displayField]}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        );
    }

    static defaultProps = {
        valueField: "id",
        displayField: "name",
    };

    static propTypes = {
        classes: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        labelText: PropTypes.string.isRequired,
        fakeItemText: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        valueField: PropTypes.string.isRequired,
        displayField: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
    };
}

export default withStyles(customSelectStyle)(SelectInput);
