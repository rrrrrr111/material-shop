import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Divider from "@material-ui/core/Divider";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import withStyles from "@material-ui/core/styles/withStyles";
import dropdownStyle from "app/common/theme/menu/dropdownStyle.jsx";
import MenuButton from "app/common/theme/menu/MenuButton";
import MenuItemContent from "app/common/theme/menu/MenuItemContent";
import {ALL_COLOR_KEYS, ALL_PLACEMENTS, PRIMARY_COLOR_KEY} from "app/common/style/styleConsts";
import {classNames} from "app/utils/functionUtil";
import PropTypes from "prop-types";
import React from "react";


class MenuDropdown extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleDrop = this.handleDrop.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.buttonRefBinder = this.buttonRefBinder.bind(this);
    }

    handleDrop = (e, open) => {
        const currentState = this.state.open;
        if (open === undefined) {
            open = !currentState;
        }
        this.setState({open});
    };

    handleClose(e) {
        if (this.state.open === false) {
            return;
        }
        this.handleDrop(null, false);
    }

    handleMenuClick(item) {
        this.handleDrop(null, false);
        if (item && item.onClick) {
            item.onClick(item);
        }
    }

    buttonRefBinder = (node) => {
        this.anchorEl = node;
    };

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

        const dropdownItemClasses = classNames({
            [classes.dropdownItem]: true,
            [classes[hoverColor + "Hover"]]: true,
            [classes.noLiPadding]: noLiPadding,
            [classes.dropdownItemRTL]: rtlActive
        });
        const dropDown = (
            <div className={innerDropDown ? classes.innerManager : classes.manager}>
                <MenuButton
                    buttonIcon={buttonIcon}
                    buttonText={buttonText}
                    buttonProps={buttonProps}
                    buttonRef={this.buttonRefBinder}
                    caret={caret}
                    dropup={dropup}
                    onClick={this.handleDrop}
                    open={open}
                    rtlActive={rtlActive}
                />
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
                                <MenuList role="menu" className={classes.menuList}>
                                    {dropdownHeader !== undefined ? (
                                        <MenuItem
                                            onClick={this.handleMenuClick.bind(this, dropdownHeader)}
                                            className={classes.dropdownHeader}
                                        >
                                            {dropdownHeader}
                                        </MenuItem>
                                    ) : null}
                                    {dropdownList.map((item, key) => {
                                        if (item.divider) {
                                            return (
                                                <Divider
                                                    key={key}
                                                    onClick={this.handleMenuClick.bind(this, "divider")}
                                                    className={classes.dropdownDividerItem}
                                                />
                                            );
                                        } else if (item.ref === "multi") {
                                            return (
                                                <MenuItem
                                                    key={key}
                                                    onClick={this.handleMenuClick.bind(this, item)}
                                                    className={dropdownItemClasses}
                                                    style={{overflow: "visible", padding: 0}}
                                                >
                                                    <MenuItemContent itemInfo={item}/>
                                                </MenuItem>
                                            );
                                        }
                                        return (
                                            <MenuItem
                                                key={key}
                                                onClick={this.handleMenuClick.bind(this, item)}
                                                className={dropdownItemClasses}
                                            >
                                                <MenuItemContent itemInfo={item}/>
                                            </MenuItem>
                                        );
                                    })}
                                </MenuList>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        );

        return (
            open && !innerDropDown ?
                <ClickAwayListener onClickAway={this.handleClose}>
                    {dropDown}
                </ClickAwayListener>
                : dropDown
        );
    }

    static defaultProps = {
        caret: true,
        dropup: false,
        hoverColor: PRIMARY_COLOR_KEY,
    };

    static propTypes = {
        classes: PropTypes.object.isRequired,
        hoverColor: PropTypes.oneOf(ALL_COLOR_KEYS),
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
