import withStyles from "@material-ui/core/styles/withStyles";
import Button from "app/common/theme/button/Button.jsx";
import dropdownStyle from "app/common/theme/menu/dropdownStyle";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";


const MenuButton = (props) => {
    const {
        classes,
        buttonProps,
        buttonText,
        buttonIcon,
        buttonRef,
        onClick,
        caret,
        dropup,
        open,
        rtlActive,
    } = props;
    const caretClasses = classNames({
        [classes.caret]: true,
        [classes.caretDropup]: dropup && !open,
        [classes.caretActive]: open && !dropup,
        [classes.caretRTL]: rtlActive
    });
    return (
        <div className={buttonText !== undefined ? "" : classes.target}>
            <Button
                aria-label="Меню"
                aria-owns={open ? "menu-list" : null}
                aria-haspopup="false"
                buttonRef={buttonRef}
                {...buttonProps}
                onClick={onClick}
            >
                {buttonIcon !== undefined ? buttonIcon : null}
                {buttonText !== undefined ? buttonText : null}
                {caret ? <b className={caretClasses}/> : null}
            </Button>
        </div>
    );
};

MenuButton.defaultProps = {
    caret: true,
    open: false,
    dropup: false,
    hoverColor: "primary"
};

MenuButton.propTypes = {
    classes: PropTypes.object.isRequired,
    buttonText: PropTypes.node,
    buttonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    buttonProps: PropTypes.object,
    buttonRef: PropTypes.func,
    onClick: PropTypes.func,
    dropup: PropTypes.bool,
    rtlActive: PropTypes.bool,
    caret: PropTypes.bool,
    open: PropTypes.bool,
};

export default withStyles(dropdownStyle)(MenuButton);