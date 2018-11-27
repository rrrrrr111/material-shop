import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "app/common/icon/AppIcon";
import LocalLink from "app/common/misc/LocalLink";
import menuStyle from "app/main/header/menu/menuStyle.jsx";
import {classNames} from "app/utils/functionUtil";
import React from "react";

class MenuItem extends React.PureComponent {

    render() {
        const {itemInfo, classes} = this.props;
        return (
            <LocalLink to={itemInfo.to} className={classes.dropdownLink}>
                <AppIcon name={itemInfo.icon}
                         className={classNames(classes.icon, classes.dropdownIcons)}/>
                {itemInfo.name}
            </LocalLink>
        );
    }
}

export default withStyles(menuStyle)(MenuItem);