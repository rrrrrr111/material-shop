import {mapUserToProps, USER_AUTH_RESULT, USER_DATA, USER_START_LOADING, USER_STOP_LOADING} from "app/user/reducer";
import {connect} from "app/utils/functionUtil";
import util from "app/utils/util";
import React from "react";
import {dispatch} from "store";

class UserDataLoader extends React.PureComponent {

    componentDidMount() {
        if (!this.props.ui.loaded && !this.props.ui.loading) {
            UserDataLoader.reloadUserData();
        }
    }

    static reloadUserData = () => {
        dispatch(USER_START_LOADING);
        util.ajax.backendPost("user/load")
            .then(function (response) {
                dispatch(USER_STOP_LOADING);
                const success = response.success;
                if (success) {
                    dispatch(USER_DATA, response.person);
                    dispatch(USER_AUTH_RESULT, true);
                }
            });
    };

    render() {
        return (  // клонируем все дочерние и передаем им доп пропертя
            React.Children.map(this.props.children, child => {
                return React.cloneElement(child, {
                    userData: this.props.data,
                    userUi: this.props.ui
                });
            })
        );
    }
}

export default connect(mapUserToProps)(UserDataLoader);
