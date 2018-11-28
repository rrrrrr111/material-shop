import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import {ALL_PLACEMENTS} from "app/common/style/styleConsts";
import tooltipStyle from "app/common/theme/tooltip/tooltipStyle";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";


class AppTooltip extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            arrowRef: null,
        };
    }

    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        });
    };

    render() {
        const {
            arrow, title, children, classes, light, ...rest
        } = this.props;

        if (arrow) {
            const popperClasses = light ? classNames(classes.arrowPopper, "light") : classes.arrowPopper;
            const tooltipClasses = light ? classNames(classes.tooltip, "light") : classes.tooltip;

            return (
                <Tooltip {...rest}
                         title={
                             <React.Fragment>
                                 {title}
                                 <span className={classes.arrowArrow} ref={this.handleArrowRef}/>
                             </React.Fragment>
                         }
                         classes={{
                             popper: popperClasses,
                             tooltip: tooltipClasses
                         }}
                         PopperProps={{
                             popperOptions: {
                                 modifiers: {
                                     arrow: {
                                         enabled: Boolean(this.state.arrowRef),
                                         element: this.state.arrowRef,
                                     },
                                 },
                             },
                         }}
                >
                    {children}
                </Tooltip>
            );
        } else {
            const tooltipClasses = light ? classNames(classes.tooltip, "light") : classes.tooltip;
            return (
                <Tooltip id="app-tooltip" {...rest}
                         title={title}
                         classes={{
                             tooltip: tooltipClasses
                         }}
                >
                    {children}
                </Tooltip>
            );
        }
    }

    static propTypes = {
        arrow: PropTypes.bool,
        light: PropTypes.bool,
        title: PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired,
        placement: PropTypes.oneOf(ALL_PLACEMENTS),
    };
}


export default withStyles(tooltipStyle)(AppTooltip);
