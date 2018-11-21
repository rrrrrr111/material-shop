import {USER_LOGGED_OUT} from "app/user/reducer";
import {action} from "app/utils/functionUtil";
import util from "app/utils/util"
import React from "react";
import {connect} from "react-redux";
import {store} from "store";

class SignoutComp extends React.PureComponent {

    componentDidMount() {

        if (this.props.ui.authorized) {
            SignoutComp.signout(true);
        } else {
            SignoutComp.afterSignOut(true);
        }
    }

    render() {
        return null;
    }

    static signout = (backToPreviousUrl) => {
        util.ajax.backendSignout()
            .then(function () {

                store.dispatch(action(USER_LOGGED_OUT));
                SignoutComp.afterSignOut(backToPreviousUrl);
            });
    };

    static afterSignOut(goToPreviousUrl) {
        util.notify.signOut();
        if (goToPreviousUrl) {
            util.navigate.goToPreviousUrl();
        }
    }
}

const mapStateToProps = (state) => {
    return state.user;
};

export default connect(mapStateToProps)(SignoutComp);
