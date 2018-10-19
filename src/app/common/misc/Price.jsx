import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";
import {appStyles} from "app/common/styles";
import {title} from "lib/assets/jss/material-kit-pro-react";
import PropTypes from "prop-types";
import React from "react";
import NumberFormat from "react-number-format";


const style = theme => ({
    price: {
        ...appStyles(theme).nowrap,
        color: title.color,
        fontFamily: title.fontFamily,
        fontSize: "1.0625rem",
        fontWeight: title.fontWeight,
    },
    rubSign: {
        marginLeft: 4,
        fontSize: 13,
    },
    priceBig: {
        ...appStyles(theme).nowrap,
        color: title.color,
        fontFamily: title.fontFamily,
        fontWeight: title.fontWeight,
        fontSize: "1.5625rem",
        margin: "20px 40px 20px 40px",
    },
    rubSignBig: {
        marginLeft: 5,
        fontSize: 18,
    },
});

function Price({...props}) {
    const {classes, value, big} = props;
    return (
        <span className={big ? classes.priceBig : classes.price}>
            <NumberFormat value={value} displayType='text' thousandSeparator=' '/>
            <AppIcon className={big ? classes.rubSignBig : classes.rubSign} name="fas fa-ruble-sign"/>
        </span>
    );
}

Price.propTypes = {
    value: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
    big: PropTypes.bool,
};

export default withStyles(style)(Price);
