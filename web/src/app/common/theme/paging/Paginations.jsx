import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import {MAIN_COLOR_KEYS, PRIMARY_COLOR_KEY} from "app/common/style/styleConsts";
import paginationStyle from "app/common/theme/paging/paginationStyle.jsx";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";


const Paginations = (props) => {
    const {classes, pages, color, className} = props;
    const paginationClasses = classNames(classes.pagination, className);
    return (
        <ul className={paginationClasses}>
            {pages.map((prop, key) => {
                const paginationLink = classNames({
                    [classes.paginationLink]: true,
                    [classes[color]]: prop.active,
                    [classes.disabled]: prop.disabled
                });
                return (
                    <li className={classes.paginationItem} key={key}>
                        <Button onClick={prop.onClick}
                                className={paginationLink}
                                disabled={prop.disabled}>
                            {prop.text}
                        </Button>
                    </li>
                );
            })}
        </ul>
    );
};

Paginations.defaultProps = {
    color: PRIMARY_COLOR_KEY
};

Paginations.propTypes = {
    classes: PropTypes.object.isRequired,
    pages: PropTypes.arrayOf(
        PropTypes.shape({
            active: PropTypes.bool,
            disabled: PropTypes.bool,
            text: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]).isRequired,
            onClick: PropTypes.func
        })
    ).isRequired,
    color: PropTypes.oneOf(MAIN_COLOR_KEYS)
};

export default withStyles(paginationStyle)(Paginations);
