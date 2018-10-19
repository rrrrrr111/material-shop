import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import inputStyle from "app/common/input/inputStyle";
import PropTypes from "prop-types";
import React from "react";

class SelectInput extends React.PureComponent {
    render() {
        const {
            id,
            labelText,
            fakeItemText,
            value,
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
                                      value={item.id}
                            >
                                {item.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        );
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        labelText: PropTypes.string.isRequired,
        fakeItemText: PropTypes.string.isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
    };
}

export default withStyles(inputStyle)(SelectInput);
