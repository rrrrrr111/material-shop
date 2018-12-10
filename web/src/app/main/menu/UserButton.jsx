import Zoom from "@material-ui/core/Zoom/Zoom";
import AppIcon from "app/common/icon/AppIcon";
import {dropdownHoverColor} from "app/common/style/styleConsts";
import MenuButton from "app/common/theme/menu/MenuButton";
import MenuDropdown from "app/common/theme/menu/MenuDropdown";
import mainMenuListStyle from "app/main/menu/mainMenuListStyle";
import MenuDataLoader from "app/main/menu/MenuDataLoader";
import {mapUserToProps} from "app/user/reducer";
import {connect, withStyles} from "app/utils/functionUtil";
import util from "app/utils/util";
import React from "react";

const styles = theme => ({
    rootMenuItemButton: mainMenuListStyle(theme).rootMenuItemButton,
});

class UserButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleClickUser = this.handleClickUser.bind(this);
    }

    handleClickUser() {
        util.navigate.goToUrl("/auth/signin");
    }

    isUserLoggedIn() {
        return this.props.ui.loaded;
    }

    render = () => {
        const {classes} = this.props,
            buttonProps = {
                className: classes.rootMenuItemButton,
                color: "transparent"
            },
            menuItems = this.props.menuData.getChilds("userRoot");

        console.log(">>>>", menuItems);


        return ( // специфекты не для всех компонент отрабатывают, потому обрачиваем в div
            <Zoom in={true} timeout={1000}>
                <div>
                    {this.isUserLoggedIn() ?
                        <MenuDropdown
                            noLiPadding
                            navDropdown
                            hoverColor={dropdownHoverColor}
                            buttonProps={buttonProps}
                            buttonIcon={<AppIcon name="account_circle"/>}
                            dropdownList={menuItems}
                        />
                        :
                        <MenuButton
                            buttonProps={buttonProps}
                            buttonIcon={<AppIcon name="account_circle"/>}
                            caret={false}
                            onClick={this.handleClickUser}
                        />}
                </div>
            </Zoom>
        );
    };
}

const UserButtonWithUserLoader = (props) => (
    <MenuDataLoader>
        <UserButton {...props}/>
    </MenuDataLoader>
);

export default connect(mapUserToProps)(withStyles(styles)(UserButtonWithUserLoader));