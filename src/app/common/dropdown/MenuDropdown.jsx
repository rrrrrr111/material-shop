import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Divider from "@material-ui/core/Divider";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "app/common/button/Button.jsx";
import dropdownStyle from "app/common/dropdown/dropdownStyle.jsx";
import {ALL_COLORS, ALL_PLACEMENTS} from "app/common/style/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";


class MenuDropdown extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            clicks: 0
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick() {
        const x = (this.state.clicks + 1) % 2;
        this.setState({open: true, clicks: x});
    }

    handleClose() {
        this.setState({open: false, clicks: 0});
    }

    render() {
        const {open} = this.state;
        const {
            classes,
            buttonText,
            buttonIcon,
            dropdownList,
            buttonProps,
            dropup,
            dropdownHeader,
            caret,
            hoverColor,
            dropPlacement,
            rtlActive,
            noLiPadding,
            innerDropDown,
            navDropdown
        } = this.props;
        const caretClasses = classNames({
            [classes.caret]: true,
            [classes.caretDropup]: dropup && !open,
            [classes.caretActive]: open && !dropup,
            [classes.caretRTL]: rtlActive
        });
        const dropdownItemClasses = classNames({
            [classes.dropdownItem]: true,
            [classes[hoverColor + "Hover"]]: true,
            [classes.noLiPadding]: noLiPadding,
            [classes.dropdownItemRTL]: rtlActive
        });
        const dropDownMenu = (
            <MenuList role="menu" className={classes.menuList}>
                {dropdownHeader !== undefined ? (
                    <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownHeader}
                    >
                        {dropdownHeader}
                    </MenuItem>
                ) : null}
                {dropdownList.map((prop, key) => {
                    if (prop.divider) {
                        return (
                            <Divider
                                key={key}
                                onClick={this.handleClose}
                                className={classes.dropdownDividerItem}
                            />
                        );
                    } else if (prop.ref === "multi") {
                        return (
                            <MenuItem
                                key={key}
                                className={dropdownItemClasses}
                                style={{overflow: "visible", padding: 0}}
                            >
                                {prop}
                            </MenuItem>
                        );
                    }
                    return (
                        <MenuItem
                            key={key}
                            onClick={this.handleClose}
                            className={dropdownItemClasses}
                        >
                            {prop}
                        </MenuItem>
                    );
                })}
            </MenuList>
        );
        return (
            <div className={innerDropDown ? classes.innerManager : classes.manager}>
                <div className={buttonText !== undefined ? "" : classes.target}>
                    <Button
                        aria-label="Notifications"
                        aria-owns={open ? "menu-list" : null}
                        aria-haspopup="true"
                        buttonRef={node => {
                            this.anchorEl = node;
                        }}
                        {...buttonProps}
                        onClick={open ? this.handleClose : this.handleClick}
                    >
                        {buttonIcon !== undefined ? buttonIcon : null}
                        {buttonText !== undefined ? buttonText : null}
                        {caret ? <b className={caretClasses}/> : null}
                    </Button>
                </div>
                <Popper
                    open={open}
                    anchorEl={this.anchorEl}
                    transition
                    disablePortal
                    placement={dropPlacement}
                    className={classNames({
                        [classes.popperClose]: !open,
                        [classes.pooperResponsive]: true,
                        [classes.pooperNav]: open && navDropdown
                    })}
                >
                    {({TransitionProps, placement}) => (
                        <Grow
                            in={open}
                            id="menu-list"
                            style={
                                dropup
                                    ? {transformOrigin: "0 100% 0"}
                                    : {transformOrigin: "0 0 0"}
                            }
                        >
                            <Paper className={classes.dropdown}>
                                {innerDropDown ? (
                                    dropDownMenu
                                ) : (
                                    <ClickAwayListener onClickAway={this.handleClose} ref="cacat">
                                        {dropDownMenu}
                                    </ClickAwayListener>
                                )}
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        );
    }

    static defaultProps = {
        caret: true,
        dropup: false,
        hoverColor: "primary"
    };

    static propTypes = {
        classes: PropTypes.object.isRequired,
        hoverColor: PropTypes.oneOf(ALL_COLORS),
        buttonText: PropTypes.node,
        buttonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        dropdownList: PropTypes.array,
        buttonProps: PropTypes.object,
        dropup: PropTypes.bool,
        dropdownHeader: PropTypes.node,
        rtlActive: PropTypes.bool,
        caret: PropTypes.bool,
        dropPlacement: PropTypes.oneOf(ALL_PLACEMENTS),
        noLiPadding: PropTypes.bool,
        innerDropDown: PropTypes.bool,
        navDropdown: PropTypes.bool
    };
}

export default withStyles(dropdownStyle)(MenuDropdown);
