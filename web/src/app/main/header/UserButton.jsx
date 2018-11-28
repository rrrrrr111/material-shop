import Zoom from "@material-ui/core/Zoom/Zoom";
import AppIcon from "app/common/icon/AppIcon";
import {dropdownHoverColor} from "app/common/style/styleConsts";
import MenuButton from "app/common/theme/menu/MenuButton";
import MenuDropdown from "app/common/theme/menu/MenuDropdown";
import menuStyle from "app/main/header/menuStyle";
import {mapUserToProps} from "app/user/reducer";
import {connect, withStyles} from "app/utils/functionUtil";
import util from "app/utils/util";
import React from "react";

const styles = theme => ({
    rootMenuItemButton: menuStyle(theme).rootMenuItemButton,

});

class UserButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleClickUser = this.handleClickUser.bind(this);
    }

    handleClickUser() {
        util.navigate.goToUrl("/auth/signin");
    }

    static userMenuItems = [
        {id: 0, name: "Профиль пользователя", to: "/user/profile", icon: "face", link: true},
        {id: 2, name: "История заказов", to: "/user/orders", icon: "history", link: true},
        {id: 3, name: "Настройки", to: "/user/settings", icon: "settings", link: true},
        {id: 4, name: "Смена пароля", to: "/user/password", icon: "fingerprint", link: true},
        {id: 5, name: "Выход", to: "/auth/signout", icon: "fas fa-sign-out-alt", link: true},
    ];

    isUserLoggedIn() {
        return this.props.ui.loaded;
    }

    render = () => {
        const {classes, data} = this.props;
        const buttonProps = {
            className: classes.rootMenuItemButton,
            color: "transparent"
        };
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
                            dropdownList={UserButton.userMenuItems}
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

export default connect(mapUserToProps)(withStyles(styles)(UserButton));