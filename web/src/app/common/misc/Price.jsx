import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";
import {boldFont, font, helperStyles} from "app/common/style/styleConsts";
import {title} from "app/common/style/themeStyles";
import {NumberFormat} from "app/utils/functionUtil";
import PropTypes from "prop-types";
import React from "react";


const style = theme => ({
    price: {
        ...helperStyles(theme).nowrap,
        color: title.color,
        fontFamily: font,
        fontSize: "1.0625rem",
        "&.big": {
            fontSize: "1.5625rem",
            margin: "20px 40px 20px 40px",
        },
        "&.bold": {
            fontFamily: boldFont,
            fontWeight: title.fontWeight,
        }
    },
    rubSign: {
        marginLeft: 4,
        fontSize: 11,
        "&.big": {
            marginLeft: 5,
            fontSize: 17,
        }
    },
});

function Price(props) {
    const {classes, className, value, big, bold} = props;
    let valueClass = classes.price;
    valueClass = big ? valueClass + " big" : valueClass;
    valueClass = bold ? valueClass + " bold" : valueClass;
    valueClass = className ? valueClass + " " + className : valueClass;

    let signClass = classes.rubSign;
    signClass = big ? signClass + " big" : signClass;

    return (
        <span className={valueClass}>
            <NumberFormat value={value} displayType='text' thousandSeparator=' '/>
            <AppIcon className={signClass} name="fas fa-ruble-sign"/>
        </span>
    );
}

Price.propTypes = {
    value: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    big: PropTypes.bool,
    bold: PropTypes.bool,
};

export default withStyles(style)(Price);
