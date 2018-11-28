import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";


import footerStyle from "app/common/theme/footer/footerStyle.jsx";
import PropTypes from "prop-types";
import React from "react";

function Footer(props) {
    const {children, content, classes, theme, big, className} = props;
    const themeType =
        theme === "transparent" || theme === undefined ? false : true;
    const footerClasses = classNames({
        [classes.footer]: true,
        [classes[theme]]: themeType,
        [classes.big]: big || children !== undefined,
        [className]: className !== undefined
    });

    return (
        <footer className={footerClasses}>
            <div className={classes.container}>
                {children !== undefined ? (
                    <div>
                        <div className={classes.content}>{children}</div>
                        <hr/>
                    </div>
                ) : (
                    " "
                )}
                {content}
                <div className={classes.clearFix}/>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.oneOf(["dark", "white", "transparent"]),
    big: PropTypes.bool,
    content: PropTypes.node.isRequired
};

export default withStyles(footerStyle)(Footer);
