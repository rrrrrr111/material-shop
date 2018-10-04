import Icon from "@material-ui/core/Icon/Icon";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

class AppIcon extends React.PureComponent {

    render() {
        const {name, className} = this.props;
        switch (typeof name) {
            case "function":
                // Component из Material UI https://material.io/tools/icons
                // название в snake_case, преобразовать в CamelCase
                // можно создавать свои из SVG кодов

                const classes = classNames({[className]: className,});
                return (
                    <this.props.name className={classes}/>
                );

            case "string":
                if (name.indexOf(" fa-") > 0) {
                    // as Font Awesome https://fontawesome.com/icons - PRO не работают
                    // пишутся как fas fa-... / fab fa-... / fal fa-... / far fa-...

                    const parts = name.split(' ');
                    const classes = classNames({
                        [parts[0]]: true,
                        [parts[1]]: true,
                        [className]: className
                    });
                    return (
                        <i className={classes}/>
                    );
                } else {
                    // Material UI на основе Font Awesome https://material.io/tools/icons
                    // и https://materialdesignicons.com/ - работают не все, только те у кого поставщик Google
                    // названия с нижним подчеркиванием (_), см также имена алиасы

                    const classes = classNames({
                        [className]: className,
                    });
                    return (
                        <Icon className={classes}>
                            {name}
                        </Icon>
                    )
                }
        }
        return null;
    }

    static propTypes = {
        name: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        className: PropTypes.string,
    };
}

export default AppIcon;