import LoginPopup from "app/user/auth/LoginPopup";
import {mapUserToProps, USER_AUTH, USER_START_LOADING, USER_STOP_LOADING} from "app/user/reducer";
import {connect} from "app/utils/functionUtil";
import util from "app/utils/util";
import PropTypes from "prop-types";
import React from "react";
import {dispatch} from "store";

class UserDataLoader extends React.PureComponent {

    componentDidMount() {
        if (!this.props.ui.loaded && !this.props.ui.loading) {
            this.reloadUserData();
        }
    }

    reloadUserData = () => {
        const compRef = this;
        dispatch(USER_START_LOADING)
            .then(() => {
                return util.ajax.backendPost("user/load");
            })
            .then((response) => {
                if (response.success) {
                    dispatch(USER_AUTH, {
                        person: response.person,
                        success: true
                    });
                } else {
                    dispatch(USER_STOP_LOADING);
                    if (response.status === 403
                        && compRef.props.showLogin) {
                        LoginPopup.show();
                    }
                }
            });
    };

    render() {
        const {data, ui, showLogin, ...rest} = this.props;
        return (  // клонируем все дочерние и передаем им доп пропертя
            React.Children.map(this.props.children, child => {
                return React.cloneElement(child, {
                    ...rest,
                    userData: data,
                    userUi: ui
                });
            })
        );
    }

    static defaultProps = {
        showLogin: false
    };

    static propTypes = {
        showLogin: PropTypes.bool,
    };
}

export default connect(mapUserToProps)(UserDataLoader);
